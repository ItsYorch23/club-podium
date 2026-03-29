import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Club Podium | El Pádel en su Máximo Nivel",
  description:
    "Club de pádel premium con instalaciones profesionales. Reserva tu cancha hoy y rankéate.",
  keywords: [
    "Club Podium",
    "padel Ocaña",
    "club de padel",
    "canchas de padel",
    "torneos padel",
    "padel premium",
    "padel Norte de Santander",
  ],
  openGraph: {
    title: "Club Podium | El Pádel en su Máximo Nivel",
    description:
      "Club de pádel premium con instalaciones profesionales. Reserva tu pista hoy y rankéate.",
    type: "website",
    url: "https://club-podium.netlify.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="font-body bg-dark text-text antialiased">
        {children}
      </body>
    </html>
  );
}