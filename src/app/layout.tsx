import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Restaurant Growth | Marketing Package",
  description: "Conteúdo que dá vontade de conhecer + tráfego que coloca seu restaurante na frente das pessoas certas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-[#0F172A] text-slate-50 selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
