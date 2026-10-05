import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/projects";
import { Line, FadeUp, ImgReveal } from "../components/Reveal";

const GEAR = ["RED CINEMA", "ARRI ALEXA", "ANAMORPHIC PRIMES", "DAVINCI RESOLVE", "PREMIERE PRO", "AFTER EFFECTS"];

const Services = () => (
  <div className="pt-36 md:pt-44" data-testid="services-page">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">SERVICES</p>
      </FadeUp>
      <h1 className="mt-6 font-display text-[clamp(2.7rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-ink" data-testid="services-headline">
        <Line delay={0.05}>FROM IDEA</Line>
        <Line delay={0.2}>TO FINAL FRAME.</Line>
      </h1>
      <FadeUp delay={0.2}>
        <p className="mt-10 max-w-md text-base leading-relaxed text-mist sm:text-lg">
          Five disciplines, one creative vision. From the first idea to the final frame, we shape work with care and intention.
        </p>
      </FadeUp>

      {/* service rows with visuals */}
      <div className="mt-24 space-y-24 md:space-y-32" data-testid="services-list">
        {SERVICES.map((s, i) => (
          <div key={s.n} className="grid items-center gap-10 md:grid-cols-12">
            <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2 md:col-start-7" : ""}`}>
              <ImgReveal
                src={s.image}
                alt={s.title}
                className="aspect-[4/3] rounded-[4px] bg-lav"
              />
            </div>
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
              <FadeUp delay={0.1}>
                <p className="font-mono text-[11px] tracking-[0.3em] text-signal">{s.n}</p>
                <h2 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] text-ink sm:text-4xl lg:text-5xl">
                  {s.title}
                </h2>
                <p className="mt-6 max-w-md text-base leading-relaxed text-mist">{s.desc}</p>
                <Link
                  to="/contact"
                  data-testid={`service-cta-${s.n}`}
                  className="group mt-8 inline-flex items-center gap-2.5 font-mono text-[11px] font-medium tracking-[0.22em] text-ink"
                >
                  START A PROJECT
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </FadeUp>
            </div>
          </div>
        ))}
      </div>

      {/* gear strip */}
      <div className="mt-32 border-y border-edge py-8" data-testid="gear-strip">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {GEAR.map((g) => (
            <span key={g} className="font-mono text-[11px] font-medium tracking-[0.25em] text-faint">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Services;
