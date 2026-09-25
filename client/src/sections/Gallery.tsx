import { useRef } from "react";
import { Img } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { Split } from "@/components/Split";
import { gallery } from "@/data/content";
import { DESKTOP_MOTION, gsap, useGsap } from "@/lib/motion";

const flat = gallery.flat();
const columnStart = gallery.map((_, c) => gallery.slice(0, c).flat().length);

export function Gallery() {
  const root = useRef<HTMLElement>(null);
  const [open, lightbox] = useLightbox(flat);

  // Columns drift at different speeds for depth.
  useGsap(root, (mm) => {
    mm.add(DESKTOP_MOTION, () => {
      const speeds = [-8, 10, -14];
      gsap.utils.toArray<HTMLElement>(".gallery-col").forEach((col, i) => {
        gsap.fromTo(
          col,
          { yPercent: -speeds[i] / 2 },
          { yPercent: speeds[i] / 2, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });
  });

  return (
    <section className="section gallery" ref={root} aria-labelledby="gallery-title">
      <div className="container">
        <div className="section-head section-head-center">
          <span className="badge">Gallery</span>
          <Split text="Made on" accent="the mat." id="gallery-title" />
        </div>
        <div className="gallery-grid">
          {gallery.map((column, c) => (
            <div className="gallery-col" key={c}>
              {column.map((item, r) => (
                <button className="gallery-item" key={item.image} onClick={() => open(columnStart[c] + r)} aria-label={`View photo: ${item.alt}`}>
                  <Img name={item.image} alt={item.alt} sizes="(max-width: 900px) 46vw, 404px" focus={item.focus} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      {lightbox}
    </section>
  );
}
