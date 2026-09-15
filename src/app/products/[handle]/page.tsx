import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { shopifyFetch } from "@/lib/shopify";
import { buildProductWhatsAppMessage } from "@/lib/whatsapp";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const data = await shopifyFetch<{ product: { title: string; description?: string } | null }>(`
    query ProductMeta($handle: String!) {
      product(handle: $handle) {
        title
        description
      }
    }
  `, { handle });

  if (!data.product) {
    return {
      title: "Producto | SAIC Comercializadora",
    };
  }

  return {
    title: `${data.product.title} | SAIC Comercializadora`,
    description: data.product.description || `Consulta el producto ${data.product.title} en SAIC Comercializadora.`,
    alternates: {
      canonical: `/products/${handle}`,
    },
  };
}

const productQuery = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
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
      images(first: 10) {
        nodes {
          url
          altText
        }
      }
    }
  }
`;

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  const data = await shopifyFetch<{
    product: {
      id: string;
      title: string;
      description: string;
      handle: string;
      featuredImage?: { url: string; altText?: string };
      variants: { nodes: Array<{ id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string } }> };
      images: { nodes: Array<{ url: string; altText?: string }> };
    } | null;
  }>(productQuery, { handle });

  if (!data) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Configuración</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Producto no disponible</h1>
          <p className="mt-4 text-zinc-600">
            Define las variables de Shopify para activar los productos reales del storefront.
          </p>
        </div>
      </main>
    );
  }

  if (!data.product) {
    notFound();
  }

  const product = data.product;
  const firstVariant = product.variants.nodes[0];
  const firstPrice = Number(firstVariant?.price.amount ?? 0);
  const productUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/products/${product.handle}`;
  const whatsappMessage = buildProductWhatsAppMessage(product.title, productUrl);

  return (
    <main className="section-shell py-16 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
          <img
            src={product.featuredImage?.url || product.images.nodes[0]?.url}
            alt={product.featuredImage?.altText || product.title}
            className="h-[480px] w-full rounded-[1.5rem] object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">SAIT</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">{product.title}</h1>

          <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl bg-stone-50 p-4">
            <div>
              <p className="text-sm text-zinc-500">Precio</p>
              <p className="mt-1 text-3xl font-black text-zinc-900">
                {firstVariant?.price.amount ? `$${firstPrice.toFixed(2)}` : "Consultar precio"}
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              {firstVariant?.availableForSale ? "En stock" : "Consultar"}
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {product.variants.nodes.map((variant) => (
              <div key={variant.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-zinc-800">{variant.title}</span>
                  <span className={`text-sm font-semibold ${variant.availableForSale ? "text-emerald-600" : "text-red-600"}`}>
                    {variant.availableForSale ? "Disponible" : "Sin stock"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {firstVariant ? (
              <AddToCartButton
                variantId={firstVariant.id}
                title={product.title}
                price={firstPrice}
                image={product.featuredImage?.url}
                handle={product.handle}
              />
            ) : null}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-center font-semibold text-zinc-900 transition hover:border-zinc-500"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5">
            <h2 className="text-lg font-bold text-zinc-900">Descripción</h2>
            <div className="mt-3 prose max-w-none text-zinc-700" dangerouslySetInnerHTML={{ __html: product.description || "" }} />
          </div>
        </div>
      </div>
    </main>
  );
}
