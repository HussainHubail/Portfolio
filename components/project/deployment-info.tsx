"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ExternalLink } from "lucide-react";

interface DeploymentInfoProps {
  projectTitle: string;
  liveUrl?: string;
}

export function DeploymentInfo({ projectTitle, liveUrl }: DeploymentInfoProps) {
  const deploymentChecklist = [
    { label: "Build optimized", completed: true },
    { label: "Deployed to production", completed: !!liveUrl },
    { label: "Public link available", completed: !!liveUrl },
    { label: "Auto-deploy on push enabled", completed: !!liveUrl },
  ];

  const completedCount = deploymentChecklist.filter((item) => item.completed).length;
  const completionPercentage = Math.round((completedCount / deploymentChecklist.length) * 100);

  const isPlaceholder = !liveUrl || liveUrl.includes("PUT_LIVE_URL_HERE");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Live & Deployment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Framework Detection */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Hosting Configuration</h3>
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-3">
                This project is built with <span className="font-semibold">React + Node.js/Express + MongoDB</span>
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">Recommended Platforms:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• <span className="font-medium">Vercel</span> - For frontend (React) - with serverless backend</li>
                  <li>• <span className="font-medium">Render</span> - Full stack deployment with MongoDB</li>
                  <li>• <span className="font-medium">Railway</span> - Full stack with auto-scaling</li>
                  <li>• <span className="font-medium">Heroku/Fly.io</span> - Node.js backend hosting</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Live Link */}
          {!isPlaceholder ? (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Live Site</h3>
              <Button size="lg" asChild className="w-full">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  View {projectTitle} Live
                </a>
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Live Site</h3>
              <Button size="lg" disabled className="w-full">
                <ExternalLink className="w-4 h-4" />
                Deploy to see live site
              </Button>
            </div>
          )}

          {/* Deployment Checklist */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Deployment Checklist</h3>
            <div className="space-y-2">
              {deploymentChecklist.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      item.completed
                        ? "bg-green-500/20 border-green-500/50"
                        : "border-border bg-muted/30"
                    }`}
                  >
                    {item.completed && <Check className="w-3 h-3 text-green-600" />}
                  </div>
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Completion</span>
                <span className="text-sm font-semibold text-primary">{completionPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500/50 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Deployment Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <span className="font-semibold">Deployment Ready:</span> This project follows production-ready best practices. Update the live URL in the content file to enable the live demo link and deployment status.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
