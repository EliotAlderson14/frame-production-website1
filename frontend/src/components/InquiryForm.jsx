import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeUp } from "./Reveal";
import { usePreferences } from "../context/Preferences";

const PROJECT_TYPES = [
  "Commercial",
  "Branded Content",
  "Social Content",
  "Film Production",
  "Editing / Post",
  "Other",
];

const INITIAL = {
  name: "",
  company: "",
  email: "",
  phone: "",
  project_type: "",
  timeline: "",
  description: "",
};

const InquiryForm = () => {
  const { language } = usePreferences();
  const [form, setForm] = useState(INITIAL);
  const [drafted, setDrafted] = useState(false);
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.description || !form.project_type) {
      setError("Please fill in name, email, project type and description.");
      return;
    }
    setError("");
    const subject = encodeURIComponent(language === "ka" ? `პროექტის მოთხოვნა — ${form.name}` : `Project inquiry — ${form.name}`);
    const body = encodeURIComponent(
      language === "ka"
        ? `გამარჯობა FRAME PRODUCTION,\n\n${form.description}\n\nპროექტის ტიპი: ${form.project_type}\nვადები: ${form.timeline || "არ არის მითითებული"}\nკომპანია: ${form.company || "არ არის მითითებული"}\nტელეფონი: ${form.phone || "არ არის მითითებული"}\n\nგამომგზავნი: ${form.name}\nსაპასუხო ელფოსტა: ${form.email}`
        : `Hello FRAME PRODUCTION,\n\n${form.description}\n\nProject type: ${form.project_type}\nTimeline: ${form.timeline || "Not specified"}\nCompany: ${form.company || "Not specified"}\nPhone: ${form.phone || "Not specified"}\n\nFrom: ${form.name}\nReply to: ${form.email}`
    );
    setDrafted(true);
    window.location.href = `mailto:hello@frameproduction.ge?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} data-testid="inquiry-form" className="w-full">
      <div className="grid gap-x-10 gap-y-2 md:grid-cols-2">
        <div>
          <input className="field" placeholder="NAME *" value={form.name} onChange={set("name")} data-testid="contact-form-name" />
        </div>
        <div>
          <input className="field" placeholder="COMPANY / BRAND" value={form.company} onChange={set("company")} data-testid="contact-form-company" />
        </div>
        <div>
          <input className="field" type="email" placeholder="EMAIL *" value={form.email} onChange={set("email")} data-testid="contact-form-email" />
        </div>
        <div>
          <input className="field" placeholder="PHONE / WHATSAPP" value={form.phone} onChange={set("phone")} data-testid="contact-form-phone" />
        </div>
        <div className="relative">
          <select
            className="field text-mist"
            value={form.project_type}
            onChange={set("project_type")}
            data-testid="contact-form-project-type"
          >
            <option value="" className="text-mist">PROJECT TYPE *</option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="text-ink">{t}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 font-mono text-xs text-faint">▾</span>
        </div>
        <div>
          <input className="field" placeholder="TIMELINE" value={form.timeline} onChange={set("timeline")} data-testid="contact-form-timeline" />
        </div>
        <div className="md:col-span-2">
          <textarea
            className="field resize-none"
            rows="3"
            placeholder="PROJECT DESCRIPTION *"
            value={form.description}
            onChange={set("description")}
            data-testid="contact-form-description"
          />
        </div>
      </div>

      {error && (
        <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-signal" data-testid="contact-form-error">
          {error}
        </p>
      )}

      <motion.button
        type="submit"
        data-testid="contact-form-submit"
        whileTap={{ scale: 0.98 }}
        className="group mt-10 inline-flex items-center gap-3 rounded-full bg-ink px-9 py-4 font-mono text-[11px] font-medium tracking-[0.22em] text-paper transition-colors duration-300 hover:bg-[#222226] disabled:opacity-50"
      >
        OPEN EMAIL DRAFT
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </motion.button>

      {drafted && (
        <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-ink" data-testid="contact-form-success">
          REVIEW YOUR DRAFT IN YOUR EMAIL APP, THEN SEND IT.
        </p>
      )}
      {!drafted && <p className="mt-5 font-mono text-[11px] tracking-[0.1em] text-mist">YOUR EMAIL APP WILL OPEN SO YOU CAN REVIEW BEFORE SENDING.</p>}
    </form>
  );
};

export default InquiryForm;
