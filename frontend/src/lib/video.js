// Accept share links from the two video platforms and direct media URLs.
// External players are mounted only after a visitor clicks the poster.
export function videoSource(src) {
  if (!src || typeof src !== "string") return null;

  let url;
  try { url = new URL(src, window.location.origin); } catch { return null; }
  if (url.protocol !== "https:" && url.origin !== window.location.origin) return null;

  const host = url.hostname.toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);

  if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "youtu.be", "www.youtu.be"].includes(host)) {
    const id = host.endsWith("youtu.be") ? parts[0] :
      parts[0] === "watch" ? url.searchParams.get("v") :
      ["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : null;
    if (!/^[\w-]{11}$/.test(id || "")) return null;
    return { kind: "embed", src: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1` };
  }

  if (["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(host)) {
    const id = parts[0] === "video" ? parts[1] : parts[0];
    if (!/^\d+$/.test(id || "")) return null;
    const hash = url.searchParams.get("h") || (parts[0] === "video" ? null : parts[1]);
    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    if (hash && /^[a-z0-9]+$/i.test(hash)) embed.searchParams.set("h", hash);
    embed.searchParams.set("autoplay", "1");
    return { kind: "embed", src: embed.toString() };
  }

  return { kind: "file", src: url.toString() };
}
