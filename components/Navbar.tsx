"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-3 flex items-center justify-between transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(6,14,28,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,56,168,0.3)" : "none",
      }}
    >
      {/* ── LOGO ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Image
          src="/logo-podium.png"
          alt="Club Podium"
          width={160}
          height={52}
          priority
          style={{ objectFit: "contain", height: "42px", width: "auto" }}
        />
      </motion.div>

      {/* ── Nav links desktop ── */}
      <motion.div
        className="hidden md:flex items-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {["Instalaciones", "Torneos", "Reservas"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "12px",
              color: "rgba(240,244,255,0.55)",
              letterSpacing: "0.1em",
            }}
            className="uppercase hover:text-white transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </motion.div>

      {/* ── CTA ── */}
      <motion.button
        id="navbar-reservar-btn"
        className="rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-200"
        style={{
          fontFamily: "var(--font-dm-sans)",
          backgroundColor: "#CCFF00",
          color: "#060e1c",
          letterSpacing: "0.08em",
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        whileHover={{ scale: 1.04, backgroundColor: "#B8E600" }}
        whileTap={{ scale: 0.97 }}
      >
        Reservar pista
      </motion.button>
    </nav>
  );
}