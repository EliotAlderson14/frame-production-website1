import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import {
  PROJECTS, SERVICES, PROCESS, TEAM, INDUSTRIES, FILTERS,
  HERO_IMAGE, SHOWREEL_POSTER, SHOWREEL_VIDEO,
} from "../data/projects";
import { Line, FadeUp, ImgReveal, SectionHead, EASE } from "../components/Reveal";
import ProjectCard from "../components/ProjectCard";
import Marquee from "../components/Marquee";
import Frame3D from "../components/Frame3D";
import ShowreelModal from "../components/ShowreelModal";
import InquiryForm from "../components/InquiryForm";

/* ---------------- HERO ---------------- */
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-cinema" data-testid="hero-section">
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <motion.img
          src={HERO_IMAGE}
          alt="FRAME PRODUCTION on set"
          className="h-full w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cinema/60 via-cinema/15 to-cinema/75" />
      </motion.div>

      <Frame3D />

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 flex h-full flex-col justify-between">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="mt-24 flex items-center gap-3 px-5 font-mono text-[10px] font-medium tracking-[0.35em] text-paper/80 sm:px-10 md:mt-28 lg:px-16"
          data-testid="hero-label"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
          CREATIVE VIDEO PRODUCTION
        </motion.p>

        <div className="px-5 pb-10 sm:px-10 lg:px-16 lg:pb-14">
          <h1
            className="font-display text-[clamp(2.8rem,9.2vw,8.4rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-paper"
            data-testid="hero-headline"
          >
            <Line delay={0.15}>WE CREATE</Line>
            <Line delay={0.3}>MOVING IMAGES.</Line>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease: EASE }}
            className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-sm text-sm leading-relaxed text-paper/75 sm:text-base" data-testid="hero-subline">
              Film, commercials and branded content created from concept to final frame.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/work"
                data-testid="hero-cta-work"
                className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 font-mono text-[11px] font-medium tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-[#e5e2dc]"
              >
                VIEW OUR WORK
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                data-testid="hero-cta-talk"
                className="group inline-flex items-center gap-2.5 rounded-full border border-paper/40 px-7 py-3.5 font-mono text-[11px] font-medium tracking-[0.2em] text-paper transition-all duration-300 hover:bg-paper hover:text-ink"
              >
                LET'S TALK
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

/* ---------------- INTRO ---------------- */
const Intro = () => (
  <section className="bg-lav py-24 md:py-36" data-testid="intro-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <FadeUp>
            <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 01 ) — INTRO</p>
          </FadeUp>
          <h2 className="mt-8 font-display text-[clamp(2.35rem,5.3vw,4.85rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
            <Line delay={0.05}>EVERY FRAME</Line>
            <Line delay={0.18}>HAS A PURPOSE.</Line>
          </h2>
        </div>
        <div className="flex flex-col justify-end md:col-span-4 md:col-start-9">
          <FadeUp delay={0.15}>
            <p className="text-base leading-relaxed text-mist sm:text-lg" data-testid="intro-body">
              FRAME is a video production team creating videos, commercials and branded content for companies.
            </p>
            <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">
              We combine production, visual storytelling and post-production to create memorable moving images.
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- SELECTED WORK ---------------- */
const SelectedWork = () => {
  const [filter, setFilter] = useState("all");
  const filtered = PROJECTS.filter((p) => filter === "all" || p.categoryKey === filter);
  const availableFilters = FILTERS.filter((f) => f.key === "all" || PROJECTS.some((p) => p.categoryKey === f.key));

  return (
    <section className="py-24 md:py-36" data-testid="selected-work-section">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <FadeUp>
              <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 02 ) — SELECTED WORK</p>
            </FadeUp>
            <h2 className="mt-8 font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
              <Line delay={0.05}>WORK MADE</Line>
              <Line delay={0.18}>TO BE WATCHED.</Line>
            </h2>
          </div>
          <FadeUp delay={0.2} className="lg:pb-2">
            <p className="max-w-xs text-sm leading-relaxed text-mist">
              A selection of films, commercials, branded content and visual experiments.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-2.5" data-testid="work-filters">
            {availableFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-testid={`project-filter-${f.key}`}
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

        <motion.div layout className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 lg:mt-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <FadeUp className="mt-20 flex justify-center">
          <Link
            to="/work"
            data-testid="home-view-all-work"
            className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-8 py-4 font-mono text-[11px] font-medium tracking-[0.22em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            ALL WORK
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
};

/* ---------------- SHOWREEL ---------------- */
const Showreel = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="bg-cinema py-24 text-paper md:py-36" data-testid="showreel-section">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between">
          <FadeUp>
            <p className="flex items-center gap-3 font-mono text-[11px] font-medium tracking-[0.3em] text-paper/60">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              ( 03 ) — FRAME SHOWREEL
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-display text-[clamp(2.7rem,7.1vw,6.6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-paper/90" data-testid="showreel-year">
              2026
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="mt-12">
          <div
            className="media-surface group relative aspect-video w-full overflow-hidden rounded-[4px] bg-[#18181B]"
            data-cursor={SHOWREEL_VIDEO ? "play" : undefined}
            data-testid="showreel-play"
            onClick={SHOWREEL_VIDEO ? () => setOpen(true) : undefined}
            onKeyDown={SHOWREEL_VIDEO ? (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setOpen(true); } } : undefined}
            role={SHOWREEL_VIDEO ? "button" : undefined}
            tabIndex={SHOWREEL_VIDEO ? 0 : undefined}
            aria-label={SHOWREEL_VIDEO ? "Play showreel" : undefined}
          >
            <img
              src={SHOWREEL_POSTER}
              alt="Showreel still"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-cinema/35 transition-colors duration-500 group-hover:bg-cinema/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 rounded-full bg-paper px-8 py-4 font-mono text-[11px] font-medium tracking-[0.22em] text-ink transition-transform duration-500 group-hover:scale-105">
                {SHOWREEL_VIDEO ? "PLAY SHOWREEL" : "SHOWREEL COMING SOON"}
                {SHOWREEL_VIDEO && <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />}
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
      <AnimatePresence>{open && <ShowreelModal src={SHOWREEL_VIDEO} onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  );
};

/* ---------------- SERVICES ROWS ---------------- */
const ServicesTeaser = () => (
  <section className="py-24 md:py-36" data-testid="services-teaser-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <FadeUp>
            <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 04 ) — WHAT WE DO</p>
          </FadeUp>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
            <Line delay={0.05}>FROM IDEA</Line>
            <Line delay={0.18}>TO FINAL FRAME.</Line>
          </h2>
        </div>
        <FadeUp delay={0.2}>
          <Link to="/services" data-testid="services-teaser-link" className="group inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.22em] text-ink">
            ALL SERVICES
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeUp>
      </div>

      <div className="mt-16">
        {SERVICES.slice(0, 5).map((s, i) => (
          <FadeUp key={s.n} delay={Math.min(i * 0.04, 0.15)}>
            <Link
              to="/services"
              data-testid={`service-row-${s.n}`}
              className={`group flex items-center justify-between gap-6 border-t border-edge px-2 py-8 transition-colors duration-300 hover:bg-lav md:px-6 md:py-10 ${
                i === 4 ? "border-b" : ""
              }`}
            >
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="font-mono text-xs text-faint">{s.n}</span>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 sm:text-3xl lg:text-4xl">
                  {s.title}
                </h3>
              </div>
              <div className="flex items-center gap-8">
                <p className="hidden max-w-xs text-right text-sm leading-relaxed text-mist lg:block">{s.desc}</p>
                <ArrowUpRight
                  size={22}
                  className="shrink-0 text-faint transition-all duration-500 group-hover:rotate-45 group-hover:text-ink"
                />
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- PROCESS ---------------- */
const Process = () => (
  <section className="bg-lav py-24 md:py-36" data-testid="process-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 05 ) — OUR PROCESS</p>
      </FadeUp>
      <h2 className="mt-8 font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
        <Line delay={0.05}>FROM CONCEPT</Line>
        <Line delay={0.18}>TO FINAL CUT.</Line>
      </h2>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[4px] bg-edge sm:grid-cols-2 lg:grid-cols-6">
        {PROCESS.map((step, i) => (
          <FadeUp key={step.n} delay={i * 0.07} className="bg-lav">
            <div className="group flex h-full flex-col gap-16 bg-lav p-7 transition-colors duration-300 hover:bg-paper" data-testid={`process-step-${step.n}`}>
              <span className="font-mono text-xs text-signal">{step.n}</span>
              <div>
                <h3 className="font-display text-base font-extrabold uppercase tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-mist">{step.desc}</p>
              </div>
              <span className="mt-auto h-px w-full bg-edge transition-colors duration-500 group-hover:bg-ink" />
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- TEAM ---------------- */
const Team = () => (
  <section className="py-24 md:py-36" data-testid="team-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 06 ) — ABOUT / TEAM</p>
      </FadeUp>
      <h2 className="mt-8 font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
        <Line delay={0.05}>THREE MINDS.</Line>
        <Line delay={0.18}>ONE VISION.</Line>
      </h2>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {TEAM.map((m, i) => (
          <FadeUp key={m.n} delay={i * 0.1}>
            <div className="group" data-testid={`team-card-${m.n}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-lav">
                <img
                  src={m.portrait}
                  alt={m.role}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                />
                <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-paper/90 mix-blend-difference">
                  {m.n}
                </span>
              </div>
              <p className="mt-5 font-mono text-[10px] tracking-[0.25em] text-faint">{m.discipline}</p>
              <h3 className="mt-2 font-display text-lg font-extrabold uppercase tracking-tight text-ink">{m.role}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-mist">{m.bio}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- OUR STORY ---------------- */
const Story = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const yB = useTransform(scrollYProgress, [0, 1], [40, -50]);

  return (
    <section ref={ref} className="overflow-hidden py-24 md:py-36" data-testid="story-section">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <FadeUp>
          <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 07 ) — OUR STORY</p>
        </FadeUp>
        <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
          <Line delay={0.05}>WE TURN IDEAS</Line>
          <Line delay={0.18}>INTO MOVING IMAGES.</Line>
        </h2>

        <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-8">
          <motion.div style={{ y: yA }} className="md:col-span-5">
            <ImgReveal
              src="/media/stock/photo-1612544409025-e1f6a56c1152.jpg"
              alt="On set, lighting rig"
              className="aspect-[3/4] rounded-[4px] bg-lav"
            />
            <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-faint">ON LOCATION — TBILISI</p>
          </motion.div>

          <div className="flex flex-col justify-end md:col-span-3 md:pb-4">
            <FadeUp delay={0.15}>
              <p className="text-base leading-relaxed text-mist sm:text-lg">
                We are a small, focused team that develops ideas, shoots, edits and grades together. No handoffs, no dilution — the idea that starts the film is the idea that finishes it.
              </p>
              <p className="mt-8 font-display text-xl font-bold uppercase leading-snug tracking-tight text-ink sm:text-2xl">
                "IF IT DOESN'T MOVE YOU, IT DOESN'T MOVE."
              </p>
              <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-faint">— FRAME PRODUCTION CREED</p>
            </FadeUp>
          </div>

          <motion.div style={{ y: yB }} className="md:col-span-4 md:mt-24">
            <ImgReveal
              src="/media/stock/photo-1632187989763-c9c620420b4d.jpg"
              alt="Crew around camera"
              className="aspect-[4/5] rounded-[4px] bg-lav"
              delay={0.1}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- INDUSTRIES ---------------- */
const Industries = () => (
  <section className="py-24 md:py-32" data-testid="industries-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 08 ) — CLIENT / INDUSTRY TYPES</p>
      </FadeUp>
      <h2 className="mt-8 font-display text-[clamp(2.2rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
        <Line delay={0.05}>BUILT FOR VISUAL STORIES.</Line>
      </h2>
    </div>
    <FadeUp delay={0.15} className="mt-16">
      <Marquee items={INDUSTRIES} />
    </FadeUp>
  </section>
);

/* ---------------- CONTACT ---------------- */
export const ContactSection = () => (
  <section className="bg-lav py-24 md:py-36" data-testid="contact-section">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <FadeUp>
            <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 09 ) — CONTACT</p>
          </FadeUp>
          <h2 className="mt-8 font-display text-[clamp(2.35rem,4.9vw,4.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
            <Line delay={0.05}>HAVE A PROJECT</Line>
            <Line delay={0.18}>IN MIND?</Line>
            <Line delay={0.3} className="text-faint">LET'S TALK.</Line>
          </h2>

          <FadeUp delay={0.2} className="mt-14 space-y-6">
            {[
              ["EMAIL", "hello@frameproduction.ge", "mailto:hello@frameproduction.ge", "contact-email"],
            ].map(([label, value, href, tid]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block" data-testid={tid}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-faint">{label}</p>
                <p className="mt-1.5 break-all font-display text-lg font-bold uppercase tracking-tight text-ink transition-colors duration-300 group-hover:text-faint sm:text-xl">
                  {value}
                </p>
              </a>
            ))}
            <div className="pt-4">
              <p className="font-mono text-[10px] tracking-[0.3em] text-faint">LOCATION</p>
              <p className="mt-1.5 font-display text-lg font-bold uppercase tracking-tight text-ink sm:text-xl">
                TBILISI, GEORGIA — WORKING WORLDWIDE
              </p>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.15} className="lg:pt-14">
          <InquiryForm />
        </FadeUp>
      </div>
    </div>
  </section>
);

/* ---------------- SELECTED FRAMES ---------------- */
const FramesStrip = () => {
  return (
    <section className="py-24 md:py-32" data-testid="frames-section">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <FadeUp>
              <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">( 10 ) — SELECTED FRAMES</p>
            </FadeUp>
            <h2 className="mt-8 font-display text-[clamp(1.85rem,4vw,3.4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
              <Line delay={0.05}>LATEST FRAMES.</Line>
            </h2>
          </div>
          <FadeUp delay={0.15}>
            <Link
              to="/work"
              data-testid="frames-work-link"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 font-mono text-[11px] font-medium tracking-[0.2em] text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              VIEW ALL WORK
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeUp>
        </div>
      </div>

      <FadeUp delay={0.1} className="mt-12">
        <div className="grid grid-cols-3 gap-1.5 px-1.5 sm:gap-3 sm:px-3 lg:grid-cols-5" aria-label="Selected project frames">
          {PROJECTS.slice(0, 6).map((p) => (
            <Link to={`/work/${p.slug}`} key={p.slug} className="group relative aspect-square overflow-hidden rounded-[4px] bg-lav" data-testid={`frame-tile-${p.slug}`}>
              <img
                src={p.poster}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-cinema/45 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <span className="px-2 text-center font-mono text-[8px] tracking-[0.2em] text-paper">{p.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </FadeUp>
    </section>
  );
};

const Home = () => (
  <>
    <Hero />
    <Intro />
    <SelectedWork />
    <Showreel />
    <ServicesTeaser />
    <Process />
    <Team />
    <Story />
    <Industries />
    <FramesStrip />
    <ContactSection />
  </>
);

export default Home;
