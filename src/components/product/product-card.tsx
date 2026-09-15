import Link from "next/link";

type ProductCardProps = {
  title: string;
  handle: string;
  description?: string;
  image?: string;
  alt?: string;
  price?: number;
  tag?: string;
};

export function ProductCard({
  title,
  handle,
  description,
  image,
  alt,
  price,
  tag = "SAIT",
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${handle}`}
      className="group overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={image || "https://placehold.co/600x400/ddd/aaa?text=SAIT"}
          alt={alt || title}
          className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-800 backdrop-blur-sm">
          {tag}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Línea profesional</p>
        <h3 className="mt-2 text-xl font-bold text-zinc-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          {description?.trim() ? description.slice(0, 110) : "Producto de SAIC Comercializadora para proyectos de construcción y remodelación."}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-lg font-bold text-zinc-900">
            {typeof price === "number" ? `$${price.toFixed(2)}` : "Consultar precio"}
          </span>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800">
            Ver
          </span>
        </div>
      </div>
    </Link>
  );
}
