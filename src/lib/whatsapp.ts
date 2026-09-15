export const whatsappConfig = {
  number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  defaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Hola, estoy interesado en los productos de SAIC Comercializadora. Quisiera recibir más información.",
};

export function buildWhatsAppUrl(message?: string, phoneNumber = whatsappConfig.number) {
  const normalizedNumber = phoneNumber.replace(/\s|[-()]/g, "");
  const finalMessage = encodeURIComponent(message?.trim() || whatsappConfig.defaultMessage);

  return `https://wa.me/${normalizedNumber}?text=${finalMessage}`;
}

export function buildProductWhatsAppMessage(productName: string, productUrl?: string) {
  const suffix = productUrl ? ` URL: ${productUrl}` : "";
  return `Hola, estoy interesado en ${productName}. Quisiera conocer el precio y disponibilidad.${suffix}`;
}
