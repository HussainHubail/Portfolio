"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-destructive mb-4">Oops!</h1>
          <h2 className="text-3xl font-bold mb-4">Something went wrong</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Don't worry, it's not your fault!
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="w-5 h-5" />
            Try Again
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
