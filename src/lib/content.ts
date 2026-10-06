import { articles } from '../data/articles';
import { builtInScenarios } from '../data/scenarios';
import type { Article, Scenario } from '../types/content';
import { countWords, readingMinutes } from './text';

export { articles, builtInScenarios };

const articleMap = new Map(articles.map((a) => [a.id, a]));

export function getArticle(id: string): Article | undefined {
  return articleMap.get(id);
}

export function articleWordCount(article: Article): number {
  return countWords([article.summary, article.body, ...article.checklist].join(' '));
}

export function articleReadingMinutes(article: Article): number {
  return readingMinutes(articleWordCount(article));
}

export function scenariosForArticle(articleId: string, pool: Scenario[]): Scenario[] {
  return pool.filter((s) => s.articleIds.includes(articleId));
}

export function relatedArticles(article: Article): Article[] {
  return article.relatedArticleIds.map(getArticle).filter((a): a is Article => Boolean(a));
}

export const ARTICLE_IDS = articles.map((a) => a.id);
