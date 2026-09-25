import { Award, BadgeCheck, Globe, Newspaper, ZoomIn } from "lucide-react";
import { useRef } from "react";
import { Img } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { Split } from "@/components/Split";
import { milestones } from "@/data/content";
import { site } from "@/data/site";
import { MOTION, gsap, useGsap } from "@/lib/motion";

const certificate = [{ image: "shihan-certificate" as const, alt: "Shihan Award certificate", caption: "Shihan Award — Okinawa Goju-Ryu Karate Federation Malaysia, 16 June 2024" }];
const icons = [Award, Globe, BadgeCheck, Newspaper];

export function Master() {
  const root = useRef<HTMLElement>(null);
  const [openCertificate, lightbox] = useLightbox(certificate);

  useGsap(root, (mm) => {
    mm.add(MOTION, () => {
      gsap.from(".master-photo", {
        clipPath: "inset(10% 10% 10% 10% round 32px)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".master-photo", start: "top 80%" },
      });
      gsap.from(".master-photo img", { scale: 1.25, duration: 2, ease: "expo.out", scrollTrigger: { trigger: ".master-photo", start: "top 80%" } });
    });
  });

  return (
    <section id="master" className="section master" ref={root}>
      <div className="container master-grid">
        <div className="master-media">
          <figure className="master-photo">
            <Img name="master-portrait" alt={`Portrait of ${site.master}`} sizes="(max-width: 900px) min(92vw, 520px), 553px" />
          </figure>
          <div className="master-name glass">
            <strong>{site.master}</strong>
            <span>Founder & chief instructor</span>
          </div>
        </div>

        <div className="master-copy">
          <span className="badge">Meet the master</span>
          {/* Non-breaking spaces keep the name on one line. */}
          <Split text="Shihan" accent={"Dr.\u00a0N.\u00a0Murali"} />
          <p className="lead" data-reveal>
            For Shihan Dr. N. Murali, karate has always been more than a sport. It is a daily practice of respect, patience and hard work — and the reason Discipline Karate Institute exists.
          </p>
          <p data-reveal>
            Known across Devanahalli simply as “Karate Murali”, he has guided students from their very first bow to the international podium. In 2024 he was awarded the title of Shihan by the Okinawa Goju-Ryu Karate Federation Malaysia, and in 2025 he led
            the institute's students to six medals at the International Karate Championship in Malaysia.
          </p>

          <ul className="milestones">
            {milestones.map((m, i) => {
              const Icon = icons[i % icons.length];
              return (
                <li key={m.title} data-reveal>
                  <span className="milestone-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <strong>{m.title}</strong>
                    <p>{m.detail}</p>
                  </div>
                  <span className="milestone-year">{m.year}</span>
                </li>
              );
            })}
          </ul>

          <button className="certificate" onClick={() => openCertificate(0)} aria-label="View the Shihan Award certificate" data-reveal>
            <Img name="shihan-certificate" alt="" sizes="(max-width: 900px) 92vw, 600px" />
            <span className="certificate-tag glass">
              <ZoomIn size={15} /> View certificate
            </span>
          </button>
        </div>
      </div>
      {lightbox}
    </section>
  );
}
