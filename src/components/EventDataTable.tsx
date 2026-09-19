import { useState } from "react";
import type { EventAgenda, EventExhibit } from "@/content/events";
import { SimpleModal } from "@/components/SimpleModal";

function isFeeColumn(column: { id: string; label: string }): boolean {
  const hay = `${column.id} ${column.label}`.toLowerCase();
  return /\b(fee|price|cost|amount)\b/.test(hay);
}

function formatFeeValue(value: string, currency: string): string {
  const amount = value.trim();
  if (!amount || amount === "—") return amount || "—";
  if (amount.includes(currency)) return amount;

  const isCode = /^[A-Za-z]{3}$/.test(currency);
  return isCode ? `${amount} ${currency.toUpperCase()}` : `${currency}\u00A0${amount}`;
}

export function EventDataTable({
  title,
  kicker,
  table,
  currency,
}: {
  title: string;
  kicker?: string;
  table: EventAgenda;
  currency?: string;
}) {
  if (!table.rows.length) return null;

  const columnCount = Math.max(table.columns.length, 1);
  const currencyCode = currency?.trim() || "";

  const displayValue = (column: { id: string; label: string }, raw: string) => {
    const value = raw || "—";
    if (!currencyCode || !isFeeColumn(column) || value === "—") return value;
    return formatFeeValue(value, currencyCode);
  };

  return (
    <section className="mt-10 overflow-hidden rounded-card border border-line bg-surface/70">
      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
        {kicker ? (
          <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">{kicker}</p>
        ) : null}
        <h2
          className={`relative text-[20px] font-bold text-foreground sm:text-[24px] ${kicker ? "mt-2" : ""}`}
        >
          {title}
        </h2>

        <div data-dynamic className="relative mt-5 hidden overflow-hidden rounded-xl border border-line bg-background md:block">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              {table.columns.map((column) => (
                <col key={column.id} style={{ width: `${100 / columnCount}%` }} />
              ))}
            </colgroup>
            <thead className="bg-surface">
              <tr>
                {table.columns.map((column) => (
                  <th
                    key={column.id}
                    scope="col"
                    className="border-b border-line px-5 py-3 text-start text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase"
                  >
                    {column.label}
                    {currencyCode && isFeeColumn(column) ? ` (${currencyCode})` : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr
                  key={`${title}-${index}`}
                  className="border-b border-line last:border-b-0 transition-colors hover:bg-orange/[0.04]"
                >
                  {table.columns.map((column, colIndex) => (
                    <td
                      key={column.id}
                      className={`px-5 py-3.5 text-start align-top text-[14px] leading-relaxed break-words whitespace-pre-line ${
                        colIndex === 0 ? "font-semibold text-foreground" : "text-muted-fg"
                      } ${currencyCode && isFeeColumn(column) ? "tabular-nums" : ""}`}
                    >
                      {displayValue(column, row[column.id] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ol data-dynamic className="relative mt-5 space-y-3 md:hidden">
          {table.rows.map((row, index) => (
            <li key={`${title}-card-${index}`}>
              <article className="overflow-hidden rounded-xl border border-line bg-background px-4 py-4">
                <p className="text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <dl className="mt-3 grid gap-3">
                  {table.columns.map((column) =>
                    row[column.id] ? (
                      <div key={column.id}>
                        <dt className="text-[11px] font-bold tracking-[0.12em] text-muted-fg uppercase">
                          {column.label}
                          {currencyCode && isFeeColumn(column) ? ` (${currencyCode})` : ""}
                        </dt>
                        <dd className="mt-0.5 whitespace-pre-line text-[15px] font-semibold tabular-nums text-foreground">
                          {displayValue(column, row[column.id] ?? "")}
                        </dd>
                      </div>
                    ) : null,
                  )}
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function exhibitInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function EventExhibitsList({ exhibits }: { exhibits: EventExhibit[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  if (exhibits.length === 0) return null;

  const active = activeIndex === null ? null : exhibits[activeIndex];

  return (
    <section className="mt-10 overflow-hidden rounded-card border border-line bg-surface/70">
      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
        <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">Programme</p>
        <h2 className="relative mt-2 text-[20px] font-bold text-foreground sm:text-[24px]">Exhibits</h2>
        <ul className="relative mt-5 grid gap-4 sm:grid-cols-2">
          {exhibits.map((exhibit, index) => {
            const initials = exhibitInitials(exhibit.name);

            return (
              <li key={`${exhibit.name}-${index}`} className="min-w-0">
                <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-card">
                  <div className="relative flex min-h-[148px] items-center justify-center overflow-hidden bg-white px-6 py-6 sm:min-h-[168px]">
                    <span className="guide-glow -end-10 -top-10 size-32 bg-orange/20" aria-hidden="true" />
                    {exhibit.booth ? (
                      <span className="absolute start-4 top-4 max-w-[calc(100%-2rem)] truncate rounded-full bg-orange px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase">
                        {exhibit.booth}
                      </span>
                    ) : null}
                    {exhibit.logo ? (
                      <img
                        src={exhibit.logo}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="relative max-h-[88%] max-w-[92%] object-contain"
                      />
                    ) : (
                      <span className="relative flex size-16 items-center justify-center rounded-2xl border border-line bg-orange/8 text-[18px] font-bold tracking-wide text-orange">
                        {initials || "—"}
                      </span>
                    )}
                  </div>
                  {exhibit.name || exhibit.partner || exhibit.description ? (
                    <div className="relative flex min-w-0 flex-1 flex-col border-t border-line/80 bg-surface/70 px-5 py-4">
                      {exhibit.name ? (
                        <h3 className="line-clamp-1 break-words text-[16px] font-bold leading-snug text-foreground [overflow-wrap:anywhere]">
                          {exhibit.name}
                        </h3>
                      ) : null}
                      {exhibit.partner ? (
                        <p className="mt-1 line-clamp-1 break-words text-[13px] font-semibold text-navy [overflow-wrap:anywhere]">
                          {exhibit.partner}
                        </p>
                      ) : null}
                      {exhibit.description ? (
                        <>
                          <p className="mt-2 min-w-0 truncate text-[14px] leading-relaxed text-muted-fg">
                            {exhibit.description}
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className="mt-3 inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-orange transition-colors hover:text-navy"
                          >
                            View details
                            <span aria-hidden="true" className="rtl-mirror">
                              →
                            </span>
                          </button>
                        </>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <SimpleModal
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
        title={active?.name || active?.partner || "Exhibit"}
        className="max-w-[min(640px,calc(100vw-1.5rem))] overflow-hidden p-0"
      >
        {active ? (
          <div>
            <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden bg-white px-8 py-10 sm:min-h-[240px]">
              <span className="guide-glow -end-12 -top-12 size-40 bg-orange/20" aria-hidden="true" />
              {active.booth ? (
                <span className="absolute start-5 top-5 rounded-full bg-orange px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                  {active.booth}
                </span>
              ) : null}
              {active.logo ? (
                <img
                  src={active.logo}
                  alt=""
                  className="relative max-h-36 max-w-[80%] object-contain sm:max-h-44"
                />
              ) : (
                <span className="relative flex size-20 items-center justify-center rounded-2xl border border-line bg-orange/8 text-[22px] font-bold tracking-wide text-orange">
                  {exhibitInitials(active.name) || "—"}
                </span>
              )}
            </div>
            <div className="border-t border-line bg-surface/70 px-6 py-6 sm:px-8 sm:py-7">
              {active.name ? (
                <h3 className="break-words text-[22px] font-bold leading-tight text-foreground [overflow-wrap:anywhere]">
                  {active.name}
                </h3>
              ) : null}
              {active.partner ? (
                <p className="mt-2 break-words text-[15px] font-semibold text-navy [overflow-wrap:anywhere]">
                  {active.partner}
                </p>
              ) : null}
              {active.description ? (
                <p className="mt-4 max-h-[40vh] overflow-y-auto whitespace-pre-wrap break-words text-[15px] leading-relaxed text-muted-fg [overflow-wrap:anywhere]">
                  {active.description}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </SimpleModal>
    </section>
  );
}
