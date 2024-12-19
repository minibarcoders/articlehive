import { BaseContent } from './base';

export interface Review extends BaseContent {
  rating: number;
  pros: string[];
  cons: string[];
}