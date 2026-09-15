"use client";

import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppButton({
  message,
  className = "",
  label = "¿Necesitas ayuda? Escríbenos",
  compact = false,
}: {
  message?: string;
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  const url = buildWhatsAppUrl(message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 text-white shadow-lg transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-300",
        compact ? "h-14 w-14" : "px-5 py-3",
        className,
      ].join(" ")}
    >
      <span aria-hidden="true" className="text-2xl leading-none">✆</span>
      {!compact ? <span className="font-semibold">{label}</span> : null}
    </a>
  );
}
