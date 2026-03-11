import Link from "next/link";
import { notFound } from "next/navigation";
import { WatchGuard } from "@/components/watch-guard";

interface Props {
  params: Promise<{ videoId: string }>;
}

export default async function WatchPage({ params }: Props) {
  const { videoId } = await params;

  if (!/^[\w-]{11}$/.test(videoId)) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-neutral-500 hover:text-neutral-700"
      >
        &larr; Back
      </Link>
      <div className="flex justify-center">
        <WatchGuard videoId={videoId} />
      </div>
    </main>
  );
}
