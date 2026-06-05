// ────────────────────────────────────────────────────────────────
// Work experience. Add / remove entries freely.
//   `icon` is the name of a built-in SVG glyph (see components/Icon.astro):
//   one of: "cube" | "chain" | "shield" | "layers" | "terminal" | "spark".
// ────────────────────────────────────────────────────────────────
export interface Experience {
  icon: "cube" | "chain" | "shield" | "layers" | "terminal" | "spark";
  company: string;
  position: string;
  from: string; // e.g. "2022"
  to: string; // e.g. "Present"
  bullets: string[];
  // Company website. Set to null for companies without a landing page.
  link: string | null;
}

export const experiences: Experience[] = [
  {
    icon: "chain",
    company: "Teranode Group",
    position: "Software Architect / Technical Lead",
    from: "May 2025",
    to: "Present",
    bullets: [
      "Leading the architecture for blockchain-based systems.",
      "Developing Teranode Sign, a secure document-signing platform.",
      "Driving scalability, security, and performance across the platform.",
    ],
    link: "https://teranode.group",
  },
  {
    icon: "spark",
    company: "Equaleyes Solutions Ltd",
    position: "Team Lead / Senior Software Engineer",
    from: "Sep 2024",
    to: "Present",
    bullets: [
      "Leading 10+ engineers, optimizing delivery and team productivity.",
      "Mentoring developers and supporting their career growth.",
      "Ensuring cross-team collaboration and execution.",
    ],
    link: "https://equaleyes.com/",
  },
  {
    icon: "cube",
    company: "nChain",
    position: "Team Lead / Senior Software Engineer",
    from: "Oct 2021",
    to: "Aug 2024",
    bullets: [
      "Progressed from Engineer to Team Lead, managing 10+ developers.",
      "Delivered blockchain solutions including document signing and data platforms.",
      "Contributed to scalable blockchain infrastructure (Teranode PoC).",
    ],
    link: "https://nchain.com/",
  },
  {
    icon: "terminal",
    company: "Inova IT",
    position: "Software Developer",
    from: "Oct 2018",
    to: "Aug 2020",
    bullets: [
      "Built enterprise systems: an EV charging API, tax systems, a loan platform, and healthcare solutions.",
      "Focused on backend development and system integrations.",
    ],
    link: "https://www.inova.si/",
  },
  {
    icon: "shield",
    company: "Teletech d.o.o.",
    position: "Software Developer",
    from: "Feb 2016",
    to: "Aug 2018",
    bullets: [
      "Worked on telecom systems, number portability, and secure archiving.",
    ],
    link: null,
  },
];
