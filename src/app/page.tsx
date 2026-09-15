import type { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/product/product-card";
import { PromoGallery } from "@/components/home/promo-gallery";

export const metadata: Metadata = {
  title: "SAIC Comercializadora | Pinturas y materiales",
  description: "Explora productos de pintura y materiales para obra, remodelación y mantenimiento con asesoría comercial de SAIC Comercializadora.",
  alternates: {
    canonical: "/",
  },
};

const featuredProductsQuery = `
  query FeaturedProducts {
    products(first: 4) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        variants(first: 10) {
          nodes {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const categories = [
  { name: "SAIT Tipo 1", href: "/products/pintura-sait-tipo-1", text: "Protección y acabado para interiores y reformas de alto tránsito." },
  { name: "SAIT Tipo 2", href: "/products/pintura-sait-tipo-2", text: "Fórmulas para ambientes exigentes con mejores resultados de cobertura." },
  { name: "Asesoría rápida", href: "/contact", text: "Soluciones para obra, mantenimiento y proyectos de larga duración." },
];

const benefits = [
  { title: "Compra directa", text: "Explora productos y adquiere sin fricción desde tu computadora o celular." },
  { title: "Atención personalizada", text: "Recibe asesoría técnica para elegir el producto ideal según superficie y uso." },
  { title: "Expertise del sector", text: "Recomendaciones orientadas a profesionales, ferreterías y proyectos de construcción." },
];

const steps = [
  "Seleccioná la línea adecuada para tu proyecto",
  "Compará opciones y precios",
  "Confirmá por WhatsApp o compra directa",
];

export default async function HomePage() {
  const data = await shopifyFetch<{ products: { nodes: Array<{ id: string; title: string; handle: string; description?: string; featuredImage?: { url: string; altText?: string }; variants: { nodes: Array<{ id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } }> } }> } }>(featuredProductsQuery);
  const featuredProducts = data?.products?.nodes ?? [];
  const featuredHighlight =
    featuredProducts.find((product) => product.handle === "pintura-sait-tipo-1") ?? featuredProducts[0];
  const featuredPrice = featuredHighlight?.variants.nodes[0]
    ? Number(featuredHighlight.variants.nodes[0].price.amount)
    : 0;

  return (
    <main className="min-h-screen bg-stone-50 text-zinc-900">
      <section className="section-shell grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Pinturas, materiales y soluciones para obra
          </p>
          <h1 className="max-w-xl text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Productos profesionales para construir, reparar y mejorar cada superficie.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-700">
            SAIC Comercializadora acompaña proyectos de obra, remodelación y mantenimiento con productos de alto rendimiento, asesoría técnica y soluciones pensadas para profesionales del sector.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/collections"
              className="rounded-full bg-zinc-900 px-6 py-3 text-center font-semibold text-white transition hover:bg-zinc-700"
            >
              Ver productos
            </Link>
            <a
              href={buildWhatsAppUrl("Hola, quiero asesoría para elegir la pintura adecuada para mi proyecto.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-zinc-900 transition hover:border-zinc-500"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-zinc-600">
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">✔ Calidad profesional</span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">✔ Compra directa</span>
            <span className="rounded-full border border-stone-200 bg-white px-3 py-2">✔ Atención personalizada</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-stone-200 bg-gradient-to-br from-amber-100 via-white to-stone-100 shadow-[0_30px_80px_rgba(24,24,27,0.12)]">
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between px-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800">
                  Producto destacado
                </span>
                <span className="text-sm font-medium text-zinc-500">SAIT</span>
              </div>

              {featuredHighlight ? (
                <Link href={`/products/${featuredHighlight.handle}`} className="block overflow-hidden rounded-[1.5rem] bg-white shadow-inner">
                  <img
                    src={featuredHighlight.featuredImage?.url || "https://placehold.co/800x800/f5f5f4/1f2937?text=SAIT"}
                    alt={featuredHighlight.featuredImage?.altText || featuredHighlight.title}
                    className="h-[360px] w-full object-cover"
                  />
                </Link>
              ) : null}

              <div className="mt-5 space-y-3 px-2 pb-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-500">Línea</span>
                  <span className="text-right font-semibold">{featuredHighlight?.title || "Pintura SAIT"}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-500">Precio</span>
                  <span className="font-semibold">${featuredPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-zinc-500">Proyecto</span>
                  <span className="text-right font-semibold">Obra y remodelación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoGallery />

      <section className="bg-zinc-900 py-16 text-white">
        <div className="section-shell">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Cómo funciona</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Dos caminos para comprar mejor</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Compra directa</p>
              <h3 className="mt-4 text-2xl font-bold">Comprar online</h3>
              <p className="mt-3 text-zinc-300">
                Explorá categorías, elegí productos y avanzá con una experiencia de compra clara y rápida.
              </p>
              <Link href="/collections" className="mt-6 inline-block rounded-full bg-white px-5 py-3 font-semibold text-zinc-900">
                Ver catálogo
              </Link>
            </div>

            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Atención personalizada</p>
              <h3 className="mt-4 text-2xl font-bold">Hablemos por WhatsApp</h3>
              <p className="mt-3 text-zinc-200">
                Te ayudamos a definir el mejor material según la superficie, el clima y la intención del proyecto.
              </p>
              <a
                href={buildWhatsAppUrl("Hola, quiero atención personalizada para un proyecto de pintura y materiales.")}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white"
              >
                Solicitar asesoría
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">Productos destacados</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Líneas que ya están disponibles</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.length ? (
            featuredProducts.map((product) => {
              const firstVariant = product.variants.nodes[0];
              const price = firstVariant ? Number(firstVariant.price.amount) : 0;

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
            })
          ) : (
            <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-8 text-zinc-600 md:col-span-2 xl:col-span-4">
              Aún no hay productos activos publicados en Shopify.
            </div>
          )}
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">Categorías</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Elegí la línea que necesitas</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-lg font-black text-amber-800">
                {category.name.split(" ").slice(-1)[0]}
              </div>
              <h3 className="text-xl font-bold">{category.name}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{category.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="section-shell">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">Beneficios</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">Por qué elegir SAIC Comercializadora</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg text-emerald-700">
                  ✓
                </div>
                <p className="text-xl font-bold">{benefit.title}</p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-20 pt-8">
        <div className="rounded-[2rem] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 text-white shadow-xl md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Proceso simple</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">Comprá o consultá en pocos pasos</h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200">
                  {index + 1}. {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
