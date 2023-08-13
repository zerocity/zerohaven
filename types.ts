import { z } from "zod";

const schema = z.object({
  q: z.string().optional(),
  page: z.string().optional(),
  purity: z.string().optional(),
  categories: z.string().optional(),
  apikey: z.string().optional(),
  // topRange: z.string().optional(),
});

export type GetImageParameter = z.infer<typeof schema>;

export interface ApiResponse {
  data: ImageReturn[];
  meta: Meta;
}

export interface ImageReturn {
  id: string;
  url: string;
  short_url: string;
  views: number;
  favorites: number;
  source: string;
  purity: string;
  category: string;
  dimension_x: number;
  dimension_y: number;
  resolution: string;
  ratio: string;
  file_size: number;
  file_type: string;
  created_at: string;
  colors: string[];
  path: string;
  thumbs: Thumbs;
}

export interface Thumbs {
  large: string;
  original: string;
  small: string;
}

export interface Meta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  query: string;
  seed: any;
}
