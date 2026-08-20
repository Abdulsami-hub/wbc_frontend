import { useState, type ReactNode } from "react";

type Status = "idle" | "loading" | "success" | "error";
const MEMBERSHIP_API = "https://api.wbccme.org/api/membership-applications/";

export const MEMBERSHIP_TYPES = [
  { id: "institutional", label: "Institutional Membership" },
  { id: "business", label: "Corporate Membership" },
  { id: "sme", label: "SME Membership" },
  { id: "individual", label: "Individual Membership" },
] as const;

type MembershipTypeId = (typeof MEMBERSHIP_TYPES)[number]["id"];

const ORG_REQUIRED = [
  "organization",
  "country",
  "city",
  "firstName",
  "lastName",
  "designation",
  "email",
] as const;

const ORG_LABELS: Record<(typeof ORG_REQUIRED)[number], string> = {
  organization: "Company/Organization Name",
  country: "Country",
  city: "City",
  firstName: "Representative First Name",
  lastName: "Representative Last Name",
  designation: "Designation",
  email: "Email",
};

const INDIVIDUAL_REQUIRED = [
  "firstName",
  "lastName",
  "profession",
  "country",
  "city",
  "email",
  "telephone",
] as const;

const INDIVIDUAL_LABELS: Record<(typeof INDIVIDUAL_REQUIRED)[number], string> = {
  firstName: "First Name",
  lastName: "Last Name",
  profession: "Profession/Title",
  country: "Country",
  city: "City",
  email: "Email",
  telephone: "Telephone",
};

