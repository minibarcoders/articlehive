export interface Guide {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  date: string;
  author: string;
  read_time: string;
}

export interface Review {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  rating: number;
  image_url: string | null;
  date: string;
  author: string;
  read_time: string;
  pros: string[];
  cons: string[];
}