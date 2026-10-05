import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FrameLogo from "./FrameLogo";
import { FadeUp } from "./Reveal";

const Footer = () => (
  <footer className="bg-cinema text-paper" data-testid="site-footer">
    <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 sm:px-10 md:pt-28 lg:px-16">
      <div className="grid gap-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <FadeUp>
          <FrameLogo dark glow />
          <p className="mt-8 max-w-xs text-sm leading-relaxed text-paper/60">
            A video production team turning individual frames into stories. Film, commercials and branded content — from concept to final frame.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-paper/40">MENU</p>
          <ul className="mt-6 space-y-3">
            {[
              ["WORK", "/work"],
              ["ABOUT", "/about"],
              ["SERVICES", "/services"],
              ["CONTACT", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link
                  to={to}
                  data-testid={`footer-link-${label.toLowerCase()}`}
                  className="group inline-flex items-center gap-1.5 font-display text-sm font-bold tracking-[0.12em] text-paper/80 transition-colors hover:text-paper"
                >
                  {label}
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-paper/40">CONTACT</p>
          <ul className="mt-6 space-y-3">
            <li>
              <a href="mailto:hello@frameproduction.ge" data-testid="footer-link-email" className="font-display text-sm font-bold tracking-[0.12em] text-paper/80 transition-colors hover:text-paper">
                EMAIL
              </a>
            </li>
          </ul>
          <p className="mt-8 font-mono text-[10px] tracking-[0.25em] text-paper/40">
            TBILISI, GEORGIA — WORKING WORLDWIDE
          </p>
        </FadeUp>
      </div>

      <div className="mt-20 select-none overflow-hidden" aria-hidden="true">
        <p className="text-center font-display text-[16.5vw] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] text-paper/[0.06]">
          FRAME
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 font-mono text-[10px] tracking-[0.25em] text-paper/40 sm:flex-row">
        <span>© 2026 FRAME PRODUCTION</span>
        <span>ALL FRAMES RESERVED</span>
      </div>
    </div>
  </footer>
);

export default Footer;
