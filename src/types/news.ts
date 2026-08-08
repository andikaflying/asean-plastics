export type NewsBodyBlock =
  | { type: 'lede'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'figure'; src: string; width: number; height: number; alt: string; caption?: string };

export type NewsImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type NewsArticle = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  image: NewsImage;
  excerpt: string;
  body: NewsBodyBlock[];
};
