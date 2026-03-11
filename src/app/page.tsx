import { fetchAllLatestVideos } from "@/lib/feed";
import { VideoGrid } from "@/components/video-grid";

export default async function Home() {
  const videos = await fetchAllLatestVideos();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-lg font-medium text-neutral-700">
        Latest videos
      </h1>
      {videos.length === 0 ? (
        <p className="text-sm text-neutral-500">No videos available.</p>
      ) : (
        <VideoGrid videos={videos} />
      )}
    </main>
  );
}
