"use client";

import { useState } from "react";
import hljs from "highlight.js/lib/core";
import dart from "highlight.js/lib/languages/dart";
import javascript from "highlight.js/lib/languages/javascript";
import rust from "highlight.js/lib/languages/rust";

import type { StarterCode } from "@/lib/types";

hljs.registerLanguage("rust", rust);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);

type StarterCodeBlockProps = {
  starterCode: StarterCode;
};

function resolveLanguage(language: string) {
  const normalized = language.toLowerCase();

  if (normalized.includes("rust")) {
    return "rust";
  }

  if (normalized.includes("dart")) {
    return "dart";
  }

  return "javascript";
}

export function StarterCodeBlock({ starterCode }: StarterCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const language = resolveLanguage(starterCode.language);
  const highlighted = hljs.highlight(starterCode.code, { language }).value;

  async function handleCopy() {
    await navigator.clipboard.writeText(starterCode.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-theme overflow-hidden rounded-lg border border-border bg-bg-3">
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <div className="font-mono text-[12px] text-text-3">{starterCode.filename}</div>
        <button type="button" onClick={handleCopy} className="text-[12px] text-text-2 transition hover:text-btc">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-text">
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}
