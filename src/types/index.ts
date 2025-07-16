export interface News {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  featured?: boolean;
  status: 'draft' | 'published' | 'archived';
  likes: number;
  views: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  newsId: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface Category {
  id: number;
  name: string;
  nameKh: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface RSSFeed {
  id: number;
  title: string;
  url: string;
  category: string;
  lastFetched?: string;
  active: boolean;
}