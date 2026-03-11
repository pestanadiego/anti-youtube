export interface ChannelConfig {
  id: string;
  name: string;
}

export async function getChannels(): Promise<ChannelConfig[]> {
  const sheetUrl = process.env.CHANNELS_SHEET_URL;
  if (!sheetUrl) return [];

  try {
    const res = await fetch(sheetUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const csv = await res.text();
    const lines = csv.trim().split("\n");

    // skip header row
    return lines.slice(1).reduce<ChannelConfig[]>((acc, line) => {
      const cleaned = line.replace(/\r/g, "");
      // handle quoted CSV fields
      const match = cleaned.match(
        /^"?([^",]+)"?\s*,\s*"?([^"]+)"?\s*$/
      );
      if (match) {
        acc.push({ id: match[1].trim(), name: match[2].trim() });
      }
      return acc;
    }, []);
  } catch {
    return [];
  }
}
