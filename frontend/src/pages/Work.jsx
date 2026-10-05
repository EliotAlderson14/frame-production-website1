import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, FILTERS } from "../data/projects";
import { Line, FadeUp } from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import { usePreferences } from "../context/Preferences";

const Work = () => {
  const { language } = usePreferences();
  const [filter, setFilter] = useState("all");
  const filtered = PROJECTS.filter((p) => filter === "all" || p.categoryKey === filter);
  const availableFilters = FILTERS.filter((f) => f.key === "all" || PROJECTS.some((p) => p.categoryKey === f.key));

  return (
    <div className="pt-36 md:pt-44">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <FadeUp>
              <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">PORTFOLIO</p>
            </FadeUp>
            <h1 className="mt-6 font-display text-[clamp(2.7rem,7.1vw,6.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-ink" data-testid="work-headline">
              <Line delay={0.05}>ALL WORK</Line>
            </h1>
          </div>
          <FadeUp delay={0.2}>
            <p className="font-mono text-[11px] tracking-[0.3em] text-faint" data-testid="work-count">
              ( {String(filtered.length).padStart(2, "0")} {language === "ka" ? "პროექტი" : "PROJECTS"} )
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-2.5 border-y border-edge py-5" data-testid="work-filters">
            {availableFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-testid={`work-filter-${f.key}`}
                className={`rounded-full border px-4.5 py-2 font-mono text-[10px] font-medium tracking-[0.2em] transition-all duration-300 ${
                  filter === f.key
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/15 text-mist hover:border-ink/40 hover:text-ink"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </FadeUp>

        <motion.div layout className="mt-14 grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-24" data-testid="work-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
