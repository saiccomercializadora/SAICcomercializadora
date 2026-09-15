export const shopifyConfig = {
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || "0hiwfi-ps.myshopify.com",
  storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "",
  adminAccessToken: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN || "",
  storefrontApiVersion: "2025-01",
  storefrontApiUrl: `https://${process.env.SHOPIFY_STORE_DOMAIN || "0hiwfi-ps.myshopify.com"}/api/2025-01/graphql.json`,
};

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  if (!shopifyConfig.storefrontAccessToken) {
    return null as T;
  }

  const response = await fetch(shopifyConfig.storefrontApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyConfig.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Shopify Storefront request failed");
  }

  const data = (await response.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (data.errors?.length) {
    throw new Error(data.errors[0].message);
  }

  return data.data as T;
}
