import React from 'react';

function safeHref(href) {
  const value = String(href || '').trim();
  if (/^(https?:\/\/|mailto:)/i.test(value)) return value;
  return '';
}

function linkLabel(value) {
  return value.replace(/^mailto:/i, '');
}

function renderInline(text, keyPrefix) {
  const parts = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**')) {
      parts.push(<strong key={`${keyPrefix}-b-${match.index}`}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      const href = safeHref(linkMatch?.[2]);
      parts.push(href ? (
        <a key={`${keyPrefix}-a-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      ) : linkMatch?.[1]);
    } else {
      const trailing = token.match(/[.,;:!?]+$/)?.[0] || '';
      const cleanToken = trailing ? token.slice(0, -trailing.length) : token;
      const href = cleanToken.includes('@') && !cleanToken.startsWith('http')
        ? `mailto:${cleanToken}`
        : cleanToken;
      parts.push(
        <a key={`${keyPrefix}-url-${match.index}`} href={href} target="_blank" rel="noopener noreferrer">
          {linkLabel(cleanToken)}
        </a>,
      );
      if (trailing) parts.push(trailing);
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function BasicMarkdown({ text }) {
  const lines = String(text || '').split(/\r?\n/);
  const blocks = [];
  let paragraph = [];
  let list = [];
  let code = [];
  let inCode = false;

  function flushParagraph() {
    if (!paragraph.length) return;
    const content = paragraph.join('\n');
    blocks.push(
      <p key={`p-${blocks.length}`}>
        {content.split('\n').map((line, index) => (
          <React.Fragment key={`line-${index}`}>
            {index > 0 ? <br /> : null}
            {renderInline(line, `p-${blocks.length}-${index}`)}
          </React.Fragment>
        ))}
      </p>,
    );
    paragraph = [];
  }

  function flushList() {
    if (!list.length) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`}>
        {list.map((item, index) => (
          <li key={`li-${index}`}>{renderInline(item, `li-${blocks.length}-${index}`)}</li>
        ))}
      </ul>,
    );
    list = [];
  }

  function flushCode() {
    if (!code.length) return;
    blocks.push(
      <pre key={`pre-${blocks.length}`}><code>{code.join('\n')}</code></pre>,
    );
    code = [];
  }

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    const listMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      list.push(listMatch[1]);
      continue;
    }

    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    flushList();
    paragraph.push(line);
  }

  flushCode();
  flushParagraph();
  flushList();

  return <>{blocks}</>;
}
