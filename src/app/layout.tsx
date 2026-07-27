import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://forbodyacademia.com.br"),
  title: "Forbody Academia | Planos, Unidades e Treinos",
  description:
    "Conheça a Forbody Academia: planos Red e Black, unidades, aulas coletivas, musculação, professores presentes e estrutura completa para sua evolução.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Forbody Academia | Planos, Unidades e Treinos",
    description:
      "Planos Red e Black, unidades, aulas coletivas, musculação e estrutura completa para sua evolução.",
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Forbody Academia",
    images: [
      {
        url: "/images/units/triunfo.jpg",
        width: 1200,
        height: 630,
        alt: "Estrutura da Forbody Academia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forbody Academia | Planos, Unidades e Treinos",
    description: "Planos Red e Black, unidades, aulas coletivas e estrutura completa.",
    images: ["/images/units/triunfo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
