import InquiryForm from "../components/InquiryForm";
import { FadeUp, Line } from "../components/Reveal";

const CONTACTS = [
  ["EMAIL", "hello@frameproduction.ge", "mailto:hello@frameproduction.ge", "contact-page-email"],
];

const Contact = () => (
  <div className="pt-36 md:pt-44" data-testid="contact-page">
    <div className="mx-auto max-w-[1600px] px-5 sm:px-10 lg:px-16">
      <FadeUp>
        <p className="font-mono text-[11px] font-medium tracking-[0.3em] text-faint">CONTACT</p>
      </FadeUp>
      <h1 className="mt-6 font-display text-[clamp(2.7rem,8vw,7.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-ink" data-testid="contact-headline">
        <Line delay={0.05}>LET'S TALK.</Line>
      </h1>
      <FadeUp delay={0.2}>
        <p className="mt-10 max-w-md text-base leading-relaxed text-mist sm:text-lg">
          Tell us what you're making. Share the idea, timing, and anything that would help us shape the conversation.
        </p>
      </FadeUp>

      <div className="mt-20 grid gap-16 pb-28 lg:grid-cols-2">
        <FadeUp delay={0.1}>
          <InquiryForm />
        </FadeUp>

        <div className="lg:pt-10">
          <FadeUp delay={0.2} className="space-y-8">
            {CONTACTS.map(([label, value, href, tid]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group block border-t border-edge pt-6" data-testid={tid}>
                <p className="font-mono text-[10px] tracking-[0.3em] text-faint">{label}</p>
                <p className="mt-2 break-all font-display text-xl font-extrabold uppercase tracking-tight text-ink transition-colors duration-300 group-hover:text-faint sm:text-3xl">
                  {value}
                </p>
              </a>
            ))}
          </FadeUp>

          <FadeUp delay={0.3} className="mt-12 border-t border-edge pt-6">
            <p className="font-mono text-[10px] tracking-[0.3em] text-faint">LOCATION</p>
            <p className="mt-2 font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
              TBILISI, GEORGIA
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.25em] text-faint">WORKING WORLDWIDE</p>
          </FadeUp>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
