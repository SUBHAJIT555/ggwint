import {
  createContext,
} from "react";
import type { Product } from "../data/products";

export type QuoteItem = Product & { quantity: number };

type QuoteContextValue = {
  items: QuoteItem[];
  addToQuote: (product: Product, quantity?: number) => void;
  removeFromQuote: (id: string) => void;
  clearQuote: () => void;
  isInQuote: (id: string) => boolean;
  updateQuantity: (id: string, delta: number) => void;
};

export const QuoteContext = createContext<QuoteContextValue | undefined>(undefined);


