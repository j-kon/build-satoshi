import { CopyButton } from "@/components/copy-button";

type CodeBlockProps = {
  language: string;
  filename: string;
  code: string;
};

export function CodeBlock({ language, filename, code }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-bg">
      <div className="flex items-center justify-between border-b border-border bg-bg-2 px-4 py-3">
        <div className="min-w-0">
          <div className="truncate font-mono text-xs text-text">{filename}</div>
          <div className="text-[11px] uppercase tracking-label text-text-3">{language}</div>
        </div>
        <CopyButton text={code} className="shrink-0" />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-6 text-text-2">
        <code>{code}</code>
      </pre>
    </div>
  );
}
