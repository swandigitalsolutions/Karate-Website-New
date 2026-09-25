import { Newspaper } from "lucide-react";
import { Img } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { Split } from "@/components/Split";
import { press } from "@/data/content";

const pressItems = press.map((p) => ({ image: p.image, alt: p.english, caption: `${p.outlet}${p.date ? ` · ${p.date}` : ""} — ${p.english}` }));

export function Press() {
  const [openPress, pressLightbox] = useLightbox(pressItems);

  // The press row is duplicated so the CSS marquee can loop seamlessly; the copy is hidden from assistive tech.
  const cards = (copy: boolean) =>
    press.map((item, i) => (
      <button className="press-card" key={`${copy}-${item.image}`} onClick={() => openPress(i)} tabIndex={copy ? -1 : 0} aria-hidden={copy || undefined}>
        <span className="press-thumb">
          <Img name={item.image} alt="" sizes="(max-width: 900px) 92px, 116px" eager />
        </span>
        <span className="press-text">
          <small>
            <Newspaper size={13} /> {item.outlet}
            {item.date && ` · ${item.date}`}
          </small>
          <strong>{item.english}</strong>
          <span lang="kn">{item.kannada}</span>
        </span>
      </button>
    ));

  return (
    <section id="press" className="section press">
      <div className="container">
        <div className="section-head">
          <span className="badge">In the news</span>
          <Split text="Devanahalli" accent="read all about it." />
          <p className="section-sub" data-reveal>
            When our students came home from Malaysia, the Kannada press told the story. Tap any headline to read the clipping.
          </p>
        </div>
      </div>

      <div className="press-marquee" data-reveal>
        <div className="press-track">
          {cards(false)}
          {cards(true)}
        </div>
      </div>

      {pressLightbox}
    </section>
  );
}
