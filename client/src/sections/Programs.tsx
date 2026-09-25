import { ArrowUpRight, Check } from "lucide-react";
import { Img } from "@/components/Img";
import { Split } from "@/components/Split";
import { programs } from "@/data/content";

export function Programs() {
  return (
    <section id="programs" className="section programs">
      <div className="container">
        <div className="section-head">
          <span className="badge">Programs</span>
          <Split text="Find your" accent="starting line." />
          <p className="section-sub" data-reveal>
            Every class runs on the same three things — technique, fitness and character. What changes is the pace. Ask us for current batch timings.
          </p>
        </div>

        <div className="program-grid">
          {programs.map((p, i) => (
            <article className="program-card" key={p.id} data-reveal>
              <div className="program-media">
                <Img name={p.image} alt="" sizes="(max-width: 600px) 92vw, (max-width: 1240px) 46vw, 590px" focus={p.focus} />
                <span className="program-num glass">0{i + 1}</span>
              </div>
              <div className="program-body">
                <span className="program-tagline">{p.tagline}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul>
                  {p.points.map((point) => (
                    <li key={point}>
                      <Check size={14} /> {point}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="program-link">
                  Book a trial <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
