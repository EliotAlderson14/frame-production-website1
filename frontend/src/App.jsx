import { Component, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Lenis from "lenis";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-faint">FRAME PRODUCTION</p>
          <p className="font-display text-2xl font-extrabold uppercase text-ink">Something broke the frame.</p>
          <Link to="/" className="font-mono text-[11px] tracking-[0.2em] text-ink underline">
            BACK TO HOME
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

const Page = ({ children, testid }) => (
  <motion.main
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    data-testid={testid}
  >
    {children}
  </motion.main>
);

const RouteEffects = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-paper px-6 text-center">
    <p className="font-mono text-[11px] tracking-[0.3em] text-faint">404 — FRAME NOT FOUND</p>
    <Link to="/" data-testid="notfound-home-link" className="font-display text-xl font-extrabold uppercase tracking-tight text-ink underline">
      BACK TO HOME
    </Link>
  </div>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <RouteEffects />
        <div className="grain" aria-hidden="true" />
        <Cursor />
        <Nav />
        <Routes>
          <Route path="/" element={<Page testid="page-home"><Home /></Page>} />
          <Route path="/work" element={<Page testid="page-work"><Work /></Page>} />
          <Route path="/work/:slug" element={<Page testid="page-project-detail"><ProjectDetail /></Page>} />
          <Route path="/about" element={<Page testid="page-about"><About /></Page>} />
          <Route path="/services" element={<Page testid="page-services"><Services /></Page>} />
          <Route path="/contact" element={<Page testid="page-contact"><Contact /></Page>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
