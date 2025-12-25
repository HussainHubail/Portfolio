export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  year: string;
  tags: string[];
  featured: boolean;
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  images: {
    hero: string;
    gallery: string[];
  };
  problem: string;
  solution: string;
  impact: {
    metric: string;
    value: string;
  }[];
  keyFeatures: string[];
  challenges: string[];
  learnings: string[];
  techStack: string[];
  videoUrl?: string;
  videoThumbnail?: string;
}

export const projects: Project[] = [
  {
    slug: "polybookshop",
    title: "Poly Book Shop",
    description: "A library management system for Bahrain Polytechnic University to loan physical books and download online books.",
    longDescription: "Poly Book Shop is a comprehensive library management system developed for Bahrain Polytechnic University. It enables students to loan physical books, download online PDF books, and browse the library catalog. The system includes a librarian role with administrative capabilities to manage the book inventory, add new PDF books, and oversee lending operations. Built with modern web technologies to demonstrate full-stack development capabilities.",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    featured: true,
    links: {
      live: "/polybookshop-demo.mp4",
      github: "https://github.com/HussainHubail",
    },
    images: {
      hero: "https://images.unsplash.com/photo-1507842217343-583b8c9b4f6b?w=1200&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1507842217343-583b8c9b4f6b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1521227884298-7f08f910feac?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
      ],
    },
    problem: "Bahrain Polytechnic University library needed a modern digital system to manage physical book loans, provide access to online PDF books, and streamline library operations.",
    solution: "Developed Poly Book Shop as a comprehensive library management system with student and librarian roles. Students can loan physical books and download online PDFs, while librarians can manage the entire book catalog, add new PDF books, and oversee lending operations. Focused on user-friendly design and efficient library workflows.",
    impact: [
      { metric: "Project Status", value: "Completed" },
      { metric: "Tech Skills", value: "Full Stack" },
      { metric: "Database Design", value: "Implemented" },
      { metric: "User Roles", value: "Multi-role" },
    ],
    keyFeatures: [
      "Browse library catalog with detailed book information",
      "Loan physical books with tracking system",
      "Download online PDF books",
      "Search and filter books by title, author, or category",
      "Librarian dashboard to manage book inventory",
      "Add and manage PDF books through librarian interface",
      "Role-based access control (students and librarians)",
      "Responsive design for mobile and desktop",
      "Database-driven architecture",
    ],
    challenges: [
      "Implementing role-based access control for students and librarians",
      "Managing both physical book loans and digital PDF downloads",
      "Designing efficient database schema for library operations",
      "Creating separate interfaces for different user roles",
      "Handling PDF file uploads and storage",
    ],
    learnings: [
      "Full-stack web development workflow",
      "Role-based authentication and authorization",
      "File upload and storage management",
      "Database design and SQL queries",
      "Frontend-backend integration",
      "Project planning and documentation",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Vercel"],
    videoUrl: "/polybookshop-demo.mp4",
    videoThumbnail: "/polybookshop-thumb.png",
  },
  {
    slug: "russian-training",
    title: "Russian Training Web App",
    description: "A playful Russian learning app with daily tasks, a dictionary, and a translator.",
    longDescription: "A lightweight web app focused on helping users practice Russian through fun daily tasks, with a built-in dictionary and a simple translator. Designed to be approachable and engaging with straightforward UI.",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: false,
    links: {
      live: "https://russian-virid.vercel.app/",
      github: "https://github.com/HussainHubail",
    },
    images: {
      hero: "/Russian/Screenshot%202025-12-25%20171431.png",
      gallery: [],
    },
    problem: "Learners need a simple and enjoyable way to practice everyday Russian without overwhelming interfaces.",
    solution: "Built a web app with playful daily tasks, an integrated dictionary, and a translator to make casual practice easy.",
    impact: [
      { metric: "Focus", value: "Daily Practice" },
      { metric: "Features", value: "Dictionary & Translator" },
    ],
    keyFeatures: [
      "Fun daily tasks for practice",
      "Built-in Russian dictionary",
      "Lightweight translator",
      "Clean, approachable UI",
      "Responsive design",
    ],
    challenges: [
      "Balancing simplicity with useful features",
      "Keeping UI playful without distractions",
    ],
    learnings: [
      "Designing engaging micro-interactions",
      "Delivering utility with minimal UI",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    videoUrl: undefined,
    videoThumbnail: "/Russian/Screenshot%202025-12-25%20171431.png",
  },
];
