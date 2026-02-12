import { ThreeCanvas } from "@/components/three";

export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      <div className="mb-6 flex items-center justify-center gap-4">
        <div className="h-24 w-24">
          <ThreeCanvas className="h-full w-full" />
        </div>
        <div className="text-sm text-muted-foreground">
          상세 정보를 불러오는 중...
        </div>
      </div>
      <header className="mb-6 flex flex-col items-start justify-between gap-4 md:mb-8 md:flex-row md:items-center">
        <nav className="flex items-center w-full flex-col gap-4 md:gap-0 md:flex-row">
          <div className="flex gap-1 w-full justify-end md:w-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-9 rounded-md border bg-muted animate-pulse"
              />
            ))}
          </div>

          <div className="flex gap-2 items-center w-full justify-between md:w-auto md:ml-4 md:justify-start mt-2 md:mt-0">
            <div className="h-7 w-20 rounded-2xl bg-muted animate-pulse" />
            <div className="flex flex-col gap-2">
              <div className="h-7 w-40 rounded bg-muted animate-pulse" />
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </nav>

        <div className="flex items-center w-full justify-end gap-2 md:w-auto">
          <div className="h-9 w-28 rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-5 lg:col-span-4 space-y-4">
          <div className="mb-2 rounded-xl border bg-card">
            <div className="p-4">
              <div className="aspect-square w-full rounded-2xl bg-muted animate-pulse" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="h-5 w-24 bg-muted rounded animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-px w-full bg-muted/60" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-16 rounded-xl border bg-muted/40 animate-pulse" />
              <div className="h-16 rounded-xl border bg-muted/40 animate-pulse" />
            </div>
            <div>
              <div className="h-3 w-12 bg-muted rounded mb-2 animate-pulse" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-16 rounded-full bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8 space-y-4">
          <div className="rounded-xl border bg-card p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-12 items-center gap-3">
                    <div className="col-span-4 h-3 bg-muted rounded animate-pulse" />
                    <div className="col-span-2 h-3 bg-muted rounded animate-pulse" />
                    <div className="col-span-6 h-2 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border bg-muted/40 h-40 animate-pulse" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid w-full grid-cols-2 rounded-md border bg-muted/40">
              <div className="h-9 border-r bg-muted animate-pulse" />
              <div className="h-9 bg-muted/70 animate-pulse" />
            </div>

            <div className="rounded-xl border bg-card p-4 space-y-3">
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-40 bg-muted rounded animate-pulse" />
              <div className="flex gap-2 mt-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-16 rounded-full bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
