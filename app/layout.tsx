import type { Metadata, Viewport } from "next";
import { Anton, Archivo } from "next/font/google";
import "./globals.css";

const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: "400" });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecoos Company: tráfego pago, CRM, treinamento comercial e SEO",
  description:
    "Não oferecemos serviços, entregamos resultados. Agência de crescimento com mais de 70 empresas aceleradas.",
};

export const viewport: Viewport = { themeColor: "#050307" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
