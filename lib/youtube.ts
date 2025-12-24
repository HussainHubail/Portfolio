export function parseYouTubeStart(value: string | null | undefined): number {
  if (!value) return 0;
  const s = String(value);
  // Supports t=90, t=90s, t=1m30s formats
  const numOnly = /^\d+$/;
  if (numOnly.test(s)) return parseInt(s, 10);
  const withS = /^\d+s$/;
  if (withS.test(s)) return parseInt(s.slice(0, -1), 10);
  const mmss = /(?:(\d+)m)?(?:(\d+)s)?/;
  const m = s.match(mmss);
  if (m) {
    const minutes = m[1] ? parseInt(m[1], 10) : 0;
    const seconds = m[2] ? parseInt(m[2], 10) : 0;
    if (!isNaN(minutes) || !isNaN(seconds)) return minutes * 60 + seconds;
  }
  return 0;
}

export function getYouTubeId(inputUrl: string): string | null {
  try {
    const url = new URL(inputUrl);
    const host = url.host.replace(/^www\./, "");
    const pathname = url.pathname;
    if (host === "youtu.be") {
      const id = pathname.split("/").filter(Boolean)[0];
      return id || null;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (pathname.startsWith("/watch")) {
        const v = url.searchParams.get("v");
        return v || null;
      }
      if (pathname.startsWith("/shorts/")) {
        const id = pathname.split("/")[2];
        return id || null;
      }
      if (pathname.startsWith("/embed/")) {
        const id = pathname.split("/")[2];
        return id || null;
      }
    }
    if (host === "youtube-nocookie.com") {
      if (pathname.startsWith("/embed/")) {
        const id = pathname.split("/")[2];
        return id || null;
      }
    }
  } catch {
    return null;
  }
  return null;
}

export function getYouTubeEmbedUrl(inputUrl: string): string | null {
  const id = getYouTubeId(inputUrl);
  if (!id) return null;
  let start = 0;
  try {
    const url = new URL(inputUrl);
    start = parseYouTubeStart(url.searchParams.get("start") || url.searchParams.get("t"));
  } catch {
    // ignore
  }

  const base = `https://www.youtube-nocookie.com/embed/${id}`;
  const params = new URLSearchParams();
  params.set("autoplay", "1");
  params.set("rel", "0");
  params.set("modestbranding", "1");
  params.set("playsinline", "1");
  // Mute to maximize autoplay success on mobile; user can unmute
  params.set("mute", "1");
  if (start > 0) params.set("start", String(start));

  return `${base}?${params.toString()}`;
}

// Lightweight self-checks (no test framework)
export function __test_getYouTubeEmbedUrl() {
  const cases: Array<[string, string | null]> = [
    ["https://www.youtube.com/watch?v=CAJI71hrWQE", "https://www.youtube-nocookie.com/embed/CAJI71hrWQE"],
    ["https://youtu.be/CAJI71hrWQE", "https://www.youtube-nocookie.com/embed/CAJI71hrWQE"],
    ["https://www.youtube.com/shorts/CAJI71hrWQE", "https://www.youtube-nocookie.com/embed/CAJI71hrWQE"],
    ["https://www.youtube.com/embed/CAJI71hrWQE", "https://www.youtube-nocookie.com/embed/CAJI71hrWQE"],
    ["https://www.youtube.com/watch?v=CAJI71hrWQE&t=90s", "https://www.youtube-nocookie.com/embed/CAJI71hrWQE"],
  ];
  for (const [input, expectedBase] of cases) {
    const out = getYouTubeEmbedUrl(input);
    if (!out || !out.startsWith(String(expectedBase))) {
      // eslint-disable-next-line no-console
      console.warn("Embed conversion failed:", input, out);
    }
  }
}
