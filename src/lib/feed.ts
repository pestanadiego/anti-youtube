import { XMLParser } from "fast-xml-parser";
import { getChannels } from "@/config/channels";
import { LatestVideo } from "@/lib/types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
});

const FEED_URL = "https://www.youtube.com/feeds/videos.xml?channel_id=";

function isShort(entry: Record<string, unknown>): boolean {
  const link = entry["link"] as { "@_href": string };
  const url = link["@_href"];

  return url.includes("/shorts/");
}

export async function fetchLatestVideo(
  channelId: string,
): Promise<LatestVideo | null> {
  try {
    const res = await fetch(`${FEED_URL}${channelId}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const xml = await res.text();
    const data = parser.parse(xml);

    const entries = data?.feed?.entry;
    if (!entries) return null;

    const list = Array.isArray(entries) ? entries : [entries];
    const entry = list.find((e) => !isShort(e));
    if (!entry) return null;

    const videoId = entry["yt:videoId"];

    return {
      videoId,
      title: entry.title,
      channelName: data.feed.author?.name ?? "",
      channelId,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      publishedAt: entry.published,
    };
  } catch {
    return null;
  }
}

export async function fetchAllLatestVideos(): Promise<LatestVideo[]> {
  const channels = await getChannels();
  const results = await Promise.allSettled(
    channels.map((ch) => fetchLatestVideo(ch.id)),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<LatestVideo | null> =>
        r.status === "fulfilled",
    )
    .map((r) => r.value)
    .filter((v): v is LatestVideo => v !== null);
}
