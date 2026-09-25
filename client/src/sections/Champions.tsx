import { ArrowUpRight, Expand } from "lucide-react";
import { useRef } from "react";
import { Img } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { Split } from "@/components/Split";
import { medallists } from "@/data/content";
import { DESKTOP_MOTION, gsap, useGsap } from "@/lib/motion";

const items = medallists.map((m) => ({ ...m, caption: `${m.alt} — International Karate Championship, Malaysia 2025` }));

export function Champions() {
  const root = useRef<HTMLElement>(null);
  const [open, lightbox] = useLightbox(items);

  // Desktop: pin the section and slide the track sideways as the page scrolls.
  useGsap(root, (mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const track = root.current!.querySelector<HTMLElement>(".champions-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const scrub = { trigger: ".champions-pin", start: "top top", end: () => `+=${distance()}`, invalidateOnRefresh: true };
      const tween = gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { ...scrub, pin: true, scrub: 0.8 } });
      gsap.utils.toArray<HTMLElement>(".medal-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          { xPercent: 7, ease: "none", scrollTrigger: { trigger: img.closest(".medal-card"), containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
        );
      });
      gsap.to(".champions-progress span", { scaleX: 1, ease: "none", scrollTrigger: { ...scrub, scrub: true } });
    });
  });

  return (
    <section id="champions" className="champions" ref={root}>
      <div className="champions-pin">
        <div className="champions-track">
          <div className="champions-head">
            <span className="badge badge-dark">International Karate Championship · 2025</span>
            <Split text="Six medals." accent="One flag." />
            <p>
              In May 2025 our students travelled to Malaysia for the International Karate Championship, organised by Shinsei Kai Shito Ryu Karate Do — and came home with six medals.
            </p>
            <span className="champions-hint">
              <span className="desktop-only">Scroll to meet them</span>
              <span className="mobile-only">Swipe to meet them</span> →
            </span>
          </div>

          {items.map((item, i) => (
            <button className="medal-card" key={item.image} onClick={() => open(i)} aria-label={`View photo: ${item.alt}`}>
              <Img name={item.image} alt={item.alt} sizes="(max-width: 900px) 72vw, 410px" />
              <span className="medal-meta glass-dark">
                <span>Medallist {String(i + 1).padStart(2, "0")}</span>
                <Expand size={15} />
              </span>
            </button>
          ))}

          <div className="champions-end">
            <p>The next medallist might already be in your family.</p>
            <a href="#contact" className="btn btn-accent btn-lg">
              Start their journey <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="champions-progress" aria-hidden="true">
          <span />
        </div>
      </div>
      {lightbox}
    </section>
  );
}
