import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { videoSource } from "../lib/video";

const ShowreelModal = ({ src, onClose }) => {
  const source = videoSource(src);
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    window.__lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-cinema/95 backdrop-blur-sm"
      onClick={onClose}
      data-testid="showreel-modal"
    >
      <button
        onClick={onClose}
        data-testid="video-modal-close"
        className="group absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper hover:text-ink"
        aria-label="Close video"
      >
        <X size={18} />
      </button>
      <motion.div
        initial={{ scale: 0.94, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 12 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="w-[min(1100px,92vw)]"
        onClick={(e) => e.stopPropagation()}
      >
        {source?.kind === "embed" ? (
          <iframe
            src={source.src}
            title="FRAME showreel"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full rounded-[4px] border-0 bg-black"
            data-testid="showreel-video-player"
          />
        ) : (
          <video
            src={source?.src}
            controls
            autoPlay
            playsInline
            className="aspect-video w-full rounded-[4px] bg-black"
            data-testid="showreel-video-player"
          />
        )}
        <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-paper/50">
          FRAME SHOWREEL — 2026
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ShowreelModal;
