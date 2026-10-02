export function FaqList({
  items,
  className,
}: {
  items: readonly { question: string; answer: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item) => (
        <details key={item.question} className="group border-t border-border last:border-b">
          <summary className="flex cursor-pointer list-none justify-between gap-6 py-6 text-[length:var(--type-body)] max-sm:py-[23px] max-sm:text-[length:var(--type-ui)] [&::-webkit-details-marker]:hidden">
            {item.question}
            <span
              aria-hidden="true"
              className="inline-block text-[22px] leading-none transition-transform [transition-duration:var(--dur)] [transition-timing-function:var(--ease-out)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-6 pr-7 text-[length:var(--type-ui)] leading-[1.9] text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
