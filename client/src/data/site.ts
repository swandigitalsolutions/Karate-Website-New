// Replace the social links with the institute's real profiles before launch.
export const site = {
  name: "Discipline Karate Institute",
  shortName: "DKI",
  master: "Shihan Dr. N. Murali",
  phone: "+91 99019 14357",
  whatsapp: "919901914357",
  email: "muralin404@gmail.com",
  address: "Devanahalli, Bengaluru Rural, Karnataka",
  hours: "Mon – Sat · Morning & evening batches",
  mapQuery: "Devanahalli, Karnataka",
  socials: {
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=13&output=embed`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage = "Hi! I'd like to know more about karate classes and book a free trial.";
