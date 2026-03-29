type ParseState = {
  inCodeBlock: boolean;
  codeLang: string;
  paragraphBuffer: string[];
  listType: "ul" | "ol" | null;
  listBuffer: string[];
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyInlineMarkdown(value: string): string {
  const escaped = escapeHtml(value);

  return escaped
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

function flushParagraph(state: ParseState, html: string[]): void {
  if (state.paragraphBuffer.length === 0) {
    return;
  }

  html.push(`<p>${applyInlineMarkdown(state.paragraphBuffer.join(" "))}</p>`);
  state.paragraphBuffer = [];
}

function flushList(state: ParseState, html: string[]): void {
  if (!state.listType || state.listBuffer.length === 0) {
    return;
  }

  html.push(`<${state.listType}>${state.listBuffer.join("")}</${state.listType}>`);
  state.listType = null;
  state.listBuffer = [];
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html: string[] = [];
  const state: ParseState = {
    inCodeBlock: false,
    codeLang: "",
    paragraphBuffer: [],
    listType: null,
    listBuffer: [],
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushParagraph(state, html);
      flushList(state, html);

      if (!state.inCodeBlock) {
        state.inCodeBlock = true;
        state.codeLang = line.slice(3).trim();
        const className = state.codeLang ? ` class="language-${escapeHtml(state.codeLang)}"` : "";
        html.push(`<pre><code${className}>`);
      } else {
        state.inCodeBlock = false;
        state.codeLang = "";
        html.push("</code></pre>");
      }
      continue;
    }

    if (state.inCodeBlock) {
      html.push(`${escapeHtml(rawLine)}\n`);
      continue;
    }

    if (line.length === 0) {
      flushParagraph(state, html);
      flushList(state, html);
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph(state, html);
      flushList(state, html);
      const level = headingMatch[1].length;
      html.push(`<h${level}>${applyInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    if (/^---$/.test(line)) {
      flushParagraph(state, html);
      flushList(state, html);
      html.push("<hr />");
      continue;
    }

    const blockquoteMatch = line.match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph(state, html);
      flushList(state, html);
      html.push(`<blockquote><p>${applyInlineMarkdown(blockquoteMatch[1])}</p></blockquote>`);
      continue;
    }

    const ulMatch = line.match(/^[-*+]\s+(.+)$/);
    if (ulMatch) {
      flushParagraph(state, html);
      if (state.listType !== "ul") {
        flushList(state, html);
        state.listType = "ul";
      }
      state.listBuffer.push(`<li>${applyInlineMarkdown(ulMatch[1])}</li>`);
      continue;
    }

    const olMatch = line.match(/^\d+\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph(state, html);
      if (state.listType !== "ol") {
        flushList(state, html);
        state.listType = "ol";
      }
      state.listBuffer.push(`<li>${applyInlineMarkdown(olMatch[1])}</li>`);
      continue;
    }

    flushList(state, html);
    state.paragraphBuffer.push(line.trim());
  }

  flushParagraph(state, html);
  flushList(state, html);

  return html.join("\n");
}
