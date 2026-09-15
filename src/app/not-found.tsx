import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell flex min-h-[60vh] items-center justify-center py-20">
      <div className="max-w-xl rounded-[2rem] border border-stone-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Página no encontrada</h1>
        <p className="mt-4 text-zinc-600">
          La sección que buscas no está disponible o fue movida. Volvé al catálogo y seguí navegando por SAIC Comercializadora.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="rounded-full bg-zinc-900 px-5 py-3 font-semibold text-white">
            Inicio
          </Link>
          <Link href="/collections" className="rounded-full border border-zinc-300 bg-white px-5 py-3 font-semibold text-zinc-900">
            Ver productos
          </Link>
        </div>
      </div>
    </main>
  );
}
