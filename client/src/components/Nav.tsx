import { ArrowUpRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { navItems } from "@/data/content";
import { ScrollTrigger } from "@/lib/motion";

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Discipline Karate Institute — back to top">
      <span className="logo-mark">DK</span>
      <span className="logo-text">Discipline Karate</span>
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Hide on scroll down, reveal on scroll up; class toggles keep scrolling free of React re-renders.
  useLayoutEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const el = bar.current;
        if (!el) return;
        const y = self.scroll();
        el.classList.toggle("is-scrolled", y > 24);
        el.classList.toggle("is-hidden", self.direction === 1 && y > 400);
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onScroll = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  return (
    <div className="nav-wrap" ref={bar}>
      <header className={`nav ${open ? "is-open" : ""}`}>
        <div className="nav-bar">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn btn-dark btn-sm nav-cta">
            Free trial <ArrowUpRight size={15} />
          </a>
          <button className="burger" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <span />
            <span />
          </button>
        </div>
        <nav className="nav-menu" aria-label="Mobile" aria-hidden={!open}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {item.label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <a href="#contact" className="btn btn-accent" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Book a free trial <ArrowUpRight size={16} />
          </a>
        </nav>
      </header>
    </div>
  );
}
