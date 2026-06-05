// ────────────────────────────────────────────────────────────────
// Technology stack, split into primary (day-to-day) and secondary.
// `icon` maps to an inline SVG in components/TechIcon.astro.
// ────────────────────────────────────────────────────────────────
export interface Tech {
  name: string;
  icon:
    | "java"
    | "spring"
    | "maven"
    | "database"
    | "git"
    | "linux"
    | "docker"
    | "android"
    | "kotlin"
    | "csharp"
    | "bash"
    | "kubernetes"
    | "kafka"
    | "aws"
    | "gradle";
}

export const primaryStack: Tech[] = [
  { name: "Java", icon: "java" },
  { name: "Spring / Spring Boot", icon: "spring" },
  { name: "Maven", icon: "maven" },
  { name: "Relational Databases", icon: "database" },
  { name: "Git", icon: "git" },
  { name: "Linux", icon: "linux" },
  { name: "Docker", icon: "docker" },
];

export const secondaryStack: Tech[] = [
  { name: "Android", icon: "android" },
  { name: "Kotlin", icon: "kotlin" },
  { name: "C#", icon: "csharp" },
  { name: "Bash", icon: "bash" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "Kafka", icon: "kafka" },
  { name: "AWS", icon: "aws" },
  { name: "Gradle", icon: "gradle" },
];
