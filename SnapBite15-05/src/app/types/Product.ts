export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  available: boolean;
  tag?: string;
  rating: number;
}