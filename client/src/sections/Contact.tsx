import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Split } from "@/components/Split";
import { programs } from "@/data/content";
import { defaultWhatsappMessage, mapEmbedUrl, mapsUrl, site, whatsappLink } from "@/data/site";

export function Cta() {
  return (
    <section className="cta-wrap">
      <div className="container">
        <div className="cta" data-reveal>
          <div className="cta-glow" aria-hidden="true" />
          <span className="badge badge-dark">First class is free</span>
          <Split text="Your first bow" accent="starts here." className="h2 cta-title" />
          <p>Come watch, come try — no gear and no experience needed. We'll help you find the right batch.</p>
          <div className="cta-actions">
            <a href="#contact" className="btn btn-light btn-lg">
              Book a free trial <ArrowUpRight size={18} />
            </a>
            <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer" className="btn btn-outline-light btn-lg">
              <MessageCircle size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // No backend: the enquiry is handed to WhatsApp with everything pre-filled.
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const program = programs.find((p) => p.id === data.get("program"))?.title ?? "Not sure yet";
    const note = String(data.get("message") ?? "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10) {
      setError("Please add your name and a 10-digit phone number.");
      return;
    }
    setError("");
    const message = [`Hi! I'd like to book a free trial class.`, `Name: ${name}`, `Phone: ${phone}`, `Program: ${program}`, note && `Message: ${note}`].filter(Boolean).join("\n");
    window.open(whatsappLink(message), "_blank", "noopener");
    setSent(true);
  };

  const details = [
    { icon: Phone, label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: "Dojo", value: site.address, href: mapsUrl },
    { icon: Clock, label: "Classes", value: site.hours },
  ];

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-head">
          <span className="badge">Contact</span>
          <Split text="Come say" accent="osu." />
        </div>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={submit} noValidate data-reveal>
            <div className="form-title">
              <h3>Book a free trial</h3>
              <p>We'll confirm your class on WhatsApp.</p>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Your name</span>
                <input name="name" autoComplete="name" placeholder="Full name" required />
              </label>
              <label className="field">
                <span>Phone</span>
                <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit mobile" required />
              </label>
            </div>
            <label className="field">
              <span>Program</span>
              <select name="program" defaultValue="">
                <option value="">Not sure yet</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Message (optional)</span>
              <textarea name="message" rows={3} placeholder="Age of the student, preferred timing…" />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {sent && !error && (
              <p className="form-ok" role="status">
                WhatsApp opened with your details — just press send.
              </p>
            )}
            <button type="submit" className="btn btn-accent btn-lg form-submit">
              Send on WhatsApp <Send size={17} />
            </button>
          </form>

          <div className="contact-side">
            <div className="contact-cards">
              {details.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="contact-icon">
                      <Icon size={18} />
                    </span>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </>
                );
                return href ? (
                  <a className="contact-card" href={href} key={label} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-reveal>
                    {inner}
                  </a>
                ) : (
                  <div className="contact-card" key={label} data-reveal>
                    {inner}
                  </div>
                );
              })}
            </div>
            <div className="map" data-reveal>
              <iframe title="Map showing Devanahalli, Karnataka" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="btn btn-light btn-sm map-link">
                Open in Maps <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
