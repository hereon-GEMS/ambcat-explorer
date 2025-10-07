// src/components/MarkdownRenderer.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
// import languages you want to support, e.g. javascript, tsx, python
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import tsx from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("ts", tsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("html", xml);

export type MarkdownRendererProps = {
  markdown: string;
  /**
   * Optional wrapper className to add additional Tailwind / daisyUI classes.
   */
  className?: string;
  /**
   * If true (default) HTML inside the markdown will be allowed but sanitized.
   * Set false to disable rehype-raw (not recommended).
   */
  allowHtml?: boolean;
  /**
   * If true, use syntax highlighting for fenced code blocks (requires react-syntax-highlighter).
   */
  highlightCode?: boolean;
};

/**
 * MarkdownRenderer
 * Renders Markdown -> daisyUI styled HTML.
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  markdown,
  className = "",
  allowHtml = true,
  highlightCode = true,
}) => {
  // Custom renderers to map markdown nodes to daisyUI + Tailwind classes
  const components: React.ComponentProps<typeof ReactMarkdown>["components"] = {
    // Headings
    h1: ({ node, ...props }) => (
      <h1 className="text-3xl font-bold mb-4" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-semibold mb-3" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-semibold mb-2" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="text-lg font-medium mb-2" {...props} />
    ),
    // Links
    a: ({ href, children, ...props }) => (
      <a
        href={href}
        className="link link-primary hover:underline"
        target={href?.startsWith("#") ? undefined : "_blank"}
        rel={href?.startsWith("#") ? undefined : "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    ),
    // Images
    img: ({ src, alt, title, ...props }) => (
      <figure className="my-4">
        <img
          src={src}
          alt={alt ?? ""}
          title={title}
          className="rounded-lg border shadow-sm max-w-full"
          {...props}
        />
        {alt ? (
          <figcaption className="text-sm opacity-70 mt-1">{alt}</figcaption>
        ) : null}
      </figure>
    ),
    // Paragraphs
    p: ({ node, children, ...props }) => {
      // Check if this paragraph contains any block-level code (fenced/multi-line)
      const hasBlockCode = node.children.some(
        (child: any) =>
          child.type === "code" ||
          (child.type === "element" && child.tagName === "pre"),
      );

      if (hasBlockCode) {
        // Render children directly, no <p> wrapping
        return <>{children}</>;
      }

      // Normal paragraph styling
      return (
        <p className="mb-4 leading-relaxed text-base-content prose" {...props}>
          {children}
        </p>
      );
    },

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
    li: ({ children, ...props }) => <li className="mb-1">{children}</li>,

    // Blockquote
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 pl-4 italic my-4 bg-base-200 p-3 rounded"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Tables (daisyUI table)
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="table table-compact w-full" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-base-300" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th className="px-3 py-2 text-left" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-3 py-2 align-top" {...props}>
        {children}
      </td>
    ),

    // Code blocks
    code: ({ node, inline, className, children, ...props }) => {
      // If no language class is provided, treat it as inline
      const isInline = !className;

      if (isInline) {
        return <code className="">{children}</code>;
      }

      // Detect HTML <code> elements
      if (inline) {
        // Inline code, small styling
        return <code className="badge badge-outline">{children}</code>;
      }

      // Fenced/multi-line code → use SyntaxHighlighter
      const match = /language-(\w+)/.exec(String(className ?? ""));
      const lang = match?.[1] ?? "";

      return (
        <>
          <SyntaxHighlighter
            language={lang || undefined}
            style={atomOneLight}
            customStyle={{
              borderRadius: 8,
              padding: "1rem",
              fontSize: 13,
              margin: "1rem 0",
              overflowX: "auto",
            }}
            showLineNumbers={false}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </>
      );
    },
  };

  return <ReactMarkdown components={components}
    rehypePlugins={allowHtml ? [rehypeRaw] : []}>{markdown}</ReactMarkdown>;
};

export default MarkdownRenderer;
