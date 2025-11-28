const POLYMARKET_HOSTS = ["polymarket.com", "www.polymarket.com"] as const;
const EVENT_PATH_REGEX = /^\/event\/([^/?]+)/;

function extractSlugFromUrl(input: string): string | null {
  const trimmed = input.trim();

  try {
    const url = new URL(trimmed);

    if (!POLYMARKET_HOSTS.includes(url.hostname as (typeof POLYMARKET_HOSTS)[number])) {
      return null;
    }

    const match = url.pathname.match(EVENT_PATH_REGEX);
    return match?.[1] ?? null;
  } catch {
    return null;
  }
}

export { extractSlugFromUrl };
