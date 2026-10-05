import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Cursor = () => {
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [state, setState] = useState("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 45, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 550, damping: 45, mass: 0.5 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => {
      const target = e.target.closest?.("[data-cursor], a, button, input, textarea, select, label");
      if (!target) return setState("default");
      const explicit = target.closest("[data-cursor]")?.dataset.cursor;
      if (explicit) return setState(explicit);
      if (target.matches("input, textarea, select, label")) return setState("default");
      return setState("button");
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isLabel = state === "view" || state === "play";
  const size = isLabel ? 84 : state === "button" ? 42 : 12;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      data-testid="custom-cursor"
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor: "rgba(244,242,238,0.96)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#111113] shadow-[0_0_0_1px_rgba(255,255,255,0.9),0_3px_20px_rgba(0,0,0,0.35)]"
      >
        {isLabel && (
          <span className="font-mono text-[10px] font-medium tracking-[0.22em] text-[#111113]">
            {state === "view" ? "VIEW" : "PLAY"}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Cursor;
