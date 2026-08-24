export type Difficulty = "입문" | "보통";
export type PriceType = "무료" | "부분유료" | "유료";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  sortOrder: number;
}

export interface Tool {
  id: string;
  name: string;
  oneLiner: string;
  categoryId: string;
  difficulty: Difficulty;
  priceType: PriceType;
  priceNote?: string;
  url: string;
  logoEmoji: string;
  tags: string[];
  featured?: boolean;
  addedAt: string;
}
