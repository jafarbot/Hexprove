import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-theme-primary mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-theme-primary mt-8 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-theme-primary mt-6 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-theme-secondary leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-theme-secondary mb-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-theme-secondary mb-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-theme-secondary">{children}</li>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="border-l-4 pl-4 italic text-theme-muted my-4"
      style={{ borderColor: "var(--accent)" }}
    >
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code
      className="px-1.5 py-0.5 rounded text-sm font-mono"
      style={{
        backgroundColor: "var(--code-bg)",
        color: "var(--accent)",
      }}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre
      className="p-4 rounded-lg overflow-x-auto my-4 text-sm"
      style={{ backgroundColor: "var(--code-bg)" }}
    >
      {children}
    </pre>
  ),
  hr: () => (
    <hr className="my-8 border-t" style={{ borderColor: "var(--border-color)" }} />
  ),
  strong: ({ children }) => (
    <strong className="font-bold text-theme-primary">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full text-sm border-collapse rounded-lg overflow-hidden"
        style={{ backgroundColor: "var(--bg-elevated, #1F2937)" }}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead
      className="text-left"
      style={{ backgroundColor: "var(--bg-darker, #111827)" }}
    >
      {children}
    </thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr
      className="border-b"
      style={{ borderColor: "var(--border-color, #374151)" }}
    >
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 font-semibold text-theme-primary">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-theme-secondary">{children}</td>
  ),
};
