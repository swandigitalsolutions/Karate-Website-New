import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 901px) and (prefers-reduced-motion: no-preference)";

/** Runs GSAP setup scoped to `scope`, reverted on unmount. Use `mm.add(MOTION, ...)` so reduced-motion users get static content. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (mm: gsap.MatchMedia) => void) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    setup(mm);
    return () => mm.revert();
    // Setup is intentionally run once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * Page-wide scroll reveals: `[data-split]` headings rise word by word, `[data-reveal]` blocks fade up in batches.
 * Registered once from App, after sections have created their own (pinning) triggers.
 */
export function useReveals() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((heading) => {
        gsap.from(heading.querySelectorAll(".w > span"), {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.035,
          scrollTrigger: { trigger: heading, start: "top 88%" },
        });
      });

      gsap.set("[data-reveal]", { opacity: 0, y: 48 });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.08, overwrite: true }),
      });
    });
    return () => mm.revert();
  }, []);
}
