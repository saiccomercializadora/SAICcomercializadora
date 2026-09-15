import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/layout/brand-logo";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/collections" },
  { label: "Buscar", href: "/search" },
  { label: "Contacto", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="SAIC Comercializadora inicio">
          <BrandLogo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-700 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-zinc-950">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noreferrer"
            aria-label="Hablar por WhatsApp"
            className="hidden rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 sm:inline-flex"
          >
            WhatsApp
          </a>
          <Link
            href="/cart"
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:border-zinc-500"
          >
            Carrito
          </Link>
        </div>
      </div>
    </header>
  );
}
