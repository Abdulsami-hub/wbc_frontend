import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { FormFeedback } from "@/components/FormFeedback";
import { getRecaptchaSiteKey, RecaptchaV2, type RecaptchaV2Handle } from "@/components/RecaptchaV2";
import { SearchableSelect, type SearchableOption } from "@/components/SearchableSelect";
import { API_BASE } from "@/lib/api";
import {
  countriesQuery,
  eventRegistrationOptionsQuery,
  namedToOptions,
} from "@/lib/queries/event-registration";

type Status = "idle" | "loading" | "success" | "error";

interface FormErrors {
  title?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  phoneCode?: string;
  nationality?: string;
  country?: string;
  city?: string;
  company?: string;
  jobTitle?: string;
  industryId?: string;
  companySizeId?: string;
  jobLevelId?: string;
  referralId?: string;
  interests?: string;
  b2b?: string;
  logistics?: string;
  photo?: string;
  businessCard?: string;
  privacy?: string;
  recaptcha?: string;
  detail?: string;
  message?: string;
}

/** Flip to true to require the same reCAPTCHA check as the membership form. */
const RECAPTCHA_ENABLED = true;
const RECAPTCHA_SITE_KEY = RECAPTCHA_ENABLED ? getRecaptchaSiteKey() : "";
const MAX_FILE_BYTES = 5 * 1024 * 1024;

const inputClass =
  "mt-1.5 w-full rounded-md border border-line bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-navy";

const INTEREST_LABELS: Record<string, (eventTitle: string) => string> = {
  networking: () => "Networking with participants",
  partnership: () => "Partnership / Sponsorship",
  media: () => "Media accreditation",
  speaking: (eventTitle) => `Speaking at ${eventTitle}`,
  investment: () => "Investment opportunities",
  future_events: () => "Future WBC events",
};

type YesNo = "" | "yes" | "no";

