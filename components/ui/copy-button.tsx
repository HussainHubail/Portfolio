"use client";

import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Check } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label = "Copy", className }: CopyButtonProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      showToast("Copied to clipboard", "success", 2000);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast("Unable to copy", "error", 2500);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={copy}
      className={className}
      aria-live="polite"
    >
      {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
      {copied ? "Copied" : label}
    </Button>
  );
}
