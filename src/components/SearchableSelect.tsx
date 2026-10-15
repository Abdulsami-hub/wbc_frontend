import { useEffect, useId, useRef, useState } from "react";

export type SearchableOption = {
  value: string;
  label: string;
  keywords?: string | undefined;
  hint?: string | undefined;
  dialCode?: string | undefined;
};

type SearchableSelectProps = {
  id: string;
  value: string;
  options: SearchableOption[];
  onChange: (option: SearchableOption | null) => void;
  placeholder: string;
  invalid?: boolean;
  describedBy?: string | undefined;
  disabled?: boolean;
  menuClassName?: string | undefined;
};

const VISIBLE_ROWS = 10;
const ROW_HEIGHT_REM = 2.25;

export function SearchableSelect({
  id,
  value,
  options,
  onChange,
  placeholder,
  invalid = false,
  describedBy,
  disabled = false,
  menuClassName = "",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? null;

  const needle = query.trim().toLowerCase();
  const filtered = needle
    ? options.filter((option) => {
        const haystack =
          `${option.label} ${option.keywords ?? ""} ${option.hint ?? ""}`.toLowerCase();
        return haystack.includes(needle);
      })
    : options;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative mt-1.5">
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => {
          if (disabled) return;
          setOpen((current) => !current);
          setQuery("");
        }}
        className={`flex w-full items-center justify-between gap-2 rounded-md border bg-background px-3.5 py-2.5 text-left text-[15px] outline-none transition-colors focus:border-navy disabled:opacity-60 ${
          invalid ? "border-foreground" : "border-line"
        }`}
      >
        <span className={`truncate ${selected ? "text-foreground" : "text-muted-fg"}`}>
          {selected?.label ?? placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className="shrink-0 text-muted-fg"
        >
          <path
            d="M5 7.5 10 12.5 15 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          className={`absolute start-0 z-30 mt-1 w-full overflow-hidden rounded-md border border-line bg-background shadow-card ${menuClassName}`}
        >
          <div className="border-b border-line p-2">
            <input
              type="search"
              value={query}
              autoFocus
              placeholder="Search"
              aria-label={`Search ${placeholder}`}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") event.preventDefault();
              }}
              className="w-full rounded-md border border-line bg-background px-3 py-2 text-[14px] text-foreground outline-none focus:border-navy"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            aria-labelledby={id}
            className="overflow-y-auto"
            style={{ maxHeight: `${VISIBLE_ROWS * ROW_HEIGHT_REM}rem` }}
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-[14px] text-muted-fg">No matches</li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li key={option.value} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onChange(option);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`flex h-9 w-full items-center gap-2 px-3 text-left text-[14px] hover:bg-surface ${
                        isSelected ? "bg-surface font-semibold text-navy" : "text-foreground"
                      }`}
                    >
                      <span className="shrink-0">{option.label}</span>
                      {option.hint ? (
                        <span className="truncate text-[12px] text-muted-fg">{option.hint}</span>
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
