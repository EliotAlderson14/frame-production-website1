import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import FrameLogo from "./FrameLogo";
import { EASE } from "./Reveal";
import { usePreferences } from "../context/Preferences";

const LINKS = [
  { to: "/work", label: "WORK" },
  { to: "/about", label: "ABOUT" },
  { to: "/services", label: "SERVICES" },
  { to: "/contact", label: "CONTACT" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { theme, language, toggleTheme, toggleLanguage } = usePreferences();
  const solid = scrolled || pathname !== "/";
  const heroHeader = !solid;
  const light = open || heroHeader || theme === "dark";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const l = window.__lenis;
    if (open) {
      l?.stop();
      document.body.style.overflow = "hidden";
    } else {
      l?.start();
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          solid
            ? "border-b border-ink/5 bg-paper/85 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
        data-testid="site-nav"
        data-scrolled={solid}
        data-open={open}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-10 lg:px-16 ${
            heroHeader && !open ? "mix-blend-difference" : ""
          }`}
        >
          <Link to="/" data-testid="nav-link-home" aria-label="FRAME PRODUCTION home">
            <FrameLogo dark={light} />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `group relative font-mono text-[11px] font-medium tracking-[0.22em] transition-colors duration-300 ${
                    isActive
                      ? light
                        ? "text-paper"
                        : "text-ink"
                      : light
                        ? "text-paper/70 hover:text-paper"
                        : "text-mist hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px transition-all duration-300 ${
                        light ? "bg-paper" : "bg-ink"
                      } ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className={`flex items-center gap-1 rounded-full border p-1 ${light ? "border-paper/45 text-paper" : "border-ink/25 text-ink"}`}>
              <button
                type="button"
                onClick={toggleTheme}
                data-testid="theme-toggle"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
                className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${light ? "hover:bg-paper/20" : "hover:bg-ink/10"}`}
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <span className={`h-4 w-px ${light ? "bg-paper/35" : "bg-ink/25"}`} />
              <button
                type="button"
                onClick={toggleLanguage}
                data-testid="language-toggle"
                aria-label={language === "ka" ? "Switch to English" : "Switch to Georgian"}
                className="min-w-10 rounded-full px-1.5 py-2 font-mono text-[10px] font-bold tracking-wide transition-opacity hover:opacity-60"
              >
                {language === "ka" ? "EN" : "ქარ"}
              </button>
            </div>
            <Link
              to="/contact"
              data-testid="nav-lets-talk"
              className={`group hidden items-center gap-2 rounded-full border px-6 py-2.5 font-mono text-[11px] font-medium tracking-[0.2em] transition-colors duration-300 md:inline-flex ${
                light
                  ? "border-paper/50 text-paper hover:bg-paper hover:text-ink"
                  : "border-ink/20 text-ink hover:bg-ink hover:text-paper"
              }`}
            >
              LET'S TALK
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              onClick={() => setOpen(!open)}
              data-testid="mobile-menu-button"
              className={`font-mono text-[11px] font-medium tracking-[0.25em] transition-colors duration-300 md:hidden ${
                light ? "text-paper" : "text-ink"
              }`}
              aria-expanded={open}
            >
              {open ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-[85] flex flex-col justify-between bg-cinema px-6 pb-10 pt-28"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-3">
              {LINKS.map((l, i) => (
                <span key={l.to} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE }}
                    className="block"
                  >
                    <Link
                      to={l.to}
                      data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                      className="font-display text-4xl font-extrabold uppercase tracking-tight text-paper"
                    >
                      {l.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex items-end justify-between font-mono text-[10px] tracking-[0.25em] text-paper/50"
            >
              <span>TBILISI, GEORGIA</span>
              <span>WORKING WORLDWIDE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
