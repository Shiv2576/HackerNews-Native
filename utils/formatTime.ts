export function formatTime(unixTime: number): string {
  const now = Date.now();
  const past = unixTime * 1000; // convert seconds → ms

  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
