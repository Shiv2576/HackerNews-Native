export function truncateText(text: string, maxLength = 120): string {
  if (!text) return "";

  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export function safeNumber(value?: number): number {
  return value ?? 0;
}
