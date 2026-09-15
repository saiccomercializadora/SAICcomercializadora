# SAIC Comercializadora storefront

Storefront headless en Next.js para SAIC Comercializadora, conectada a Shopify Storefront API.

## Variables de entorno

Crea un archivo `.env.local` a partir de `.env.example` y completa los valores reales:

```bash
SHOPIFY_STORE_DOMAIN=0hiwfi-ps.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=tu_token_storefront
SHOPIFY_ADMIN_API_ACCESS_TOKEN=tu_token_admin
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola, estoy interesado en los productos de SAIC Comercializadora. Quisiera recibir más información."
```

Importante:
- Nunca expongas tokens privados en el navegador.
- Los valores de Shopify de tipo admin deben permanecer en servidor.
- Solo `NEXT_PUBLIC_*` son accesibles en cliente.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Deploy en Vercel

1. Subí este repositorio a GitHub.
2. Conecta el proyecto en Vercel.
3. Configura las mismas variables de entorno en el dashboard de Vercel.
4. Haz deploy.
5. Usa la URL pública como `NEXT_PUBLIC_SITE_URL`.

## Producción

- El proyecto ya está preparado para despliegue con `next build`.
- La configuración actual usa Shopify Storefront API y una capa de fallback segura si no hay credenciales definidas.
