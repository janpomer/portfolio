// ────────────────────────────────────────────────────────────────
// Education. Add / remove entries freely.
// `link` is the school/university website — set to null if there's none.
// (Example content — replace with your real details.)
// ────────────────────────────────────────────────────────────────
export interface Education {
  degree: string;
  university: string;
  from: string; // e.g. "2016"
  to: string; // e.g. "2018"
  link: string | null;
}

export const education: Education[] = [
  {
    degree: "Master’s Degree in Computer Science and Information Technologies",
    university: "University of Maribor",
    from: "2016",
    to: "2020",
    link: "https://www.um.si/en/home-page/",
  },
  {
    degree: "Bachelor's Degree in Computer Science and Information Technologies",
    university: "University of Maribor",
    from: "2013",
    to: "2016",
    link: "https://www.um.si/en/home-page/",
  },
  {
    degree: "Computer technician",
    university: "SERŠ Maribor",
    from: "2009",
    to: "2013",
    link: "https://www.sers.si/",
  },
];
