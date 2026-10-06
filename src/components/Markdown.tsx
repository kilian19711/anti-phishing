import type { Block, Inline } from '../lib/markdown';

function InlineText({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((p, i) => (p.type === 'strong' ? <strong key={i}>{p.value}</strong> : <span key={i}>{p.value}</span>))}
    </>
  );
}

/** Rendert geparste Blöcke als semantisches HTML – ohne dangerouslySetInnerHTML. */
export function Markdown({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2': return <h2 key={i} id={b.id}>{b.text}</h2>;
          case 'h3': return <h3 key={i} id={b.id}>{b.text}</h3>;
          case 'p': return <p key={i}><InlineText parts={b.inline} /></p>;
          case 'quote':
            return (
              <blockquote key={i}>
                {b.lines.map((l, j) => <p key={j}><InlineText parts={l} /></p>)}
              </blockquote>
            );
          case 'ul': return <ul key={i}>{b.items.map((it, j) => <li key={j}><InlineText parts={it} /></li>)}</ul>;
          case 'ol': return <ol key={i}>{b.items.map((it, j) => <li key={j}><InlineText parts={it} /></li>)}</ol>;
          default: return null;
        }
      })}
    </>
  );
}
