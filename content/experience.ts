export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null; // null means current
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  type: "work" | "education" | "certification";
}

export const experiences: Experience[] = [
  {
    id: "bahrain-polytechnic",
    company: "Bahrain Polytechnic",
    role: "ICT Database Systems Graduate",
    startDate: "2021-09",
    endDate: "2026-06",
    location: "Bahrain",
    description: "Graduate from the ICT Database Systems program, equipped with practical skills in database design, web development, and system implementation.",
    achievements: [
      "Built database-driven coursework and web-based projects",
      "Practiced SQL querying, schema design, and documentation",
      "Collaborated on group assignments and presentations",
      "Developed PolyBookShop as a major project demonstrating full-stack capabilities",
      "Applied database normalization and design principles in real projects",
    ],
    technologies: [
      "SQL",
      "Database Design",
      "HTML/CSS/JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Git",
    ],
    type: "education",
  },
  {
    id: "freelance-developer",
    company: "Independent Freelance",
    role: "Freelance Web Developer",
    startDate: "2024-01",
    endDate: null,
    location: "Bahrain",
    description: "Built production-ready web applications for clients and personal brands, handling end-to-end development from design to deployment.",
    achievements: [
      "Built Attention Media's agency site, featuring an auto-scrolling video feed and a custom client portal for video approvals",
      "Developed Basita, a personal agency brand to structure and sell freelance services",
      "Created Haleema.Solutions, a two-sided UGC marketplace linking local Bahraini brands with content creators",
      "Managed databases, integrated forms, and deployed full-stack applications using Supabase and Vercel",
    ],
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
    ],
    type: "work",
  },
];
