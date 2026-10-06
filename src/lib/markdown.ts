import { slugify } from './text';

/** Sehr kleiner, sicherer Markdown-Parser (kein HTML, kein innerHTML). */
export type Inline = { type: 'text' | 'strong'; value: string };
export type Block =
  | { type: 'h2' | 'h3'; text: string; id: string }
  | { type: 'p'; inline: Inline[] }
  | { type: 'quote'; lines: Inline[][] }
  | { type: 'ul' | 'ol'; items: Inline[][] };

export function parseInline(text: string): Inline[] {
  const parts: Inline[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push({ type: 'text', value: text.slice(last, m.index) });
    parts.push({ type: 'strong', value: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ type: 'text', value: text.slice(last) });
  return parts;
}

export function parseMarkdown(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = src.split('\n');
  const usedIds = new Set<string>();
  const uniqueId = (text: string) => {
    let id = slugify(text) || 'abschnitt';
    let n = 2;
    while (usedIds.has(id)) id = `${slugify(text)}-${n++}`;
    usedIds.add(id);
    return id;
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('### ')) { const t = line.slice(4).trim(); blocks.push({ type: 'h3', text: t, id: uniqueId(t) }); i++; continue; }
    if (line.startsWith('## ')) { const t = line.slice(3).trim(); blocks.push({ type: 'h2', text: t, id: uniqueId(t) }); i++; continue; }
    if (line.startsWith('> ')) {
      const q: Inline[][] = [];
      while (i < lines.length && lines[i].startsWith('> ')) { q.push(parseInline(lines[i].slice(2).trim())); i++; }
      blocks.push({ type: 'quote', lines: q });
      continue;
    }
    if (/^- /.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(parseInline(lines[i].slice(2).trim())); i++; }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(parseInline(lines[i].replace(/^\d+\. /, '').trim())); i++; }
      blocks.push({ type: 'ol', items });
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |> |- |\d+\. )/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    blocks.push({ type: 'p', inline: parseInline(para.join(' ')) });
  }
  return blocks;
}

export function tableOfContents(blocks: Block[]): { id: string; text: string }[] {
  return blocks.filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2').map((b) => ({ id: b.id, text: b.text }));
}
