export default function SectionHeading({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-pad">
      <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
        <span className="text-xs font-bold tracking-wide text-royal-600">
          {kicker}
        </span>
        <h2 className="mt-2 text-2xl font-black text-navy-900 sm:text-3xl">
          {title}
        </h2>
        {text && <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>}
      </div>
    </div>
  );
}