const inputClass =
  "mt-1.5 w-full rounded-md border border-line bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-navy";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[15px] font-medium text-foreground">
        {label}
        {required ? <span className="text-foreground"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-[14px] text-foreground">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function MembershipApplicationForm() {
  const [membershipType, setMembershipType] = useState<MembershipTypeId>("institutional");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const isIndividual = membershipType === "individual";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_url") ?? "")) return;

    const next: Record<string, string> = {};

    if (isIndividual) {
      for (const name of INDIVIDUAL_REQUIRED) {
        const v = String(data.get(name) ?? "").trim();
        if (!v) next[name] = `${INDIVIDUAL_LABELS[name]} is required.`;
      }
    } else {
      for (const name of ORG_REQUIRED) {
        const v = String(data.get(name) ?? "").trim();
        if (!v) next[name] = `${ORG_LABELS[name]} is required.`;
      }
    }

    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next["email"] = "Enter a valid email address.";
    }

    setErrors(next);
    setSubmitError("");
    if (Object.keys(next).length > 0) {
      setStatus("error");
      return;
    }

    const payload = {
      membership_type: membershipType,
      membershipType,
      organization: String(data.get("organization") ?? "").trim(),
      field_of_activity: String(data.get("activity") ?? "").trim(),
      activity: String(data.get("activity") ?? "").trim(),
      country: String(data.get("country") ?? "").trim(),
      city: String(data.get("city") ?? "").trim(),
      mailing_address: String(data.get("address") ?? "").trim(),
      address: String(data.get("address") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      representative_first_name: String(data.get("firstName") ?? "").trim(),
      first_name: String(data.get("firstName") ?? "").trim(),
      firstName: String(data.get("firstName") ?? "").trim(),
      representative_last_name: String(data.get("lastName") ?? "").trim(),
      last_name: String(data.get("lastName") ?? "").trim(),
      lastName: String(data.get("lastName") ?? "").trim(),
      designation: String(data.get("designation") ?? "").trim(),
      profession: String(data.get("profession") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      telephone: String(data.get("telephone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setStatus("loading");
    try {
      const res = await fetch(MEMBERSHIP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      let body: unknown = null;
      try {
        body = await res.json();
      } catch {
        body = null;
      }

      if (!res.ok) {
        if (body && typeof body === "object") {
          const apiErrors: Record<string, string> = {};
          const keys: Array<keyof typeof next | string> = [
            ...ORG_REQUIRED,
            ...INDIVIDUAL_REQUIRED,
            "activity",
            "address",
            "website",
            "membershipType",
            "non_field_errors",
            "detail",
          ];
          for (const key of keys) {
            const raw = (body as Record<string, unknown>)[key];
            if (Array.isArray(raw) && typeof raw[0] === "string") apiErrors[String(key)] = raw[0];
            else if (typeof raw === "string") apiErrors[String(key)] = raw;
          }
          if (Object.keys(apiErrors).length > 0) {
            const normalized: Record<string, string> = { ...apiErrors };
            if (normalized["first_name"] && !normalized["firstName"]) normalized["firstName"] = normalized["first_name"];
            if (normalized["last_name"] && !normalized["lastName"]) normalized["lastName"] = normalized["last_name"];
            if (normalized["representative_first_name"] && !normalized["firstName"]) {
              normalized["firstName"] = normalized["representative_first_name"];
            }
            if (normalized["representative_last_name"] && !normalized["lastName"]) {
              normalized["lastName"] = normalized["representative_last_name"];
            }
            if (normalized["field_of_activity"] && !normalized["activity"]) {
              normalized["activity"] = normalized["field_of_activity"];
            }
            if (normalized["mailing_address"] && !normalized["address"]) {
              normalized["address"] = normalized["mailing_address"];
            }
            setErrors(normalized);
            const top = normalized["non_field_errors"] ?? normalized["detail"];
            if (top) setSubmitError(top);
            setStatus("error");
            return;
          }
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      setErrors({});
      setSubmitError("");
      form.reset();
      setMembershipType("institutional");
    } catch {
      setStatus("error");
      setSubmitError("We could not submit your application. Please try again or email contact@wbccme.org.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" data-no-translate>
      <fieldset>
        <legend className="sr-only">Membership type</legend>
        <div className="flex flex-wrap gap-3">
          {MEMBERSHIP_TYPES.map((type) => {
            const active = membershipType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => {
                  setMembershipType(type.id);
                  setErrors({});
                  setStatus("idle");
                }}
                aria-pressed={active}
                className={`border px-4 py-2.5 text-start text-[14px] font-semibold transition-colors sm:text-[15px] ${
                  active
                    ? "border-orange bg-orange text-orange-foreground"
                    : "border-line bg-background text-foreground hover:border-orange hover:text-foreground"
                }`}
              >
                <span className="block">{type.label}</span>
              </button>
            );
          })}
        </div>
        <input type="hidden" name="membershipType" value={membershipType} />
      </fieldset>

      {isIndividual ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="First Name" required error={errors["firstName"]}>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                aria-invalid={Boolean(errors["firstName"])}
                aria-describedby={errors["firstName"] ? "firstName-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="lastName" label="Last Name" required error={errors["lastName"]}>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                aria-invalid={Boolean(errors["lastName"])}
                aria-describedby={errors["lastName"] ? "lastName-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="profession" label="Profession/Title" required error={errors["profession"]}>
              <input
                id="profession"
                name="profession"
                type="text"
                autoComplete="organization-title"
                required
                aria-invalid={Boolean(errors["profession"])}
                aria-describedby={errors["profession"] ? "profession-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="country" label="Country" required error={errors["country"]}>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                required
                aria-invalid={Boolean(errors["country"])}
                aria-describedby={errors["country"] ? "country-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="city" label="City" required error={errors["city"]}>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                required
                aria-invalid={Boolean(errors["city"])}
                aria-describedby={errors["city"] ? "city-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="email" label="Email" required error={errors["email"]}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors["email"])}
                aria-describedby={errors["email"] ? "email-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="telephone" label="Telephone" required error={errors["telephone"]}>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                required
                aria-invalid={Boolean(errors["telephone"])}
                aria-describedby={errors["telephone"] ? "telephone-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="website" label="Website (optional)">
              <input id="website" name="website" type="url" inputMode="url" placeholder="https://" className={inputClass} />
            </Field>
          </div>
          <Field id="message" label="Message">
            <textarea id="message" name="message" rows={5} className={inputClass} />
          </Field>
        </>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="organization" label="Company/Organization Name" required error={errors["organization"]}>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
                required
                aria-invalid={Boolean(errors["organization"])}
                aria-describedby={errors["organization"] ? "organization-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="activity" label="Field of Activity">
              <input id="activity" name="activity" type="text" className={inputClass} />
            </Field>
            <Field id="country" label="Country" required error={errors["country"]}>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                required
                aria-invalid={Boolean(errors["country"])}
                aria-describedby={errors["country"] ? "country-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="city" label="City" required error={errors["city"]}>
              <input
                id="city"
                name="city"
                type="text"
                autoComplete="address-level2"
                required
                aria-invalid={Boolean(errors["city"])}
                aria-describedby={errors["city"] ? "city-error" : undefined}
                className={inputClass}
              />
            </Field>
          </div>

          <Field id="address" label="Mailing Address">
            <input id="address" name="address" type="text" autoComplete="street-address" className={inputClass} />
          </Field>

          <Field id="website" label="Website">
            <input id="website" name="website" type="url" inputMode="url" placeholder="https://" className={inputClass} />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="Representative First Name" required error={errors["firstName"]}>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                aria-invalid={Boolean(errors["firstName"])}
                aria-describedby={errors["firstName"] ? "firstName-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="lastName" label="Representative Last Name" required error={errors["lastName"]}>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                aria-invalid={Boolean(errors["lastName"])}
                aria-describedby={errors["lastName"] ? "lastName-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="designation" label="Designation" required error={errors["designation"]}>
              <input
                id="designation"
                name="designation"
                type="text"
                autoComplete="organization-title"
                required
                aria-invalid={Boolean(errors["designation"])}
                aria-describedby={errors["designation"] ? "designation-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="email" label="Email" required error={errors["email"]}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors["email"])}
                aria-describedby={errors["email"] ? "email-error" : undefined}
                className={inputClass}
              />
            </Field>
            <Field id="telephone" label="Telephone">
              <input id="telephone" name="telephone" type="tel" autoComplete="tel" className={inputClass} />
            </Field>
          </div>

          <Field id="message" label="Additional Message">
            <textarea id="message" name="message" rows={5} className={inputClass} />
          </Field>
        </>
      )}

      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "loading"} className="btn-orange disabled:opacity-70">
          {status === "loading" ? "Submitting…" : "Submit Application"}
        </button>
        <p aria-live="polite" className="text-[15px]">
          {status === "success" && (
            <span className="text-foreground">Thank you — your membership application has been received.</span>
          )}
          {status === "error" && Object.keys(errors).length > 0 && (
            <span className="text-foreground">Please correct the highlighted fields.</span>
          )}
          {status === "error" && submitError && <span className="text-foreground">{submitError}</span>}
        </p>
      </div>
    </form>
  );
}
