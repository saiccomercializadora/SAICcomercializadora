"use client";

import { useCart } from "@/components/cart/cart-context";

export function AddToCartButton({
  variantId,
  title,
  price,
  image,
  handle,
}: {
  variantId: string;
  title: string;
  price: number;
  image?: string;
  handle?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() =>
        addItem({
          id: `${variantId}-cart-item`,
          variantId,
          title,
          price,
          image,
          handle,
          quantity: 1,
        })
      }
      className="rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700"
    >
      Agregar al carrito
    </button>
  );
}
