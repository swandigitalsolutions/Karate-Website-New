import { Award, Medal, Sparkles } from "lucide-react";
import { useRef } from "react";
import { Img } from "@/components/Img";
import { Split } from "@/components/Split";
import { belts, values } from "@/data/content";
import { MOTION, gsap, useGsap } from "@/lib/motion";

function Ticker() {
  const row = values.map((v) => (
    <span key={v}>
      {v}
      <Sparkles size={16} aria-hidden="true" />
    </span>
  ));
  return (
    <div className="ticker" aria-label={values.join(", ")}>
      <div className="ticker-track" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, (mm) => {
    mm.add(MOTION, () => {
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const counter = { v: 0 };
        gsap.to(counter, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(counter.v))),
        });
      });
      gsap.fromTo(
        ".bento-photo img",
        { scale: 1.15 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ".bento-photo", start: "top bottom", end: "bottom center", scrub: true } },
      );
      gsap.from(".belt-bar span", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: ".belt-bar", start: "top 90%" },
      });
    });
  });

  return (
    <section id="about" className="section about" ref={root}>
      <Ticker />
      <div className="container">
        <div className="section-head">
          <span className="badge">About the institute</span>
          <Split text="More than a martial art." accent="A way of carrying yourself." />
          <p className="section-sub" data-reveal>
            Karate is not about the kick. It is about the thousand quiet decisions before it — to show up, to bow, to try again. We build that habit in every student, from the first white belt to the international podium.
          </p>
        </div>

        <div className="bento">
          <figure className="bento-card bento-photo" data-reveal>
            <Img name="team-flag" alt="Our medal-winning students holding the Indian flag in Malaysia" sizes="(max-width: 900px) 92vw, 612px" />
            <figcaption className="glass">
              <strong>International Karate Championship</strong>
              <span>Malaysia · May 2025</span>
            </figcaption>
          </figure>

          <div className="bento-card bento-accent" data-reveal>
            <Medal size={22} />
            <div>
              <strong className="bento-number">
                <span data-count="6">6</span>
              </strong>
              <p>Medals won by our students at the International Karate Championship in Malaysia.</p>
            </div>
          </div>

          <div className="bento-card bento-dark" data-reveal>
            <Award size={22} />
            <div>
              <strong className="bento-number">2024</strong>
              <p>Shihan title awarded to our chief instructor by the Okinawa Goju-Ryu Karate Federation Malaysia.</p>
            </div>
          </div>

          <div className="bento-card bento-soft bento-wide" data-reveal>
            <p className="bento-quote">“A black belt is a white belt who never quit.”</p>
            <span className="bento-meta">The dojo motto</span>
          </div>

          <div className="bento-card bento-soft" data-reveal>
            <strong className="bento-number">
              <span data-count="7">7</span> belts
            </strong>
            <p>One clear path from white to black.</p>
            <div className="belt-bar" aria-hidden="true">
              {belts.map((b) => (
                <span key={b.name} style={{ background: b.color }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
