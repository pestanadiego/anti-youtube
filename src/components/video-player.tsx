export function VideoPlayer({ videoId }: { videoId: string }) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&iv_load_policy=3&playlist=${videoId}`;

  return (
    <iframe
      src={src}
      className="aspect-video w-full max-w-4xl"
      allow="autoplay; fullscreen; picture-in-picture"
      allowFullScreen
      title="Video player"
    />
  );
}
