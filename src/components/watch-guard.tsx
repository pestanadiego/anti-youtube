"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getRemainingMs,
  setLastWatchTime,
  formatRemaining,
} from "@/lib/cooldown";
import { VideoPlayer } from "@/components/video-player";

export function WatchGuard({ videoId }: { videoId: string }) {
  const [state, setState] = useState<"loading" | "allowed" | "blocked">(
    "loading",
  );
  const [remainingMs, setRemainingMs] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      const ms = getRemainingMs();

      if (ms > 0) {
        setState("blocked");
        setRemainingMs(ms);

        interval = setInterval(() => {
          const updated = getRemainingMs();
          setRemainingMs(updated);

          if (updated <= 0) {
            setState("allowed");
            clearInterval(interval);
          }
        }, 80_000);
      } else {
        setLastWatchTime();
        setState("allowed");
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);
  if (state === "loading") return null;

  if (state === "blocked") {
    return (
      <div className="text-center">
        <p className="text-sm text-neutral-500">
          You can watch another video in {formatRemaining(remainingMs)}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-neutral-500 underline hover:text-neutral-700"
        >
          Back to videos
        </Link>
      </div>
    );
  }

  return <VideoPlayer videoId={videoId} />;
}
