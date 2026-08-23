type FormFeedbackProps = {
  variant: "success" | "error";
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function FormFeedback({
  variant,
  title,
  description,
  actionLabel,
  onAction,
}: FormFeedbackProps) {
  const isSuccess = variant === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex gap-4 border px-4 py-4 sm:px-5 sm:py-5 ${
        isSuccess ? "border-navy/20 bg-navy/[0.04]" : "border-orange/25 bg-orange/[0.05]"
      }`}
    >
      <span
        className={`mt-0.5 inline-flex size-10 shrink-0 items-center justify-center ${
          isSuccess ? "bg-navy text-white" : "bg-orange text-white"
        }`}
      >
        {isSuccess ? <CheckIcon /> : <AlertIcon />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[16px] font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="mt-1.5 text-[14px] leading-relaxed text-muted-fg">{description}</p>
        ) : null}
        {actionLabel && onAction ? (
          <button
            type="button"
            onClick={onAction}
            className="mt-3 text-[14px] font-semibold text-navy underline-offset-4 hover:underline"
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
