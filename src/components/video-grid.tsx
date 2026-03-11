"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LatestVideo } from "@/lib/types";
import { getRemainingMs, formatRemaining } from "@/lib/cooldown";

export function VideoGrid({ videos }: { videos: LatestVideo[] }) {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRemainingMs(getRemainingMs());
    }, 0);

    const interval = setInterval(() => {
      setRemainingMs(getRemainingMs());
    }, 60_000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const locked = remainingMs !== null && remainingMs > 0;

  return (
    <>
      {locked && (
        <p className="mb-6 text-sm text-neutral-500">
          Next video available in {formatRemaining(remainingMs)}
        </p>
      )}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.videoId} video={video} locked={locked} />
        ))}
      </div>
    </>
  );
}

function VideoCard({ video, locked }: { video: LatestVideo; locked: boolean }) {
  const content = (
    <>
      <div className="overflow-hidden rounded-sm">
        <Image
          src={video.thumbnailUrl}
          alt={`${video.title} by ${video.channelName}`}
          width={320}
          height={180}
          className={`w-full transition-opacity ${locked ? "opacity-40 grayscale" : "group-hover:opacity-80"}`}
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-2">
        <p className="text-xs text-neutral-500">{video.channelName}</p>
        <time dateTime={video.publishedAt} className="text-xs text-neutral-400">
          {new Date(video.publishedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>
      <p className="mt-0.5 text-sm text-neutral-800">{video.title}</p>
    </>
  );

  if (locked) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/watch/${video.videoId}`} className="group block">
      {content}
    </Link>
  );
}
