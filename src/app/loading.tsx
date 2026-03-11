export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 h-5 w-32 animate-pulse rounded bg-neutral-200" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-video w-full animate-pulse rounded-sm bg-neutral-200" />
            <div className="mt-2 h-3 w-20 animate-pulse rounded bg-neutral-200" />
            <div className="mt-1 h-4 w-full animate-pulse rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    </main>
  );
}
