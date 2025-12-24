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
    description: "A web-based bookstore application for browsing, searching, and managing book inventory.",
    longDescription: "Poly Book Shop is a comprehensive bookstore web application developed as a major student project. It allows users to browse books, search and filter by various criteria, and includes an admin interface for managing inventory. Built with modern web technologies to demonstrate full-stack development capabilities.",
    role: "Full Stack Developer",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    featured: true,
    links: {
      live: "https://portfolio-tau-murex-63.vercel.app/polybookshop-demo.mp4",
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
    problem: "Students and book retailers need an accessible way to browse, search, and manage book catalogs online without complex systems.",
    solution: "Developed Poly Book Shop as a user-friendly web application with search and filtering capabilities, a shopping cart, and an admin dashboard for inventory management. Focused on clean design and functional implementation.",
    impact: [
      { metric: "Project Status", value: "Completed" },
      { metric: "Tech Skills", value: "Full Stack" },
      { metric: "Database Design", value: "Implemented" },
      { metric: "Student Project", value: "Major" },
    ],
    keyFeatures: [
      "Browse books catalog with detailed information",
      "Search and filter books by title, author, or category",
      "Shopping cart and order flow functionality",
      "Admin dashboard for managing inventory (if implemented)",
      "Responsive design for mobile and desktop",
      "Database-driven architecture",
    ],
    challenges: [
      "Implementing efficient search and filtering across book catalog",
      "Designing a normalized database schema",
      "Managing state across multiple components",
      "Creating an intuitive user interface",
    ],
    learnings: [
      "Full-stack web development workflow",
      "Database design and SQL queries",
      "Frontend-backend integration",
      "Project planning and documentation",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Vercel"],
    videoUrl: "/polybookshop-demo.mp4",
    videoThumbnail: "/polybookshop-thumb.png",
  },
];
