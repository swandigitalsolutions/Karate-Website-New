import { Plus } from "lucide-react";
import { useState } from "react";
import { Split } from "@/components/Split";
import { faqs } from "@/data/content";

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-head">
          <span className="badge">FAQ</span>
          <Split text="Questions," accent="answered." id="faq-title" />
          <p className="section-sub" data-reveal>
            Still unsure? Message us on WhatsApp — we usually reply the same day.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q} data-reveal>
                <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}>
                  {item.q}
                  <span className="faq-icon">
                    <Plus size={18} />
                  </span>
                </button>
                <div className="faq-answer" id={`faq-${i}`}>
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
