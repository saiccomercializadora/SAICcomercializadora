"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  variantId: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
  handle?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  checkoutUrl: string;
};

const STORAGE_KEY = "sait-storefront-cart";
const DEFAULT_STORE_DOMAIN = "0hiwfi-ps.myshopify.com";

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as CartItem[];
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((current) => {
      const next = [...current];
      const existingIndex = next.findIndex((entry) => entry.variantId === item.variantId);
      const quantity = item.quantity ?? 1;

      if (existingIndex >= 0) {
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      next.push({
        id: item.id,
        variantId: item.variantId,
        title: item.title,
        quantity,
        price: item.price,
        image: item.image,
        handle: item.handle,
      });

      return next;
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.variantId === variantId ? { ...item, quantity: Math.max(0, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (variantId: string) => {
    setItems((current) => current.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const shopDomain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || DEFAULT_STORE_DOMAIN;

  const checkoutUrl = useMemo(() => {
    const cartString = items
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(",");

    if (!cartString) return `https://${shopDomain}/cart`;
    return `https://${shopDomain}/cart/${cartString}`;
  }, [items, shopDomain]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      checkoutUrl,
    }),
    [items, itemCount, subtotal, checkoutUrl],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
