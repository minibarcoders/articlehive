export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      guides: {
        Row: Guide
        Insert: Omit<Guide, 'id' | 'date'>
        Update: Partial<Omit<Guide, 'id' | 'date'>>
      }
      reviews: {
        Row: Review
        Insert: Omit<Review, 'id' | 'date'>
        Update: Partial<Omit<Review, 'id' | 'date'>>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

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