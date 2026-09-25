import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ImageName } from "@/data/images";
import { useScrollLock } from "@/lib/smoothScroll";
import { imageSrc } from "./Img";

export type LightboxItem = { image: ImageName; alt: string; caption?: string };

export function useLightbox(items: LightboxItem[]) {
  const [index, setIndex] = useState<number | null>(null);
  const element = <Lightbox items={items} index={index} onChange={setIndex} />;
  return [setIndex, element] as const;
}

function Lightbox({ items, index, onChange }: { items: LightboxItem[]; index: number | null; onChange: (i: number | null) => void }) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onChange(null);
      if (event.key === "ArrowRight") onChange(((index ?? 0) + 1) % items.length);
      if (event.key === "ArrowLeft") onChange(((index ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [open, index, items.length, onChange]);

  if (!open) return null;
  const item = items[index];
  const step = (delta: number) => onChange((index + delta + items.length) % items.length);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={() => onChange(null)} data-lenis-prevent>
      <div className="lightbox-bar">
        <span>
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button ref={closeRef} className="icon-button" onClick={() => onChange(null)} aria-label="Close">
          <X size={20} />
        </button>
      </div>
      <img key={item.image} className="lightbox-image" src={imageSrc(item.image, 1600)} alt={item.alt} onClick={(e) => e.stopPropagation()} />
      <div className="lightbox-foot" onClick={(e) => e.stopPropagation()}>
        <p>{item.caption ?? item.alt}</p>
        {items.length > 1 && (
          <div className="lightbox-nav">
            <button className="icon-button" onClick={() => step(-1)} aria-label="Previous image">
              <ArrowLeft size={18} />
            </button>
            <button className="icon-button" onClick={() => step(1)} aria-label="Next image">
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
