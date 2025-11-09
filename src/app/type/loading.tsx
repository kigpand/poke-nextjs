export default function Loading() {
  const SectionSkeleton = ({
    titleWidth,
    tone,
  }: {
    titleWidth: string;
    tone: "green" | "red";
  }) => {
    const bg =
      tone === "green"
        ? "bg-green-50 border-green-200"
        : "bg-red-50 border-red-200";
    const text = tone === "green" ? "text-green-700" : "text-red-700";

    return (
      <article className="w-full">
        <div
          className={`h-6 ${titleWidth} mb-2 rounded ${text} bg-muted animate-pulse`}
        />
        <ul role="list" className="flex flex-col gap-6 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className={`rounded-2xl p-4 border ${bg}`}>
              <div
                className={`h-5 w-40 mb-3 rounded ${text} bg-white/60 animate-pulse`}
              />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-9 w-9 rounded-md bg-white/70 animate-pulse"
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </article>
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 md:px-6 py-8 md:py-10">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-muted animate-pulse" />
          <div className="h-8 w-40 rounded bg-muted animate-pulse" />
        </div>
        <div className="h-9 w-9 rounded-md border bg-muted animate-pulse" />
      </header>

      <section className="flex flex-col gap-6 md:flex-row md:gap-4">
        <SectionSkeleton titleWidth="w-24" tone="green" />
        <SectionSkeleton titleWidth="w-24" tone="red" />
      </section>
    </main>
  );
}
