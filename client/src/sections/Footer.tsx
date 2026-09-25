import { ArrowUp, Instagram, MessageCircle, Phone, Youtube } from "lucide-react";
import { Logo } from "@/components/Nav";
import { navItems } from "@/data/content";
import { defaultWhatsappMessage, site, whatsappLink } from "@/data/site";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo />
            <p>Traditional karate for kids, teens and adults in Devanahalli, led by {site.master}.</p>
          </div>
          <nav aria-label="Footer">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer-social">
            <a href={site.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={site.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
              <Youtube size={18} />
            </a>
            <a href="#top" aria-label="Back to top">
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
        <p className="footer-word" aria-hidden="true">
          Discipline
        </p>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Devanahalli · Karnataka</span>
        </div>
      </div>
    </footer>
  );
}

/** Floating quick-contact buttons, always within thumb reach: call above, WhatsApp below. */
export function FloatingActions() {
  return (
    <div className="fab-stack">
      <a className="fab fab-call" href={`tel:${site.phone.replace(/\s/g, "")}`} aria-label={`Call us at ${site.phone}`} data-label="Call us">
        <Phone size={22} />
      </a>
      <a className="fab fab-wa" href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer" aria-label="Chat with us on WhatsApp" data-label="WhatsApp">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
