import type { Article } from '../../types/content';
import { basicArticles } from './basics';
import { technicalArticles } from './technical';
import { threatArticles } from './threats';
import { responseArticles } from './response';
import { organisationArticles } from './organisation';
import { misconceptions } from './misconceptions';

function withMisconceptions(article: Article): Article {
  const extra = misconceptions[article.id];
  if (!extra) return article;
  const marker = '\n## Zusammengefasst';
  const body = article.body.includes(marker)
    ? article.body.replace(marker, `\n${extra}\n${marker}`)
    : `${article.body}\n\n${extra}`;
  return { ...article, body };
}

export const articles: Article[] = [
  ...basicArticles,
  ...technicalArticles,
  ...threatArticles,
  ...responseArticles,
  ...organisationArticles,
].map(withMisconceptions);
