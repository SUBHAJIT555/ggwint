"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import type { QuoteItem } from "../contexts/QuoteContext";
import type { Product } from "../data/products";
import { QuoteContext } from "../contexts/QuoteContext";

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<QuoteItem[]>([]);

    const addToQuote = useCallback((product: Product, quantity = 1) => {
        setItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, []);

    const removeFromQuote = useCallback((id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }, []);

    const clearQuote = useCallback(() => setItems([]), []);

    const isInQuote = useCallback(
        (id: string) => items.some((item) => item.id === id),
        [items]
    );

    const value = useMemo(
        () => ({
            items,
            addToQuote,
            removeFromQuote,
            clearQuote,
            isInQuote,
            updateQuantity,
        }),
        [addToQuote, clearQuote, isInQuote, items, removeFromQuote, updateQuantity]
    );

    return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
};

