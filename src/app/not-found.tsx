import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-sm text-neutral-500">Page not found.</p>
        <Link href="/" className="mt-4 block text-sm text-neutral-700 underline">
          Back to videos
        </Link>
      </div>
    </main>
  );
}
