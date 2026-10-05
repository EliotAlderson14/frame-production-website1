import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* Masked line reveal — the signature headline motion.
   The mask (outer span) is observed by whileInView; only the inner line moves. */
export const Line = ({ children, delay = 0, className = "", light = false }) => {
  const line = {
    hidden: { y: "112%" },
    visible: { y: 0, transition: { duration: 1.05, delay, ease: EASE } },
  };
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.span className={`block ${light ? "text-paper" : ""}`} variants={line}>
        {children}
      </motion.span>
    </motion.span>
  );
};

export const FadeUp = ({ children, delay = 0, className = "", y = 30 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

/* Image mask reveal — clip + settle scale */
export const ImgReveal = ({ src, alt = "", className = "", delay = 0, imgClassName = "" }) => (
  <motion.div
    className={`overflow-hidden ${className}`}
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 1.1, delay, ease: EASE }}
  >
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover ${imgClassName}`}
      initial={{ scale: 1.18 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    />
  </motion.div>
);

/* Section header pattern: ( 01 )  LABEL  —  HEADLINE */
export const SectionHead = ({ index, label, children, className = "", light = false }) => (
  <div className={className}>
    <FadeUp>
      <p
        className={`font-mono text-[11px] font-medium tracking-[0.3em] ${
          light ? "text-paper/60" : "text-faint"
        }`}
        data-testid={`section-label-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      >
        {index && `( ${index} )\u00A0\u00A0`}
        {label}
      </p>
    </FadeUp>
    <h2
      className={`mt-6 font-display text-[clamp(1.85rem,4.6vw,3.7rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] ${
        light ? "text-paper" : "text-ink"
      }`}
    >
      {children}
    </h2>
  </div>
);
