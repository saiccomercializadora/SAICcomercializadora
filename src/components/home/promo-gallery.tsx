"use client";

import { useEffect, useState } from "react";

const promos = [
  {
    src: "/promos/promo-pintura-rodillo.png",
    alt: "Promoción de pintura y rodillo",
    title: "Pinturas para obra",
    text: "Cobertura, duración y asesoría profesional para cada superficie.",
  },
  {
    src: "/promos/promo-cementos-materiales.png",
    alt: "Promoción de cementos y materiales",
    title: "Materiales para construcción",
    text: "Soluciones para obra, remodelación y mantenimiento con calidad constante.",
  },
  {
    src: "/promos/promo-4x1.png",
    alt: "Promoción especial 4x1 de SAIC Comercializadora",
    title: "Ofertas para proyectos",
    text: "Consultá por combos y recomendaciones para tu próximo trabajo.",
  },
];

export function PromoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % promos.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const activePromo = promos[activeIndex];

  return (
    <section className="section-shell py-6 lg:py-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">Promociones</p>
        <a href="/collections" className="text-sm font-semibold text-zinc-900 underline-offset-4 hover:underline">
          Ver catálogo
        </a>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div className="relative">
          <img
            src={activePromo.src}
            alt={activePromo.alt}
            className="h-[260px] w-full object-cover md:h-[360px] lg:h-[420px]"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">SAIC</p>
            <h3 className="mt-2 text-2xl font-black md:text-4xl">{activePromo.title}</h3>
            <p className="mt-2 max-w-lg text-sm text-zinc-100 md:text-base">{activePromo.text}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {promos.map((promo, index) => (
          <button
            key={promo.title}
            type="button"
            aria-label={`Ver promoción ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-10 bg-zinc-900" : "w-2.5 bg-stone-300 hover:bg-stone-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
