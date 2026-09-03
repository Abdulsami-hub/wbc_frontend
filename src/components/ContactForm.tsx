import { useState } from "react";
import { FormFeedback } from "@/components/FormFeedback";
import { API_BASE } from "@/lib/api";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_API = `${API_BASE}/api/contact`;

const FIELDS = [
  { name: "name", label: "Name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "subject", label: "Subject", type: "text", autoComplete: "off" },
] as const;

export function ContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  function resetToForm() {
    setStatus("idle");
    setErrors({});
    setSubmitError("");
  }

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
          const source =
            "errors" in body && body.errors && typeof body.errors === "object"
              ? (body.errors as Record<string, unknown>)
              : (body as Record<string, unknown>);

          for (const key of ["name", "email", "subject", "message"] as const) {
            const value = source[key];
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
      setErrors({});
      setSubmitError("");
      form.reset();
    } catch {
      setStatus("error");
      setSubmitError("We could not send your message. Please try again or email contact@wbccme.org.");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-none border border-line bg-background px-3.5 py-2.5 text-[15px] text-foreground outline-none";

  if (status === "success") {
    return (
      <div className={className}>
        <FormFeedback
          variant="success"
          title="Message sent"
          description="Thank you — your message has been received. Our team will get back to you shortly."
          actionLabel="Send another message"
          onAction={resetToForm}
        />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`flex flex-col ${className}`} data-no-translate>
      <div className="space-y-4">
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
      </div>

      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <label htmlFor="message" className="text-[15px] font-medium text-foreground">
          Message <span className="text-foreground">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          aria-invalid={Boolean(errors["message"])}
          aria-describedby={errors["message"] ? "message-error" : undefined}
          className={`${inputClass} min-h-[7.5rem] flex-1 resize-y`}
        />
        {errors["message"] && (
          <p id="message-error" className="mt-1 text-[14px] text-foreground">
            {errors["message"]}
          </p>
        )}
      </div>

      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <button type="submit" disabled={status === "loading"} className="btn-orange mt-4 w-full disabled:opacity-70">
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (Object.keys(errors).length > 0 || submitError) ? (
        <div className="mt-4">
          <FormFeedback
            variant="error"
            title={submitError ? "Could not send message" : "Please check the form"}
            description={
              submitError || "Some fields need your attention before we can send your message."
            }
          />
        </div>
      ) : null}
    </form>
  );
}
