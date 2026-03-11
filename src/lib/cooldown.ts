const COOKIE_NAME = "last_watch";
const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours

export function getLastWatchTime(): number | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );
  if (!match) return null;
  const ts = Number(match[1]);
  return isNaN(ts) ? null : ts;
}

export function setLastWatchTime(): void {
  const expires = new Date(Date.now() + COOLDOWN_MS).toUTCString();
  document.cookie = `${COOKIE_NAME}=${Date.now()}; path=/; expires=${expires}; SameSite=Lax`;
}

export function getRemainingMs(): number {
  const last = getLastWatchTime();
  if (last === null) return 0;
  const remaining = COOLDOWN_MS - (Date.now() - last);
  return Math.max(0, remaining);
}

export function formatRemaining(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
