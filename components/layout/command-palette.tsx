"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Briefcase, User, Mail, Command as CommandIcon } from "lucide-react";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: User },
  { name: "Projects", href: "/projects", icon: FileText },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "About", href: "/about", icon: User },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
    }
  }, [isOpen]);

  const filteredNavigation = navigation.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] animate-fade-in"
      onClick={() => setIsOpen(false)}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div
        className="relative z-50 w-full max-w-2xl mx-4 bg-background rounded-xl border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search pages, projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted rounded border">
            <CommandIcon className="w-3 h-3" />K
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {search === "" && (
            <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
              Quick Links
            </div>
          )}
          
          {filteredNavigation.length > 0 && (
            <div className="mb-4">
              {search !== "" && (
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                  Pages
                </div>
              )}
              {filteredNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    onClick={() => handleSelect(item.href)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {filteredProjects.length > 0 && (
            <div>
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                Projects ({filteredProjects.length})
              </div>
              {filteredProjects.slice(0, 5).map((project) => (
                <button
                  key={project.slug}
                  onClick={() => handleSelect(`/projects/${project.slug}`)}
                  className="w-full flex flex-col gap-1 px-3 py-2.5 rounded-lg hover:bg-accent transition-colors text-left"
                >
                  <span className="text-sm font-medium">{project.title}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {project.description}
                  </span>
                  <div className="flex gap-1 mt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          )}

          {search !== "" && filteredNavigation.length === 0 && filteredProjects.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found for "{search}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex items-center justify-between text-xs text-muted-foreground bg-muted/30">
          <div className="flex items-center gap-4">
            <span>Press <kbd className="px-1.5 py-0.5 bg-background rounded border">Esc</kbd> to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
