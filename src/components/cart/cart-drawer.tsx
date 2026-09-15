"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";

export function CartDrawer() {
  const { items, subtotal, itemCount, removeItem, updateQuantity, checkoutUrl } = useCart();

  if (!items.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-8 text-center shadow-sm">
        <h2 className="text-2xl font-black text-zinc-900">Tu carrito está vacío</h2>
        <p className="mt-3 text-sm text-zinc-600">Agrega productos para continuar con tu compra.</p>
        <Link href="/collections" className="mt-6 inline-block rounded-full bg-zinc-900 px-5 py-3 font-semibold text-white">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-zinc-900">Carrito</h2>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">
          {itemCount} items
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.variantId} className="flex items-center gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-3">
            <div className="h-20 w-20 overflow-hidden rounded-2xl border border-stone-200 bg-white">
              {item.image ? (
                <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-stone-100 text-xs font-bold text-zinc-600">
                  {item.title.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-zinc-900">{item.title}</p>
              <p className="mt-1 text-sm text-zinc-500">Precio unitario: ${item.price.toFixed(2)}</p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  className="h-8 w-8 rounded-full border border-stone-300 bg-white text-base text-zinc-700 transition hover:border-zinc-500"
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                  aria-label={`Disminuir cantidad de ${item.title}`}
                >
                  −
                </button>
                <span className="min-w-6 text-center text-sm font-semibold text-zinc-900">{item.quantity}</span>
                <button
                  className="h-8 w-8 rounded-full border border-stone-300 bg-white text-base text-zinc-700 transition hover:border-zinc-500"
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                  aria-label={`Aumentar cantidad de ${item.title}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-zinc-900">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                className="mt-2 text-xs font-medium text-red-600 transition hover:text-red-700"
                onClick={() => removeItem(item.variantId)}
                aria-label={`Eliminar ${item.title}`}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
        <div className="flex items-center justify-between text-lg font-bold text-zinc-900">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <a
            href={checkoutUrl}
            className="rounded-full bg-zinc-900 px-5 py-3 text-center font-semibold text-white transition hover:bg-zinc-700"
          >
            Ir al checkout
          </a>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(`Hola, quiero consultar sobre los siguientes productos: ${items.map((item) => item.title).join(", ")}. Quisiera información sobre disponibilidad y precio.`)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-emerald-500 bg-emerald-50 px-5 py-3 text-center font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Consultar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
