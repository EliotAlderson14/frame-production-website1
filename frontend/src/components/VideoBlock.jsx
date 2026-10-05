import { useState } from "react";
import { Play } from "lucide-react";
import { FadeUp } from "./Reveal";
import { videoSource } from "../lib/video";

/* Cinematic video placeholder — poster with PLAY cursor; click plays inline. */
const VideoBlock = ({ src, poster, label, orientation = "landscape", className = "", testid }) => {
  const [playing, setPlaying] = useState(false);
  const source = videoSource(src);

  return (
    <FadeUp className={className}>
      <div
        className={`media-surface group relative w-full overflow-hidden rounded-[4px] bg-cinema ${orientation === "portrait" ? "mx-auto aspect-[9/16] max-w-[510px]" : "aspect-video"}`}
        data-cursor={source ? "play" : undefined}
        data-testid={testid}
        onClick={source ? () => setPlaying(true) : undefined}
        onKeyDown={source ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setPlaying(true); } } : undefined}
        role={source ? "button" : undefined}
        tabIndex={source ? 0 : undefined}
        aria-label={source ? `Play video ${label || ""}` : undefined}
      >
        {playing && source?.kind === "embed" ? (
          <iframe
            src={source.src}
            title={label || "FRAME production film"}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full border-0"
          />
        ) : playing && source?.kind === "file" ? (
          <video
            src={source.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            onError={() => setPlaying(false)}
          />
        ) : (
          <>
            <img
              src={poster}
              alt={label || "Video still"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-cinema/30 transition-colors duration-500 group-hover:bg-cinema/45" />
            {source ? <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-paper/60 bg-cinema/30 text-paper backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
                <Play size={20} className="ml-1" fill="currentColor" />
              </div>
            </div> : <div className="absolute inset-0 flex items-center justify-center"><span className="rounded-full border border-paper/60 bg-cinema/60 px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-paper backdrop-blur-sm">FILM COMING SOON</span></div>}
            {label && (
              <span className="absolute bottom-5 left-6 font-mono text-[10px] tracking-[0.3em] text-paper/80">
                {source ? label : `${label} / PREVIEW STILL`}
              </span>
            )}
          </>
        )}
      </div>
    </FadeUp>
  );
};

export default VideoBlock;
