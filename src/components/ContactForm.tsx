import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_API = "https://api.wbccme.org/api/contact/";

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};

    for (const f of FIELDS) {
      const v = String(data.get(f.name) ?? "").trim();
      if (!v) next[f.name] = `${f.label} is required.`;
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next["email"] = "Enter a valid email address.";
    const message = String(data.get("message") ?? "").trim();
    if (message.length < 10) next["message"] = "Message must be at least 10 characters.";
    if (String(data.get("company") ?? "")) return; // honeypot

    setErrors(next);
    setSubmitError("");
    if (Object.keys(next).length > 0) {
      setStatus("error");
      return;
    }

    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email,
      subject: String(data.get("subject") ?? "").trim(),
      message,
    };

    setStatus("loading");
    try {
      const res = await fetch(CONTACT_API, {
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
          for (const key of ["name", "email", "subject", "message"] as const) {
            const value = (body as Record<string, unknown>)[key];
            if (Array.isArray(value) && typeof value[0] === "string") apiErrors[key] = value[0];
            else if (typeof value === "string") apiErrors[key] = value;
          }
          if (Object.keys(apiErrors).length > 0) {
            setErrors(apiErrors);
            setStatus("error");
            return;
          }
        }
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setSubmitError("We could not send your message. Please try again or email contact@wbccme.org.");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-none border border-line bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none transition-colors focus:border-orange";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {FIELDS.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="text-[15px] font-medium text-foreground">
            {f.label} <span className="text-foreground">*</span>
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            required
            aria-invalid={Boolean(errors[f.name])}
            aria-describedby={errors[f.name] ? `${f.name}-error` : undefined}
            className={inputClass}
          />
          {errors[f.name] && (
            <p id={`${f.name}-error`} className="mt-1 text-[14px] text-foreground">
              {errors[f.name]}
            </p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="message" className="text-[15px] font-medium text-foreground">
          Message <span className="text-foreground">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(errors["message"])}
          aria-describedby={errors["message"] ? "message-error" : undefined}
          className={inputClass}
        />
        {errors["message"] && (
          <p id="message-error" className="mt-1 text-[14px] text-foreground">
            {errors["message"]}
          </p>
        )}
      </div>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button type="submit" disabled={status === "loading"} className="btn-orange w-full disabled:opacity-70">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      <p aria-live="polite" className="text-[15px]">
        {status === "success" && <span className="text-foreground">Thank you — your message has been received.</span>}
        {status === "error" && Object.keys(errors).length > 0 && (
          <span className="text-foreground">Please correct the highlighted fields.</span>
        )}
        {status === "error" && submitError && <span className="text-foreground">{submitError}</span>}
      </p>
    </form>
  );
}

