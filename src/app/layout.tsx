import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-context";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/whatsapp/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAIC Comercializadora",
  description: "Pinturas y materiales para construcción y remodelación. Storefront headless de SAIC Comercializadora.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 text-zinc-900">
        <CartProvider>
          <div className="min-h-screen bg-transparent">
            <Header />
            <div>{children}</div>
            <Footer />
          </div>
          <div className="fixed bottom-5 right-5 z-50">
            <WhatsAppButton label="¿Necesitas ayuda? Escríbenos" />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
