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
  title: "PadelPrime | El Padel en su Máximo Nivel",
  description:
    "Club de pádel premium con instalaciones profesionales, entrenadores certificados y torneos. Reserva tu pista hoy en PadelPrime.",
  keywords: [
    "padel",
    "club de padel",
    "pistas de padel",
    "torneos padel",
    "padel premium",
  ],
  openGraph: {
    title: "PadelPrime | El Padel en su Máximo Nivel",
    description:
      "Club de pádel premium con instalaciones profesionales. Reserva tu pista hoy.",
    type: "website",
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
