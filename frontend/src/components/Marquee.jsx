const Row = ({ items }) => (
  <div className="flex shrink-0 items-center">
    {items.map((item, i) => (
      <span key={i} className="flex items-center whitespace-nowrap">
        <span className="px-8 font-display text-[clamp(2.4rem,6.5vw,6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] text-ink sm:px-12">
          {item}
        </span>
        <span className="h-2.5 w-2.5 rounded-full bg-signal" aria-hidden="true" />
      </span>
    ))}
  </div>
);

/* One slow editorial marquee — items rendered once per half, second half aria-hidden */
const Marquee = ({ items }) => (
  <div
    className="relative w-full overflow-hidden border-y border-edge py-8 sm:py-10"
    data-testid="industry-marquee"
  >
    <div className="marquee-track">
      <Row items={items} />
      <div aria-hidden="true">
        <Row items={items} />
      </div>
    </div>
  </div>
);

export default Marquee;
