import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { ProductCard } from "@/components/product/product-card";

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const data = await shopifyFetch<{ collection: { title: string; description?: string } | null }>(`
    query CollectionMeta($handle: String!) {
      collection(handle: $handle) {
        title
        description
      }
    }
  `, { handle });

  if (!data.collection) {
    return {
      title: "Colección | SAIC Comercializadora",
    };
  }

  return {
    title: `${data.collection.title} | SAIC Comercializadora`,
    description: data.collection.description || `Productos y materiales de la colección ${data.collection.title}.`,
    alternates: {
      canonical: `/collections/${handle}`,
    },
  };
}

type CollectionProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

type CollectionData = {
  collection: {
    id: string;
    title: string;
    description?: string;
    handle: string;
    products: {
      nodes: CollectionProduct[];
    };
  } | null;
};

const collectionQuery = `
  query CollectionByHandle($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 20) {
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
  }
`;

export default async function CollectionPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  const data = await shopifyFetch<CollectionData>(collectionQuery, { handle });

  if (!data) {
    return (
      <main className="section-shell py-16 lg:py-20">
        <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white p-10 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">Configuración</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-900">Colección no disponible</h1>
          <p className="mt-4 text-zinc-600">
            Este storefront aún no tiene credenciales de Shopify configuradas. Define SHOPIFY_STOREFRONT_ACCESS_TOKEN para activar esta colección.
          </p>
        </div>
      </main>
    );
  }

  if (!data.collection) {
    notFound();
  }

  const collection = data.collection;

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">Colección</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">{collection.title}</h1>
        {collection.description ? (
          <p className="mt-4 max-w-3xl text-zinc-700">{collection.description}</p>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collection.products.nodes.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            handle={product.handle}
            description={product.description}
            image={product.featuredImage?.url}
            alt={product.featuredImage?.altText}
            price={Number(product.priceRange.minVariantPrice.amount)}
            tag="SAIT"
          />
        ))}
      </div>
    </main>
  );
}
