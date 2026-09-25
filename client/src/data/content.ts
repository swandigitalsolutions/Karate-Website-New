import type { ImageName } from "./images";

export const navItems = [
  { label: "Institute", href: "#about" },
  { label: "Master", href: "#master" },
  { label: "Champions", href: "#champions" },
  { label: "Programs", href: "#programs" },
  { label: "Press", href: "#press" },
  { label: "Contact", href: "#contact" },
];

export const values = ["Discipline", "Respect", "Focus", "Confidence", "Courage", "Patience"];

export const manifesto =
  "Karate is not about the kick. It is about the thousand quiet decisions before it — to show up, to bow, to try again. At Discipline Karate Institute we build that habit in every student, from their very first white belt to the international podium.";

export const stats = [
  { value: 6, from: 0, label: "Medals won by our students at the International Karate Championship, Malaysia 2025" },
  { value: 7, from: 0, label: "Belts on the path from white to black — each one a promise kept" },
  { value: 2024, from: 1990, label: "Shihan title awarded by the Okinawa Goju-Ryu Karate Federation Malaysia" },
];

export const milestones = [
  { year: "2024", title: "Shihan Award", detail: "Okinawa Goju-Ryu Karate Federation Malaysia · awarded 16 June 2024" },
  { year: "2025", title: "International Karate Championship", detail: "Led the institute's students to Malaysia — six medals for Devanahalli" },
  { year: "Record", title: "Global World Record", detail: "Certificate awarding ceremony · official partner WSS Sports Academy" },
  { year: "Press", title: "Honoured as “Karate Murali”", detail: "Recognised by government residential schools and the Kannada press" },
];

export const medallists: { image: ImageName; alt: string }[] = [
  { image: "medal-1", alt: "Medallist holding his gold medal with the coach" },
  { image: "medal-2", alt: "Medallist showing her medals alongside the coach" },
  { image: "medal-5", alt: "Young medallist with the coach on the dojo mat" },
  { image: "medal-4", alt: "Medallist with the Indian flag under the association banner" },
  { image: "medal-8", alt: "Young medallist biting his gold medal" },
  { image: "medal-9", alt: "Medallist with the coach beneath the flags" },
];

export type Program = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  image: ImageName;
  /** Focal point used when the photo is cropped to the card. */
  focus: string;
};

export const programs: Program[] = [
  {
    id: "kids",
    title: "Kids Karate",
    tagline: "Little feet, big focus",
    description:
      "Fun, structured classes that build coordination, listening and respect — habits that follow children back into school and home.",
    points: ["Coordination & balance", "Respect & routine", "Confidence to speak up"],
    image: "medal-7",
    focus: "50% 38%",
  },
  {
    id: "teens",
    title: "Teens Karate",
    tagline: "Energy, meet direction",
    description:
      "Athletic training that turns restless energy into strength, composure and the grit to keep going when things get hard.",
    points: ["Strength & conditioning", "Self-defence fundamentals", "Belt grading pathway"],
    image: "medal-6",
    focus: "50% 28%",
  },
  {
    id: "adults",
    title: "Adult Karate",
    tagline: "Fitness with a purpose",
    description:
      "Never trained before? Perfect. Every session balances technique, conditioning and the kind of calm that carries into work and life.",
    points: ["Beginner friendly", "Mobility & power", "Stress that stays on the mat"],
    image: "stance",
    focus: "50% 4%",
  },
  {
    id: "competition",
    title: "Competition Team",
    tagline: "Train for the podium",
    description:
      "Focused kata and kumite preparation for students chasing medals — the same path our Malaysia 2025 medallists walked.",
    points: ["Kata & kumite", "Tournament preparation", "By selection"],
    image: "championship-poster",
    focus: "50% 18%",
  },
];

export const belts = [
  { name: "White", color: "#f1ede6", note: "Begin" },
  { name: "Yellow", color: "#e0b624", note: "Awaken" },
  { name: "Orange", color: "#e0752b", note: "Build" },
  { name: "Green", color: "#3f8a4f", note: "Grow" },
  { name: "Blue", color: "#2f63b5", note: "Refine" },
  { name: "Brown", color: "#7a4f32", note: "Lead" },
  { name: "Black", color: "#0b0b0b", note: "Master" },
];

