"use client";

import Link from "next/link";
import { CartDrawer } from "@/components/cart/cart-drawer";

export default function CartPage() {
  return (
    <main className="section-shell py-16 lg:py-20">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Carrito</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Tu compra</h1>
      </div>

      <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm sm:p-6">
        <CartDrawer />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/collections" className="rounded-full border border-zinc-300 bg-white px-5 py-3 text-center font-semibold text-zinc-900">
          Seguir comprando
        </Link>
        <Link href="/contact" className="rounded-full bg-zinc-900 px-5 py-3 text-center font-semibold text-white">
          Solicitar cotización
        </Link>
      </div>
    </main>
  );
}
