"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer
      className="py-16 px-6 md:px-12"
      style={{ backgroundColor: "#060e1c" }}
      aria-label="Footer Club Podium"
    >
      {/* Top divider */}
      <div style={{
        height: "1px",
        background: "linear-gradient(to right, transparent, #0038A8, #CCFF00, transparent)",
        marginBottom: "4rem",
      }} />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          {/* Logo PNG */}
          <Image
            src="/logo-podium.png"
            alt="Club Podium"
            width={150}
            height={50}
            style={{ objectFit: "contain", height: "40px", width: "auto" }}
          />

          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#7a92b8", maxWidth: "260px", lineHeight: 1.6 }}>
            Todos tenemos un podium,<br />el tuyo está aquí arriba.
          </p>

          {/* Social */}
          <a
            href="https://www.instagram.com/clubpodiumocana"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#0038A8", letterSpacing: "0.05em" }}
            className="hover:text-white transition-colors duration-200"
          >
            @clubpodiumocana
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-x-16 gap-y-3">
          {["Instalaciones", "Torneos", "Horarios", "Reservas"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: "13px", color: "#7a92b8", letterSpacing: "0.06em" }}
              className="uppercase hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-3">
          <a
            href="https://wa.me/message/TNQRBXWZJWAML1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-sm uppercase tracking-wider transition-all duration-200"
            style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "#CCFF00", color: "#060e1c" }}
          >
            <span>WhatsApp</span><span>→</span>
          </a>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "#7a92b8", textAlign: "center" }}>
            Ocaña, Norte de Santander
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto mt-14 pt-6" style={{ borderTop: "1px solid rgba(0,56,168,0.15)" }}>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#2a3a52", textAlign: "center" }}>
          © {new Date().getFullYear()} Club Podium. Todos los derechos reservados. · Ocaña, Norte de Santander
        </p>
      </div>
    </footer>
  );
}