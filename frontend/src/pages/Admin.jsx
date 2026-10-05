import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowUpRight, Lock, RefreshCw } from "lucide-react";
import { Line, FadeUp } from "../components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Admin = () => {
  const [code, setCode] = useState(() => sessionStorage.getItem("frameAdminCode") || "");
  const [draft, setDraft] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async (value) => {
    if (!value) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${API}/inquiries`, {
        headers: { "X-Admin-Access-Code": value },
      });
      sessionStorage.setItem("frameAdminCode", value);
      setCode(value);
      setRows(data);
    } catch (e) {
      sessionStorage.removeItem("frameAdminCode");
      setCode("");
      setRows([]);
      setError(
        e.response?.status === 401
          ? "INCORRECT ACCESS CODE."
          : "COULD NOT LOAD INQUIRIES — CHECK THE CONNECTION."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (code) load(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    sessionStorage.removeItem("frameAdminCode");
    setCode("");
    setDraft("");
    setRows([]);
  };

  /* ---------- gate ---------- */
  if (!code) {
    return (
      <div className="flex min-h-[100svh] flex-col items-center justify-center bg-cinema px-6 text-paper" data-testid="admin-gate">
        <FadeUp className="w-full max-w-md text-center">
          <Lock size={22} className="mx-auto text-paper/50" />
          <h1 className="mt-8 font-display text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
            <Line delay={0.05} light>INQUIRY INBOX.</Line>
          </h1>
          <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-paper/50">
            STUDIO ONLY — ENTER THE ACCESS CODE
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              load(draft);
            }}
            className="mt-10"
          >
            <input
              type="password"
              className="field field-light text-center"
              placeholder="ACCESS CODE"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              data-testid="admin-code-input"
              autoComplete="current-password"
            />
            <button
              type="submit"
              disabled={loading || !draft}
              data-testid="admin-code-submit"
              className="mt-8 w-full rounded-full bg-paper px-8 py-4 font-mono text-[11px] font-medium tracking-[0.22em] text-ink transition-opacity duration-300 hover:opacity-85 disabled:opacity-40"
            >
              {loading ? "CHECKING…" : "CONTINUE"}
            </button>
          </form>
          {error && (
            <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-[#ff6b64]" data-testid="admin-error">
              {error}
            </p>
          )}
        </FadeUp>
      </div>
    );
  }

  /* ---------- inbox ---------- */
  return (
    <div className="min-h-[100svh] bg-cinema pb-24 pt-36 text-paper md:pt-44" data-testid="admin-inbox">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-10">
        <FadeUp>
          <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-paper/50">STUDIO ONLY</p>
        </FadeUp>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em]">
            <Line delay={0.05} light>INQUIRY INBOX.</Line>
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => load(code)}
              data-testid="admin-refresh"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-paper/80 transition-colors hover:bg-paper hover:text-ink"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              REFRESH
            </button>
            <button
              onClick={signOut}
              data-testid="admin-signout"
              className="rounded-full border border-paper/25 px-5 py-2.5 font-mono text-[10px] tracking-[0.2em] text-paper/80 transition-colors hover:bg-paper hover:text-ink"
            >
              SIGN OUT
            </button>
          </div>
        </div>

        <FadeUp delay={0.1}>
          <p className="mt-4 font-mono text-[11px] tracking-[0.3em] text-paper/50" data-testid="admin-count">
            ( {String(rows.length).padStart(2, "0")} INQUIRIES )
          </p>
        </FadeUp>

        <div className="mt-12 space-y-5">
          {rows.map((r, i) => (
            <FadeUp key={r.id || i} delay={Math.min(i * 0.05, 0.25)}>
              <article
                className="rounded-[4px] border border-paper/10 p-6 transition-colors duration-300 hover:border-paper/25 sm:p-8"
                data-testid={`admin-inquiry-${i + 1}`}
              >
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["NAME", r.name],
                    ["EMAIL", r.email],
                    ["PROJECT TYPE", r.project_type],
                    ["TIMELINE", r.timeline || "—"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="font-mono text-[9px] tracking-[0.3em] text-paper/40">{label}</p>
                      <p className="mt-1.5 break-all font-display text-sm font-bold uppercase tracking-wide">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-paper/10 pt-5 text-sm leading-relaxed text-paper/75">
                  {r.description}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[9px] tracking-[0.25em] text-paper/40">
                  <span>
                    {r.company ? `${r.company} — ` : ""}
                    {r.phone || "NO PHONE"}
                  </span>
                  <span>{(r.created_at || "").slice(0, 16).replace("T", " · ")}</span>
                </div>
              </article>
            </FadeUp>
          ))}

          {!loading && rows.length === 0 && (
            <p className="py-20 text-center font-mono text-[11px] tracking-[0.3em] text-paper/40" data-testid="admin-empty">
              NO INQUIRIES YET — THE NEXT BRIEF LANDS HERE.
            </p>
          )}
        </div>

        <FadeUp className="mt-16 text-center">
          <a
            href="/"
            data-testid="admin-back-to-site"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-paper/50 transition-colors hover:text-paper"
          >
            BACK TO SITE <ArrowUpRight size={12} />
          </a>
        </FadeUp>
      </div>
    </div>
  );
};

export default Admin;
