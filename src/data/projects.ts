// ────────────────────────────────────────────────────────────────
// Projects. Drop product screenshots into /public/projects/ and point
// `image` at them. Set `link` to null if a project has no landing page.
// ────────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  image: string; // path under /public
  link: string | null; // landing page URL, or null
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Teranode Sign",
    description:
      "A document authentication service that replaces wet signatures and email-based workflows with cryptographically signed, blockchain-anchored documents — tamper-evident and verifiable by anyone, anywhere, without a third party.",
    image: "/projects/teranode-sign.png",
    link: "https://teranode.group/sign",
    tags: ["Blockchain", "Document Authentication", "Cryptography", "Verification"],
  },
  {
    title: "Teranode",
    description:
      "A modular, microservices-based node architecture for the BSV blockchain, engineered for unbounded scalability — processing over one million transactions per second to support enterprise-grade applications across finance, healthcare, retail, and government.",
    image: "/projects/teranode-poc.png",
    link: "https://bsvassociation.org/protocol/teranode/",
    tags: ["PoC", "Blockchain (BSV)", "Microservices", "1M+ TPS", "Scalability"],
  },
  {
    title: "eLivestock",
    description:
      "A digital livestock management platform for animal identification, record-keeping and traceability, using blockchain to guarantee tamper-proof records and an auditable chain of custody. It lets livestock owners register identification marks, manage herds, and access market pricing in line with agricultural legislation. I was the solution architect, developed during my work at nChain.",
    image: "/projects/elivestock.jpg",
    link: "https://www.elivestock.co.za/",
    tags: ["Solution Architecture", "Blockchain", "Traceability", "Web & Mobile"],
  },
  {
    title: "Autistica",
    description:
      "The Android mobile app for Autistica, the UK's autism research charity, building evidence-based tools — created with and for the autistic community — to help autistic people live happier, healthier and longer lives.",
    image: "/projects/autistica.svg",
    link: "https://www.autistica.org.uk/",
    tags: ["Android", "Kotlin", "Mobile", "Accessibility"],
  },
  {
    title: "miRadio",
    description:
      "Backend system for a voice-activated, on-demand radio application on Google Assistant and Amazon Alexa, built at Inova IT. Radio stations could publish their content and configure the behaviour of the voice experience, delivering on-demand stations and programming to listeners entirely by voice.",
    image: "/projects/miradio.svg",
    link: null,
    tags: ["Java", "Spring Boot", "Amazon Alexa", "Google Assistant", "Voice UI"],
  },
  {
    title: "Number Portability System",
    description:
      "Mobile and fixed-line telephone number portability system delivered at Teletech for the Eastern Caribbean Telecommunications Authority (ECTEL) and Ukraine, letting subscribers keep their numbers when changing operators by coordinating porting and number routing between carriers.",
    image: "/projects/number-portability.svg",
    link: null,
    tags: ["Java EE", "Telecom", "Number Portability", "Integrations"],
  },
  {
    title: "E-Archive",
    description:
      "Long-term electronic archive service for the Serbian Post Office, built at Teletech and based on the RFC 4810 Long-Term Archive Service. Provided secure, verifiable preservation of electronic documents across extended retention periods, maintaining their integrity and evidentiary value over time.",
    image: "/projects/e-archive.svg",
    link: null,
    tags: ["Java EE", "Long-Term Archiving", "RFC 4810", "Document Integrity"],
  },
];
