import type { EventAgenda, EventExhibit } from "@/content/events";

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

        <div className="relative mt-5 hidden overflow-hidden rounded-xl border border-line bg-background md:block">
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
                      className={`px-5 py-3.5 text-start align-middle text-[14px] leading-relaxed break-words ${
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

        <ol className="relative mt-5 space-y-3 md:hidden">
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
                        <dd className="mt-0.5 text-[15px] font-semibold tabular-nums text-foreground">
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

export function EventExhibitsList({ exhibits }: { exhibits: EventExhibit[] }) {
  if (exhibits.length === 0) return null;

  return (
    <section className="mt-10 overflow-hidden rounded-card border border-line bg-surface/70">
      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
        <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">Programme</p>
        <h2 className="relative mt-2 text-[20px] font-bold text-foreground sm:text-[24px]">Exhibits</h2>
        <ul className="relative mt-5 grid gap-3 sm:grid-cols-2">
          {exhibits.map((exhibit, index) => (
            <li key={`${exhibit.name}-${index}`}>
              <article className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-background px-5 py-4">
                {exhibit.booth ? (
                  <p className="text-[11px] font-bold tracking-[0.16em] text-orange uppercase">{exhibit.booth}</p>
                ) : null}
                {exhibit.name ? (
                  <h3 className={`text-[16px] font-bold text-foreground ${exhibit.booth ? "mt-1.5" : ""}`}>
                    {exhibit.name}
                  </h3>
                ) : null}
                {exhibit.partner ? (
                  <p className="mt-1 text-[13px] font-semibold text-navy">{exhibit.partner}</p>
                ) : null}
                {exhibit.description ? (
                  <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">{exhibit.description}</p>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
