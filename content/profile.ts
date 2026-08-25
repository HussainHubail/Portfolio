export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  availability: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
    website?: string;
  };
  resumeUrl: string;
  portfolioUrl?: string;
  skills: Array<{ name: string; category: string }>;
}

export const profile: Profile = {
  name: "Husain Hubail",
  role: "ICT Database Systems",
  tagline: "Building reliable web applications and database-driven systems.",
  bio: "I'm an ICT Database Systems graduate from Bahrain Polytechnic. I'm passionate about building reliable web applications and database-driven systems. I focus on practical skills in database design, web development, and creating functional solutions.",
  email: "hmjubail2003@gmail.com",
  phone: "+973 39011560",
  location: "Bahrain",
  availability: "Open to opportunities",
  social: {
    github: "https://github.com/HussainHubail",
    linkedin: "https://www.linkedin.com/in/hussain-hubail-76689b220",
    twitter: "",
    website: "https://portfolio-tau-murex-63.vercel.app",
  },
  resumeUrl: "/resume.pdf",
  portfolioUrl: "https://portfolio-tau-murex-63.vercel.app",
  skills: [
    // Frontend
    { name: "React", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "HTML", category: "Frontend" },
    { name: "CSS", category: "Frontend" },
    { name: "JavaScript", category: "Frontend" },
    
    // Backend
    { name: "Node.js", category: "Backend" },
    { name: "Express", category: "Backend" },
    { name: "PostgreSQL", category: "Backend" },
    { name: "Supabase", category: "Backend" },
    { name: "REST APIs", category: "Backend" },
    
    // DevOps & Tools
    { name: "Vercel", category: "DevOps" },
    { name: "Cloudflare R2", category: "DevOps" },
    { name: "GitHub Actions", category: "DevOps" },
    { name: "Git", category: "Tools" },
  ],
};
