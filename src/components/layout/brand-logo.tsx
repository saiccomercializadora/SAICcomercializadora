type BrandLogoProps = {
  className?: string;
  compact?: boolean;
};

export function BrandLogo({ className = "", compact = false }: BrandLogoProps) {
  const imageSrc = "/saic comercializadora.jpeg";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={imageSrc}
        alt="SAIC Comercializadora"
        className={compact ? "h-10 w-auto object-contain" : "h-12 w-auto object-contain shadow-sm ring-1 ring-stone-200"}
      />

      {!compact ? (
        <div>
          <p className="text-lg font-black tracking-tight text-zinc-900">SAIC</p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-zinc-500">Comercializadora</p>
        </div>
      ) : null}
    </div>
  );
}
