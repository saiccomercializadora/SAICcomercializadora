import type { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Colecciones | SAIC Comercializadora",
  description: "Descubre las líneas de productos y materiales de SAIC Comercializadora para construcción y remodelación.",
  alternates: {
    canonical: "/collections",
  },
};

const collectionsQuery = `
  query Collections {
    collections(first: 20) {
      nodes {
        id
        title
        handle
        description
        image {
          url
          altText
        }
      }
    }
  }
`;

export default async function CollectionsPage() {
  const data = await shopifyFetch<{ collections: { nodes: Array<{ id: string; title: string; handle: string; description?: string; image?: { url: string; altText?: string } }> } }>(collectionsQuery);

  if (!data) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Configuración</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Falta la conexión de Shopify</h1>
          <p className="mt-4 text-zinc-600">
            Agrega tus credenciales de Storefront en el archivo .env.local para activar el catálogo real.
          </p>
        </div>
      </main>
    );
  }

  const featuredCollections = data.collections.nodes.slice(0, 6);

  if (!featuredCollections.length) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Catálogo vacío</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Todavía no hay colecciones publicadas</h1>
          <p className="mt-4 text-zinc-600">
            La tienda aún no tiene colecciones activas en Shopify. Mientras tanto podés consultar por WhatsApp para armar el pedido.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={buildWhatsAppUrl("Hola, quiero saber qué productos tienen disponibles para SAIC Comercializadora.")} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white">
              Consultar por WhatsApp
            </a>
            <Link href="/contact" className="rounded-full border border-zinc-300 bg-white px-5 py-3 font-semibold text-zinc-900">
              Contacto
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="section-shell py-16 lg:py-20">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Catálogo</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Colecciones SAIC</h1>
        <p className="mt-4 max-w-2xl text-zinc-600">
          Soluciones para obra, remodelación, mantenimiento y proyectos profesionales con materiales pensados para rendir en cada superficie.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featuredCollections.map((collection) => (
          <Link
            key={collection.id}
            href={`/collections/${collection.handle}`}
            className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative overflow-hidden">
              <img
                src={collection.image?.url || "https://placehold.co/600x400/ddd/aaa?text=SAIT"}
                alt={collection.image?.altText || collection.title}
                className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-bold text-zinc-900">{collection.title}</h2>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800">
                  Ver
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                {collection.description || "Productos de SAIC Comercializadora."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
