import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TEAM } from "../data/projects";
import { Line, FadeUp, ImgReveal } from "../components/Reveal";

const CAPABILITIES = ["PRODUCTION", "CAMERA", "EDITING", "POST-PRODUCTION", "ON-CAMERA TALENT"];

const About = () => (
  <div className="pt-36 md:pt-44" data-testid="about-page">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">ABOUT FRAME</p>
      </FadeUp>

      <h1 className="mt-6 font-display text-[clamp(2.7rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-ink" data-testid="about-headline">
        <Line delay={0.05}>THREE MINDS.</Line>
        <Line delay={0.2}>ONE VISION.</Line>
      </h1>

      <div className="mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeUp delay={0.1}>
            <p className="text-xl leading-relaxed text-ink sm:text-2xl">
              FRAME is a small focused production team combining production, camera, editing, post-production and on-camera talent.
            </p>
          </FadeUp>
        </div>
        <div className="md:col-span-4 md:col-start-8">
          <FadeUp delay={0.2}>
            <p className="text-base leading-relaxed text-mist">
              We keep the crew small on purpose. The people who develop the idea are the people who shoot it, cut it and stand behind it — from the first treatment call to the final graded master.
            </p>
            <p className="mt-6 text-base leading-relaxed text-mist">
              Based in Tbilisi, Georgia. Working worldwide, wherever the story needs to go.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* portraits */}
      <div className="mt-24 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" data-testid="about-team">
        {TEAM.map((m, i) => (
          <FadeUp key={m.n} delay={i * 0.1}>
            <div className="group">
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

      {/* capabilities + production image */}
      <div className="mt-28 grid items-start gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <FadeUp>
            <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">WHAT WE COVER</p>
            <ul className="mt-8" data-testid="about-capabilities">
              {CAPABILITIES.map((c, i) => (
                <li
                  key={c}
                  className="flex items-baseline gap-6 border-t border-edge py-5 font-display text-2xl font-extrabold uppercase tracking-tight text-ink last:border-b sm:text-3xl"
                >
                  <span className="font-mono text-[11px] font-medium text-faint">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ImgReveal
            src="/media/stock/photo-1632187981988-40f3cbaeef5e.jpg"
            alt="FRAME production team on set"
            className="aspect-[4/3] rounded-[4px] bg-lav"
          />
          <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-faint">
            THE TEAM — TBILISI, GEORGIA · WORKING WORLDWIDE
          </p>
        </div>
      </div>

      {/* CTA */}
      <FadeUp className="my-28 flex flex-col items-center gap-8 text-center">
        <h2 className="font-display text-[clamp(1.85rem,4vw,3.55rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink">
          <Line delay={0.05}>SOUND LIKE YOUR</Line>
          <Line delay={0.18}>KIND OF TEAM?</Line>
        </h2>
        <Link
          to="/contact"
          data-testid="about-cta"
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 font-mono text-[11px] font-medium tracking-[0.22em] text-paper transition-colors duration-300 hover:bg-[#222226]"
        >
          LET'S TALK
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </FadeUp>
    </div>
  </div>
);

export default About;