export type PressItem = {
  image: ImageName;
  outlet: string;
  date?: string;
  kannada: string;
  english: string;
};

export const press: PressItem[] = [
  {
    image: "press-malaysia",
    outlet: "Kannada daily",
    date: "20 May 2025",
    kannada: "ಮಲೇಷಿಯಾದಲ್ಲಿ ನಡೆದ ಕರಾಟೆ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ದೇವನಹಳ್ಳಿಗೆ 6 ಚಿನ್ನ",
    english: "Six golds for Devanahalli at the karate championship in Malaysia",
  },
  {
    image: "press-udayavani",
    outlet: "Udayavani",
    date: "21 May 2025",
    kannada: "ಮುಕ್ತ ಕರಾಟೆ ಚಾಂಪಿಯನ್‌ಶಿಪ್: ದೇವನಹಳ್ಳಿಗೆ 6 ಚಿನ್ನ",
    english: "Open karate championship: six golds for Devanahalli",
  },
  {
    image: "press-international",
    outlet: "Kannada daily",
    kannada: "ಅಂತಾರಾಷ್ಟ್ರೀಯ ಕರಾಟೆ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ದೇವನಹಳ್ಳಿ ಮಕ್ಕಳು ಉತ್ತಮ ಸಾಧನೆ",
    english: "Devanahalli children shine at an international karate competition",
  },
  {
    image: "press-vijaya",
    outlet: "Vijaya Karnataka",
    kannada: "ಕರಾಟೆಯಲ್ಲಿ ಚಿನ್ನ ಬೆಳ್ಳಿ ಪದಕ",
    english: "Gold and silver medals in karate",
  },
  {
    image: "press-honour",
    outlet: "Regional press",
    kannada: "ಕರಾಟೆ ಮುರಳಿಗೆ ಸರಕಾರದ ವಸತಿ ಶಾಲೆಗಳಿಂದ ಗೌರವ",
    english: "Government residential schools honour “Karate Murali”",
  },
  {
    image: "press-selected",
    outlet: "Kannada daily",
    kannada: "ಕರಾಟೆ ಚಾಂಪಿಯನ್‌ಶಿಪ್‌ಗೆ 6 ಜನ ಆಯ್ಕೆ",
    english: "Six students selected for the karate championship",
  },
];


// One photo per scene: every image on the site appears exactly once.
export const gallery: { image: ImageName; alt: string; focus?: string }[][] = [
  [
    { image: "kick-side", alt: "High side kick during outdoor training" },
    { image: "world-record", alt: "Global World Record certificate awarding ceremony" },
  ],
  [
    { image: "sensei-visit", alt: "Training alongside a visiting international instructor" },
    { image: "honour-3", alt: "Felicitated for the institute's achievements" },
  ],
  [
    { image: "master-dojo", alt: "In the Traditional Shitokai Karate Do dojo, Malaysia" },
    { image: "community", alt: "With officers of the local police" },
  ],
];

export const faqs = [
  {
    q: "Do I need any experience to join?",
    a: "Not at all. Most of our students started as complete beginners. Classes are grouped by age and level, and every technique is taught step by step.",
  },
  {
    q: "Is the first class really free?",
    a: "Yes. Book a trial, come in comfortable clothes and see whether the dojo feels right before you commit to anything.",
  },
  {
    q: "Which age groups do you teach?",
    a: "We run programs for kids, teens and adults, plus a competition team for students preparing for tournaments. Tell us the age and we'll suggest the right batch.",
  },
  {
    q: "Do students take part in competitions?",
    a: "Those who want to, yes. In 2025 our students won six medals at the International Karate Championship in Malaysia.",
  },
  {
    q: "Where is the dojo?",
    a: "In Devanahalli, Bengaluru Rural. Use the map in the contact section for directions, or message us on WhatsApp.",
  },
];
