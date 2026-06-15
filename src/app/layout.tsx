import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Forbody Academia | Planos, Unidades e Treinos",
  description:
    "Conheça a Forbody Academia: planos Red e Black, unidades, aulas coletivas, musculação, professores presentes e estrutura completa para sua evolução.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Forbody Academia | Planos, Unidades e Treinos",
    description:
      "Planos Red e Black, unidades, aulas coletivas, musculação e estrutura completa para sua evolução.",
    type: "website",
    locale: "pt_BR",
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
