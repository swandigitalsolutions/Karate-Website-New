import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./motion";

// Single Lenis instance shared by overlays (menu, lightbox, intro) so they can pause page scrolling.
let lenis: Lenis | null = null;
let lockCount = 0;

const NAV_OFFSET = -72;

export function useSmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const instance = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis = instance;
    if (lockCount > 0) instance.stop();
    instance.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Same-page anchors scroll smoothly and land below the fixed nav.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href")!;
      if (hash.length > 1 && scrollToHash(hash)) event.preventDefault();
    };
    document.addEventListener("click", onClick);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      instance.destroy();
      lenis = null;
    };
  }, []);
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.documentElement.classList.add("is-locked");
    lenis?.stop();
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount > 0) return;
      document.documentElement.classList.remove("is-locked");
      lenis?.start();
    };
  }, [active]);
}

export function scrollToHash(hash: string) {
  const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
  if (target === null) return false;
  if (lenis) {
    // force: anchors inside overlays fire while scrolling is still paused; the overlay closes on the same click.
    lenis.scrollTo(target, { offset: target === 0 ? 0 : NAV_OFFSET, force: true });
  } else if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
  history.replaceState(null, "", hash);
  return true;
}