function Field({
  id,
  label,
  required,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string | undefined;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
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

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-5">
      <h2 className="text-[15px] font-semibold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

function fileError(file: File | null, kinds: string[], label: string): string | null {
  if (!file) return null;
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!kinds.includes(extension)) return `${label} must be ${kinds.join(", ")}.`;
  if (file.size > MAX_FILE_BYTES) return `${label} must be 5 MB or smaller.`;
  return null;
}

export function EventRegistrationForm({ slug, eventTitle }: { slug: string; eventTitle: string }) {
  const optionsQuery = useQuery(eventRegistrationOptionsQuery);
  const countries = useQuery(countriesQuery);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<RecaptchaV2Handle | null>(null);

  const [title, setTitle] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [companySizeId, setCompanySizeId] = useState("");
  const [jobLevelId, setJobLevelId] = useState("");
  const [referralId, setReferralId] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [b2b, setB2b] = useState<YesNo>("");
  const [logistics, setLogistics] = useState<YesNo>("");
  const [privacy, setPrivacy] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [businessCard, setBusinessCard] = useState<File | null>(null);

  const titles = optionsQuery.data?.titles ?? [];
  const nationalityOptions = countries.data?.nationalities ?? [];
  const countryOptions: SearchableOption[] = (countries.data?.countries ?? []).map((item) => ({
    value: item.value,
    label: item.label,
    keywords: item.keywords,
    dialCode: item.dial_code,
  }));
  const dialOptions = countries.data?.dial_codes ?? [];

  function resetCaptcha() {
    recaptchaRef.current?.reset();
    setRecaptchaToken(null);
  }

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("website_url") ?? "").trim()) return;

    const next: FormErrors = {};
    const requiredText: Array<[keyof FormErrors, string, string]> = [
      ["firstName", "First name", String(data.get("firstName") ?? "")],
      ["lastName", "Last name", String(data.get("lastName") ?? "")],
      ["email", "Email", String(data.get("email") ?? "")],
      ["phone", "Phone", String(data.get("phone") ?? "")],
      ["city", "City", String(data.get("city") ?? "")],
      ["company", "Company / Organization", String(data.get("company") ?? "")],
      ["jobTitle", "Job title", String(data.get("jobTitle") ?? "")],
    ];

    if (!title) next.title = "Title is required.";
    for (const [key, label, value] of requiredText) {
      if (!value.trim()) next[key] = `${label} is required.`;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      next.email = "Enter a valid email address.";
    }
    if (!phoneCode) next.phoneCode = "Phone code is required.";
    if (!nationality) next.nationality = "Nationality is required.";
    if (!country) next.country = "Country of residence is required.";
    if (!industryId) next.industryId = "Industry is required.";
    if (!companySizeId) next.companySizeId = "Company size is required.";
    if (!jobLevelId) next.jobLevelId = "Job level is required.";
    if (!referralId) next.referralId = "Please tell us how you heard about WBC.";
    if (!privacy) next.privacy = "Please agree to the privacy policy.";

    const photoMessage = fileError(photo, ["jpg", "jpeg", "png", "webp"], "Your photo");
    const cardMessage = fileError(
      businessCard,
      ["jpg", "jpeg", "png", "webp", "pdf"],
      "Business card",
    );
    if (photoMessage) next.photo = photoMessage;
    if (cardMessage) next.businessCard = cardMessage;

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      next.recaptcha = "Please complete the security check.";
    }

    setErrors(next);
    setSubmitError("");
    if (Object.keys(next).length > 0) {
      setStatus("error");
      return;
    }

    const body = new FormData();
    body.append("title", title);
    body.append("first_name", String(data.get("firstName") ?? "").trim());
    body.append("last_name", String(data.get("lastName") ?? "").trim());
    body.append("email", email);
    body.append("phone_code", phoneCode);
    body.append("phone", String(data.get("phone") ?? "").trim());
    body.append("nationality", nationality);
    body.append("country_of_residence", country);
    body.append("city", String(data.get("city") ?? "").trim());
    body.append("company", String(data.get("company") ?? "").trim());
    body.append("job_title", String(data.get("jobTitle") ?? "").trim());
    body.append("industry_id", industryId);
    body.append("company_size_id", companySizeId);
    body.append("job_level_id", jobLevelId);
    for (const interest of interests) body.append("interests[]", interest);
    if (b2b) body.append("b2b_meetings", b2b === "yes" ? "1" : "0");
    if (logistics) body.append("logistics_week", logistics === "yes" ? "1" : "0");
    body.append("referral_source_id", referralId);
    if (photo) body.append("photo", photo);
    if (businessCard) body.append("business_card", businessCard);
    body.append("privacy_accepted", "1");
    if (recaptchaToken) body.append("recaptcha_token", recaptchaToken);

    setStatus("loading");
    try {
      const res = await fetch(`${API_BASE}/api/events/${encodeURIComponent(slug)}/registrations`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      });

      let payload: unknown = null;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (!res.ok) {
        if (payload && typeof payload === "object") {
          const apiErrors: FormErrors = {};
          const keyMap: Record<string, string> = {
            first_name: "firstName",
            last_name: "lastName",
            phone_code: "phoneCode",
            country_of_residence: "country",
            job_title: "jobTitle",
            industry_id: "industryId",
            company_size_id: "companySizeId",
            job_level_id: "jobLevelId",
            referral_source_id: "referralId",
            b2b_meetings: "b2b",
            logistics_week: "logistics",
            privacy_accepted: "privacy",
            recaptcha_token: "recaptcha",
            business_card: "businessCard",
          };
          const source =
            "errors" in payload && payload.errors && typeof payload.errors === "object"
              ? (payload.errors as Record<string, unknown>)
              : (payload as Record<string, unknown>);

          for (const [apiKey, value] of Object.entries(source)) {
            const mapped = apiKey.startsWith("interests")
              ? "interests"
              : (keyMap[apiKey] ?? apiKey);
            const formKey = mapped as keyof FormErrors;
            const message =
              Array.isArray(value) && typeof value[0] === "string"
                ? value[0]
                : typeof value === "string"
                  ? value
                  : "";
            if (message && !apiErrors[formKey]) apiErrors[formKey] = message;
          }
          if (Object.keys(apiErrors).length > 0) {
            setErrors(apiErrors);
            const top = apiErrors.detail ?? apiErrors.message;
            if (top) setSubmitError(top);
            setStatus("error");
            resetCaptcha();
            return;
          }
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      setErrors({});
      setSubmitError("");
      form.reset();
      setTitle("");
      setPhoneCode("");
      setNationality("");
      setCountry("");
      setIndustryId("");
      setCompanySizeId("");
      setJobLevelId("");
      setReferralId("");
      setInterests([]);
      setB2b("");
      setLogistics("");
      setPrivacy(false);
      setPhoto(null);
      setBusinessCard(null);
      resetCaptcha();
    } catch {
      setStatus("error");
      setSubmitError(
        "We could not submit your registration. Please try again or email contact@wbccme.org.",
      );
      resetCaptcha();
    }
  }

  useEffect(() => {
    if (status !== "success") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [status]);

  if (status === "success") {
    return (
      <FormFeedback
        variant="success"
        title="Registration received"
        description={`Thank you for registering for ${eventTitle}. Our team will be in touch.`}
        actionLabel="Submit another registration"
        onAction={() => setStatus("idle")}
      />
    );
  }

  const listsLoading = optionsQuery.isPending || countries.isPending;
  const listsFailed = optionsQuery.isError || countries.isError;

  const choiceClass = (active: boolean) =>
    `border px-4 py-2.5 text-start text-[14px] font-semibold transition-colors sm:text-[15px] ${
      active
        ? "border-orange bg-orange text-orange-foreground"
        : "border-line bg-background text-foreground hover:border-orange"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" data-no-translate>
      {listsFailed ? (
        <FormFeedback
          variant="error"
          title="Registration options are unavailable"
          description="Please refresh the page and try again."
        />
      ) : null}

      <Group title="Personal details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="title" label="Title" required error={errors.title}>
            <select
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={inputClass}
              disabled={listsLoading}
            >
              <option value="">—</option>
              {titles.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field id="firstName" label="First name" required error={errors.firstName}>
            <input
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              className={inputClass}
            />
          </Field>
          <Field id="lastName" label="Last name" required error={errors.lastName}>
            <input
              id="lastName"
              name="lastName"
              autoComplete="family-name"
              className={inputClass}
            />
          </Field>
          <Field id="email" label="Email" required error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass}
            />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone || errors.phoneCode}>
            <div className="grid grid-cols-[7.5rem_1fr] gap-2">
              <SearchableSelect
                id="phoneCode"
                value={phoneCode}
                options={dialOptions}
                onChange={(option) => setPhoneCode(option?.value ?? "")}
                placeholder="+"
                invalid={Boolean(errors.phoneCode)}
                describedBy={errors.phoneCode ? "phone-error" : undefined}
                disabled={listsLoading}
                menuClassName="min-w-64"
              />
              <input id="phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
            </div>
          </Field>
          <Field id="nationality" label="Nationality" required error={errors.nationality}>
            <SearchableSelect
              id="nationality"
              value={nationality}
              options={nationalityOptions}
              onChange={(option) => setNationality(option?.value ?? "")}
              placeholder="Select nationality"
              invalid={Boolean(errors.nationality)}
              describedBy={errors.nationality ? "nationality-error" : undefined}
              disabled={listsLoading}
            />
          </Field>
          <Field id="country" label="Country of residence" required error={errors.country}>
            <SearchableSelect
              id="country"
              value={country}
              options={countryOptions}
              onChange={(option) => {
                setCountry(option?.value ?? "");
                if (option?.dialCode) setPhoneCode(option.dialCode);
              }}
              placeholder="Select country"
              invalid={Boolean(errors.country)}
              describedBy={errors.country ? "country-error" : undefined}
              disabled={listsLoading}
            />
          </Field>
          <Field id="city" label="City" required error={errors.city}>
            <input id="city" name="city" autoComplete="address-level2" className={inputClass} />
          </Field>
        </div>
      </Group>

      <Group title="Professional details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="company" label="Company / Organization" required error={errors.company}>
            <input id="company" name="company" autoComplete="organization" className={inputClass} />
          </Field>
          <Field id="jobTitle" label="Job title" required error={errors.jobTitle}>
            <input
              id="jobTitle"
              name="jobTitle"
              autoComplete="organization-title"
              className={inputClass}
            />
          </Field>
          <Field id="industry" label="Industry" required error={errors.industryId}>
            <SearchableSelect
              id="industry"
              value={industryId}
              options={namedToOptions(optionsQuery.data?.industries)}
              onChange={(option) => setIndustryId(option?.value ?? "")}
              placeholder="Select industry"
              invalid={Boolean(errors.industryId)}
              describedBy={errors.industryId ? "industry-error" : undefined}
              disabled={listsLoading}
            />
          </Field>
          <Field id="companySize" label="Company size" required error={errors.companySizeId}>
            <SearchableSelect
              id="companySize"
              value={companySizeId}
              options={namedToOptions(optionsQuery.data?.company_sizes)}
              onChange={(option) => setCompanySizeId(option?.value ?? "")}
              placeholder="Select number of employees"
              invalid={Boolean(errors.companySizeId)}
              describedBy={errors.companySizeId ? "companySize-error" : undefined}
              disabled={listsLoading}
            />
          </Field>
          <Field id="jobLevel" label="Job level" required error={errors.jobLevelId}>
            <SearchableSelect
              id="jobLevel"
              value={jobLevelId}
              options={namedToOptions(optionsQuery.data?.job_levels)}
              onChange={(option) => setJobLevelId(option?.value ?? "")}
              placeholder="Select job level"
              invalid={Boolean(errors.jobLevelId)}
              describedBy={errors.jobLevelId ? "jobLevel-error" : undefined}
              disabled={listsLoading}
            />
          </Field>
        </div>
      </Group>

      <Group title="Participation">
        <div>
          <p className="text-[15px] font-medium text-foreground">I am interested in</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {(
              optionsQuery.data?.interests ??
              Object.keys(INTEREST_LABELS).map((value) => ({ value, label: value }))
            ).map((item) => {
              const active = interests.includes(item.value);
              return (
                <button
                  key={item.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInterest(item.value)}
                  className={choiceClass(active)}
                >
                  {INTEREST_LABELS[item.value]?.(eventTitle) ?? item.label}
                </button>
              );
            })}
          </div>
          {errors.interests ? (
            <p className="mt-1 text-[14px] text-foreground">{errors.interests}</p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <fieldset>
            <legend className="text-[15px] font-medium text-foreground">
              Would you like to join private / B2B networking meetings?
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["no", "yes"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={b2b === value}
                  onClick={() => setB2b(value)}
                  className={choiceClass(b2b === value)}
                >
                  {value === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
            {errors.b2b ? <p className="mt-1 text-[14px] text-foreground">{errors.b2b}</p> : null}
          </fieldset>
          <fieldset>
            <legend className="text-[15px] font-medium text-foreground">
              Are you interested in the Industry, Trade & Logistics week?
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["no", "yes"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={logistics === value}
                  onClick={() => setLogistics(value)}
                  className={choiceClass(logistics === value)}
                >
                  {value === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </div>
            {errors.logistics ? (
              <p className="mt-1 text-[14px] text-foreground">{errors.logistics}</p>
            ) : null}
          </fieldset>
        </div>

        <Field id="referral" label="How did you hear about WBC?" required error={errors.referralId}>
          <SearchableSelect
            id="referral"
            value={referralId}
            options={namedToOptions(optionsQuery.data?.referral_sources)}
            onChange={(option) => setReferralId(option?.value ?? "")}
            placeholder="Select an option"
            invalid={Boolean(errors.referralId)}
            describedBy={errors.referralId ? "referral-error" : undefined}
            disabled={listsLoading}
          />
        </Field>
      </Group>

      <Group title="Uploads (optional)">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="photo" label="Your photo" error={errors.photo}>
            <input
              id="photo"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
              className={`${inputClass} text-[14px] file:me-3 file:border-0 file:bg-transparent file:text-[14px] file:font-semibold file:text-foreground`}
            />
            <p className="mt-1.5 text-[14px] text-muted-fg">JPG, PNG or WEBP, up to 5 MB</p>
          </Field>
          <Field id="businessCard" label="Business card" error={errors.businessCard}>
            <input
              id="businessCard"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
              onChange={(event) => setBusinessCard(event.target.files?.[0] ?? null)}
              className={`${inputClass} text-[14px] file:me-3 file:border-0 file:bg-transparent file:text-[14px] file:font-semibold file:text-foreground`}
            />
            <p className="mt-1.5 text-[14px] text-muted-fg">Image or PDF, up to 5 MB</p>
          </Field>
        </div>
      </Group>

      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label className="flex items-start gap-2 text-[15px] text-foreground">
          <input
            type="checkbox"
            checked={privacy}
            onChange={(event) => setPrivacy(event.target.checked)}
            className="mt-1 size-4 accent-orange"
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={errors.privacy ? "privacy-error" : undefined}
          />
          <span>
            I agree to the processing of my personal data in accordance with the Privacy Policy.
            <span className="text-foreground"> *</span>
          </span>
        </label>
        {errors.privacy ? (
          <p id="privacy-error" className="mt-1 text-[14px] text-foreground">
            {errors.privacy}
          </p>
        ) : null}
      </div>

      {RECAPTCHA_SITE_KEY ? (
        <RecaptchaV2
          siteKey={RECAPTCHA_SITE_KEY}
          onChange={setRecaptchaToken}
          onReady={(api) => {
            recaptchaRef.current = api;
          }}
          error={errors.recaptcha}
        />
      ) : null}

      <div className="space-y-4">
        <button
          type="submit"
          disabled={status === "loading" || listsLoading}
          className="btn-orange disabled:opacity-70"
        >
          {status === "loading" ? "Submitting…" : "Register"}
        </button>
        {status === "error" && (Object.keys(errors).length > 0 || submitError) ? (
          <FormFeedback
            variant="error"
            title={submitError ? "Could not submit registration" : "Please check the form"}
            description={
              submitError || "Some fields need your attention before we can register you."
            }
          />
        ) : null}
      </div>
    </form>
  );
}
