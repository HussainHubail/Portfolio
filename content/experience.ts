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
    role: "ICT Database Systems (Senior Year)",
    startDate: "<START_YEAR>-09",
    endDate: null,
    location: "Bahrain",
    description: "Senior year student in ICT Database Systems program, building practical skills in database design, web development, and system implementation.",
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
    id: "student-projects",
    company: "ICT Student Projects",
    role: "Student Developer",
    startDate: "<START_YEAR>-01",
    endDate: null,
    location: "Bahrain",
    description: "Completed various academic and personal projects to build practical development skills.",
    achievements: [
      "Created a Car Blog project demonstrating web development fundamentals",
      "Completed PolyBookShop as a major project with full e-commerce functionality",
      "Worked with databases, APIs, and frontend frameworks",
      "Documented code and created technical presentations",
      "Practiced version control and collaborative development workflows",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "HTML/CSS",
      "Git/GitHub",
    ],
    type: "work",
  },
];
