import type { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/product/product-card";

export const metadata: Metadata = {
  title: "Buscar productos | SAIC Comercializadora",
  description: "Busca pinturas y materiales de SAIC Comercializadora por nombre, uso o categoría.",
  alternates: {
    canonical: "/search",
  },
};

type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();

  const productQuery = query
    ? `
      query SearchProducts($query: String!) {
        products(first: 20, query: $query) {
          nodes {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `
    : `
      query FeaturedProducts {
        products(first: 12) {
          nodes {
            id
            title
            handle
            description
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `;

  const data = await shopifyFetch<{ products: { nodes: ProductNode[] } }>(productQuery, query ? { query: `title:*${query}* OR product_type:*${query}*` } : undefined);

  if (!data) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Configuración</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Búsqueda no disponible</h1>
          <p className="mt-4 text-zinc-600">
            Configura Shopify para habilitar la búsqueda de productos en este storefront.
          </p>
        </div>
      </main>
    );
  }

  const products = data.products.nodes;

  if (!products.length) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Sin resultados</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">La tienda aún no tiene productos activos</h1>
          <p className="mt-4 text-zinc-600">
            Podés consultar por WhatsApp para recibir una recomendación personalizada y cargar el catálogo en Shopify.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={buildWhatsAppUrl("Hola, quiero asesoría porque la tienda aún no tiene productos cargados.")} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white">
              Solicitar asesoría
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Buscar</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">
          {query ? `Resultados para “${query}”` : "Explora nuestros productos"}
        </h1>

        <form method="get" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Busca pintura, materiales o categoría"
            className="w-full rounded-full border border-stone-300 bg-stone-50 px-5 py-3 text-base text-zinc-900 outline-none ring-0 transition focus:border-zinc-500"
          />
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-6 py-3 font-semibold text-white transition hover:bg-zinc-700"
          >
            Buscar
          </button>
        </form>
      </div>

      <div className="mt-10">
        {!products.length ? (
          <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 text-center">
            <p className="text-xl font-bold text-zinc-900">No encontramos resultados</p>
            <p className="mt-2 text-zinc-600">
              Probá con otra palabra clave como “pintura”, “interior”, “exterior” o “revestimiento”.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const price = Number(product.priceRange?.minVariantPrice.amount ?? 0);

              return (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  handle={product.handle}
                  description={product.description}
                  image={product.featuredImage?.url}
                  alt={product.featuredImage?.altText}
                  price={price}
                  tag="SAIT"
                />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
