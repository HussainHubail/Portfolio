import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { CopyButton } from "@/components/ui/copy-button";
import { profile } from "@/content/profile";

const socialLinks = [
  { name: "GitHub", href: profile.social.github, icon: Github },
  { name: "LinkedIn", href: profile.social.linkedin, icon: Linkedin },
  profile.social.twitter && { name: "Twitter", href: profile.social.twitter, icon: Twitter },
  { name: "Email", href: `mailto:${profile.email}`, icon: Mail },
].filter(Boolean) as { name: string; href: string; icon: typeof Github }[];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
      { name: "Experience", href: "/experience" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resume", href: profile.resumeUrl },
      { name: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-4">
              <span className="font-bold text-2xl">{profile.name}</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {profile.tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-background border flex items-center justify-center hover:bg-accent hover:border-primary transition-all hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
              <CopyButton
                text={profile.email}
                label="Copy Email"
                className="ml-1"
              />
            </div>
          </div>

          {/* Links Sections */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-8">
              {footerLinks.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
