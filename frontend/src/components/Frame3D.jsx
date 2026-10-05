import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* The brand object: a thin floating rectangular frame in 3D space.
   Tilts subtly toward the cursor. Pure CSS 3D — minimal, sophisticated. */
const Frame3D = () => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-16, 16]), { stiffness: 60, damping: 18 });
  const rotateX = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 60, damping: 18 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="pointer-events-auto absolute right-[6%] top-[18%] hidden md:block lg:right-[10%]"
      style={{ perspective: 1200 }}
      data-testid="hero-frame-3d"
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-[clamp(180px,22vw,300px)] w-[clamp(126px,15.5vw,210px)]"
        >
          <div
            className="absolute inset-0 border border-paper/50"
            style={{ transform: "translateZ(0px)" }}
          />
          <div
            className="absolute inset-0 border border-paper/15"
            style={{ transform: "translateZ(-70px)" }}
          />
          <div
            className="absolute inset-0 border border-paper/10"
            style={{ transform: "translateZ(46px)" }}
          />
          <div
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
            style={{ transform: "translate(-50%,-50%) translateZ(30px)" }}
          />
          <span
            className="absolute -bottom-7 left-0 font-mono text-[9px] tracking-[0.3em] text-paper/50"
            style={{ transform: "translateZ(20px)" }}
          >
            24 FPS — 4K
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Frame3D;
