import { NextResponse } from "next/server";
import { createShopifyCart } from "@/lib/shopify";

type CartLine = {
  merchandiseId: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lines?: CartLine[] };

    if (!Array.isArray(body.lines) || body.lines.length === 0) {
      return NextResponse.json({ error: "Cart lines are required" }, { status: 400 });
    }

    const hasInvalidLine = body.lines.some(
      (line) =>
        typeof line.merchandiseId !== "string" ||
        !line.merchandiseId.startsWith("gid://shopify/ProductVariant/") ||
        !Number.isInteger(line.quantity) ||
        line.quantity < 1,
    );

    if (hasInvalidLine) {
      return NextResponse.json({ error: "Invalid Shopify cart line" }, { status: 400 });
    }

    const checkoutUrl = await createShopifyCart(body.lines);
    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create Shopify cart";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}