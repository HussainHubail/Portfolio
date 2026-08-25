export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsByCategory: SkillCategory[] = [
  {
    category: "Databases",
    skills: [
      "SQL",
      "Database Design",
      "Database Normalization",
      "MySQL",
      "MongoDB",
      "Schema Design",
      "Query Optimization",
    ],
  },
  {
    category: "Web Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Responsive Design",
      "Web APIs",
      "Frontend Development",
    ],
  },
  {
    category: "Backend Basics",
    skills: [
      "API Development",
      "Node.js",
      "Express",
      "RESTful APIs",
      "Server-side Development",
    ],
  },
  {
    category: "Tools & Version Control",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Command Line",
      "Version Control",
    ],
  },
  {
    category: "Professional Skills",
    skills: [
      "Problem Solving",
      "Teamwork",
      "Documentation",
      "Technical Writing",
      "Project Planning",
      "Presentation Skills",
    ],
  },
];

export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export const education: Education[] = [
  {
    degree: "BSc in ICT Database Systems",
    institution: "Bahrain Polytechnic",
    year: "2021 - 2026",
    description:
      "Graduate specialized in database systems and ICT. Focused on database design, web development, and practical application of technology.",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  link?: string;
}

export const certifications: Certification[] = [];
