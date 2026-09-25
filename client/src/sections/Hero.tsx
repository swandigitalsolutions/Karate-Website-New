import { ArrowRight, ArrowUpRight, Trophy } from "lucide-react";
import { useRef } from "react";
import { Img, imageSrc } from "@/components/Img";
import { words } from "@/components/Split";
import { site } from "@/data/site";
import { MOTION, gsap, useGsap } from "@/lib/motion";

const medalFaces = ["avatar-1", "avatar-2", "avatar-3"] as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (mm) => {
    mm.add(MOTION, () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
      tl.from(".hero .badge", { y: 16, opacity: 0, duration: 0.9 })
        .from(".hero-title .w > span", { yPercent: 110, duration: 1.2, stagger: 0.045 }, 0.05)
        .from(".hero-lead, .hero-actions, .hero-stats", { y: 28, opacity: 0, filter: "blur(8px)", duration: 1.1, stagger: 0.08 }, 0.35)
        .from(".hero-card", { clipPath: "inset(12% 12% 12% 12% round 40px)", scale: 0.94, duration: 1.6 }, 0.1)
        .from(".hero-card img", { scale: 1.3, duration: 2 }, 0.1)
        .from(".hero-chip", { y: 30, opacity: 0, scale: 0.9, duration: 1, stagger: 0.12 }, 0.8);
      gsap.to(".hero-chip-a", { y: -8, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      gsap.to(".hero-chip-b", { y: 8, duration: 3.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });
      gsap.to(".hero-card img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
  });

  return (
    <section id="top" className="hero" ref={root}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="badge">
            <span className="badge-dot" /> Admissions open · Devanahalli
          </span>
          <h1 className="hero-title" aria-label="Train with focus. Grow with discipline.">
            <span aria-hidden="true">
              {words("Train with focus.")}
              <br />
              {words("Grow with")}
              <span className="w">
                <span className="gradient-text">discipline.</span>
              </span>
            </span>
          </h1>
          <p className="hero-lead">
            Traditional karate for kids, teens and adults — led by {site.master}. Real technique, real fitness and the confidence that comes from earning every belt.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-dark btn-lg">
              Book a free trial <ArrowUpRight size={18} />
            </a>
            <a href="#champions" className="btn btn-ghost btn-lg">
              <span className="btn-icon">
                <Trophy size={15} />
              </span>
              Meet our champions
            </a>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>6</dt>
              <dd>International medals</dd>
            </div>
            <div>
              <dt>2024</dt>
              <dd>Shihan award</dd>
            </div>
            <div>
              <dt>4</dt>
              <dd>Programs</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual">
          <figure className="hero-card">
            <Img name="hero-kick" alt="Black belt throwing a vertical high kick outdoors" sizes="(max-width: 900px) min(92vw, 560px), 540px" priority />
          </figure>

          <div className="hero-chip hero-chip-a glass">
            <div className="avatars">
              {medalFaces.map((name) => (
                <img key={name} src={imageSrc(name, 160)} alt="" width={36} height={36} />
              ))}
            </div>
            <div>
              <strong>6 medals won</strong>
              <span>Malaysia 2025</span>
            </div>
          </div>

          <a href="#master" className="hero-chip hero-chip-b glass">
            <img src={imageSrc("master-portrait", 160)} alt="" width={44} height={44} className="chip-avatar" />
            <div>
              <strong>{site.master}</strong>
              <span>Chief instructor</span>
            </div>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
