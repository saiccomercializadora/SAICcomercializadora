import Link from "next/link";
import { BrandLogo } from "@/components/layout/brand-logo";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-zinc-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <BrandLogo className="text-stone-100" compact />
          <p className="mt-4 text-sm text-stone-300">
            Especialistas en pinturas y materiales para construcción y remodelación.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Navegación</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/collections">Productos</Link></li>
            <li><Link href="/search">Buscar</Link></li>
            <li><Link href="/contact">Contacto</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Categorías</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li><Link href="/products/pintura-sait-tipo-1">SAIT Tipo 1</Link></li>
            <li><Link href="/products/pintura-sait-tipo-2">SAIT Tipo 2</Link></li>
            <li><Link href="/contact">Asesoría rápida</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400">Contacto</p>
          <ul className="mt-4 space-y-3 text-sm text-stone-300">
            <li>Asesoría comercial</li>
            <li>Atención personalizada</li>
            <li>WhatsApp</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-xs text-stone-400 sm:px-6 lg:px-8">
          <span>© 2026 SAIC Comercializadora</span>
          <span>Construcción y remodelación</span>
        </div>
      </div>
    </footer>
  );
}
