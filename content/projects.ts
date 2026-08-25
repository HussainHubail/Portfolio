export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  role: string;
  year: string;
  tags: string[];
  featured: boolean;
  status?: string;
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
      hero: "/polybookshop-thumb.png",
      gallery: [],
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
    description: "A language learning app I built for myself while studying Russian. Features daily tasks, a built-in dictionary, and a live translator. Built because I wanted a tool tailored to how I actually learn.",
    longDescription: "A lightweight web app focused on helping users practice Russian through fun daily tasks, with a built-in dictionary and a simple translator. Designed to be approachable and engaging with straightforward UI.",
    role: "Full Stack Developer",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    featured: true,
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
  {
    slug: "relentic",
    title: "Relentic",
    description: "A comprehensive fitness web app with personalized workouts, Halal meal planning, and AI coaching. Includes Halal-certified meal planning — built specifically with Muslim users in mind.",
    longDescription: "Relentic is a full-stack fitness platform designed to deliver personalized wellness experiences. The app combines intelligent workout planning, culturally-aligned meal tracking with calorie management, and an AI-powered coach chatbot. Built with mobile-first principles, it provides real-time progress tracking and an intuitive dashboard for users to monitor their fitness journey.",
    role: "Full Stack Developer",
    year: "2026",
    tags: ["React", "Node.js", "AI Integration", "Cloud Deployment"],
    featured: true,
    links: {
      live: "https://relentic-zyu1.vercel.app/",
      github: "https://github.com/HussainHubail",
    },
    images: {
      hero: "/relentic-thumb.png",
      gallery: [],
    },
    problem: "Fitness enthusiasts need an integrated solution that combines personalized workout planning, culturally-relevant meal tracking, and intelligent coaching—without using multiple disconnected apps.",
    solution: "Developed Relentic as an all-in-one fitness platform featuring AI-driven workout personalization, Halal meal planning with automatic calorie tracking, and a conversational AI coach. The responsive design ensures seamless experience across desktop and mobile, with a real-time progress dashboard to keep users motivated.",
    impact: [
      { metric: "Features", value: "Full Fitness Stack" },
      { metric: "AI Integration", value: "Coach Chatbot" },
      { metric: "Performance", value: "Mobile-First" },
      { metric: "Personalization", value: "AI Algorithms" },
    ],
    keyFeatures: [
      "AI-powered personalized workout planning",
      "Halal meal planning with cultural alignment",
      "Real-time calorie tracking and nutritional analysis",
      "AI Coach chatbot for guidance and motivation",
      "Live progress tracking dashboard",
      "Body metrics visualization",
      "Workout history and analytics",
      "Mobile-first responsive design",
      "Cloud-based data sync",
    ],
    challenges: [
      "Implementing machine learning for personalized recommendations",
      "Integrating AI chatbot with real-time coaching logic",
      "Designing efficient calorie tracking with comprehensive food database",
      "Ensuring mobile performance with complex UI interactions",
      "Maintaining data accuracy and user privacy",
    ],
    learnings: [
      "AI/ML integration in full-stack applications",
      "Building scalable APIs for real-time data processing",
      "Advanced state management for complex fitness data",
      "Mobile-first responsive design patterns",
      "User engagement through personalization",
      "Cloud deployment optimization",
    ],
    techStack: ["React", "Node.js", "AI Integration", "Cloud Deployment", "Real-time Analytics"],
    videoUrl: undefined,
    videoThumbnail: "/relentic-thumb.png",
  },
  {
    slug: "attention-media",
    title: "Attention Media",
    description: "A website I built solo for a content agency — subscription-based service where they handle a client's short-form video content end to end. Has a proof feed of real campaign results and a client portal concept.",
    longDescription: "Attention Media is a subscription-based content agency handling short-form video content end to end. I built this site independently to serve as their primary lead generation and proof-of-work platform. The site focuses on demonstrating real campaign results rather than just making claims, featuring a dynamic proof feed and a client portal concept.",
    role: "Solo Developer (Freelance)",
    year: "2026",
    tags: ["React", "Next.js", "TypeScript", "Supabase", "Vercel"],
    featured: true,
    links: {
      live: "https://www.attentioncreators.com/",
    },
    images: {
      hero: "/attention-media-thumb.png",
      gallery: [], // Note: Use demo account images for portal screenshots, no live login URL
    },
    problem: "The agency needed a site that could actually prove results instead of just claiming them, and needed to look premium enough to justify a monthly retainer with no fixed package.",
    solution: "Built a proof-first layout — an auto-scrolling video feed pulling real client campaign clips and view counts, animated stat blocks for growth metrics, and a clear step-by-step breakdown of their process, ending in a lead form. Also built the client-facing portal shown on the site — content status tracking, video approval workflow, and real-time performance view.",
    impact: [
      { metric: "Status", value: "Live" },
      { metric: "Delivery", value: "Solo Freelance" },
    ],
    keyFeatures: [
      "Video proof feed of real client campaigns",
      "Animated growth stats and metrics",
      "Service and process breakdown",
      "Client portal (status tracking, approvals, performance)",
      "Lead capture form integration",
    ],
    challenges: [
      "Designing a layout that prioritizes visual proof over text",
      "Optimizing video delivery and auto-scrolling performance",
      "Creating a premium feel suitable for retainer-based services",
    ],
    learnings: [
      "Managing video assets effectively with Cloudflare R2",
      "Balancing high-quality media with fast load times",
      "Working directly with a client to translate their sales process into a website flow",
    ],
    techStack: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Supabase", "Cloudflare R2", "Vercel"],
  },
  {
    slug: "haleema-solutions",
    title: "Haleema.Solutions",
    description: "A two-sided marketplace connecting Bahraini brands with local UGC creators. Brands submit a campaign brief, get matched with a creator, and get the content delivered — still building this one out.",
    longDescription: "Haleema.Solutions is a two-sided marketplace designed to bridge the gap between Bahraini brands and local User Generated Content (UGC) creators. It simplifies the process of booking creators by providing a guided campaign-brief flow and transparent tiered pricing.",
    role: "Solo Developer",
    year: "2026",
    tags: ["React", "Next.js", "TypeScript", "Supabase", "Vercel"],
    featured: true,
    status: "In Progress",
    links: {
      live: "https://haleema-xi.vercel.app/",
    },
    images: {
      hero: "/haleema-thumb.png",
      gallery: [],
    },
    problem: "Local Bahraini brands and small businesses don't have an affordable, direct way to book UGC creators without going through an agency — a local UGC marketplace like this doesn't really exist yet in Bahrain.",
    solution: "Built a guided campaign-brief flow with an assistant persona (Haleema) that walks brands from brief to creator match to delivery, plus a tiered pricing system based on follower count (Silver/Gold/Pearl) so pricing is transparent up front.",
    impact: [
      { metric: "Status", value: "In Progress" },
      { metric: "Market", value: "Bahrain UGC" },
    ],
    keyFeatures: [
      "Guided multi-step brief flow with assistant persona",
      "Creator matching UI",
      "Tiered pricing model (Silver/Gold/Pearl)",
      "Separate brand and creator onboarding/login flows",
    ],
    challenges: [
      "Designing an intuitive multi-step flow for users unfamiliar with UGC",
      "Handling two distinct user types (brands and creators) within the same platform",
      "Structuring the database to manage complex brief and match states",
    ],
    learnings: [
      "Building marketplace dynamics and dual-sided onboarding",
      "Simplifying complex agency processes into a self-serve digital product",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Supabase", "Vercel"],
  },
  {
    slug: "basita",
    title: "Basita",
    description: "My own web dev brand/agency — I use it to package and sell the same kind of work I do for clients like Attention Media, with its own site, service pages, and process breakdown.",
    longDescription: "Basita is my personal web development brand and agency. I created it to package and sell my freelance work in a structured way. Instead of doing one-off client sites without a clear framework, Basita provides structured service pages and a clear process breakdown so clients know exactly what they're getting.",
    role: "Solo Founder & Developer",
    year: "2026",
    tags: ["Personal Brand", "Agency", "React", "Next.js", "TypeScript", "Vercel"],
    featured: true,
    status: "Live",
    links: {
      live: "https://www.basita.online/",
    },
    images: {
      hero: "/basita-thumb.png",
      gallery: [],
    },
    problem: "I wanted a way to package my freelance dev work under a real brand instead of one-off client sites, with clear service offerings and a process clients could actually understand.",
    solution: "Built a full agency site — service breakdown (websites, booking systems, SaaS platforms, mobile), a 4-step process page, a portfolio section pulling in real case studies (Relentic, Russian Learning App, The Barber), and a contact/inquiry form.",
    impact: [
      // TODO: confirm real metrics before publishing (Basita site claims 2K+ users, 50K+ sessions, 78% retention, 800+ bookings/month)
      { metric: "Status", value: "Live" },
      { metric: "Delivery", value: "Solo Built" },
    ],
    keyFeatures: [
      "Service catalog with categorized offerings",
      "Structured process page",
      "Case study portfolio grid",
      "Project inquiry form with budget/type fields",
    ],
    challenges: [
      "Defining and structuring freelance services into clear, sellable packages",
      "Designing an agency site that looks professional while being run solo",
    ],
    learnings: [
      "Productizing freelance services",
      "Building a personal brand identity",
    ],
    techStack: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Vercel"],
  }
];
