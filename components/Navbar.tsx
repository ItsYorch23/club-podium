"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Instalaciones", anchor: "instalaciones" },
  { label: "Torneos", anchor: "torneos" },
  { label: "Reservas", anchor: "reservas" },
  { label: "Ranking", anchor: null, href: "/ranking" },
];

const reservaOptions = [
  {
    icon: "💬",
    label: "Reservar por WhatsApp",
    desc: "Respuesta inmediata",
    href: "https://wa.me/message/TNQRBXWZJWAML1",
    external: true,
  },
  {
    icon: "📋",
    label: "Formulario de reserva",
    desc: "Llena los datos y te confirmamos",
    href: "/#reservas",
    external: false,
  },
  {
    icon: "📸",
    label: "Instagram",
    desc: "@clubpodiumocana",
    href: "https://www.instagram.com/clubpodiumocana",
    external: true,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reservaOpen, setReservaOpen] = useState(false);
  const pathname = usePathname();
  const isRanking = pathname === "/ranking";

  const menuRef = useRef<HTMLDivElement>(null);
  const reservaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (reservaRef.current && !reservaRef.current.contains(e.target as Node)) {
        setReservaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getLinkHref = (anchor: string | null, href?: string) => {
    if (href) return href;
    return isRanking ? `/#${anchor}` : `#${anchor}`;
  };

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
        <Link href="/">
          <Image
            src="/logo-podium.png"
            alt="Club Podium"
            width={160}
            height={52}
            priority
            style={{ objectFit: "contain", height: "42px", width: "auto" }}
          />
        </Link>
      </motion.div>

      {/* ── DERECHA: Reservar + Hamburguesa ── */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {/* ── BOTÓN RESERVAR con dropdown ── */}
        <div className="relative" ref={reservaRef}>
          <motion.button
            onClick={() => {
              setReservaOpen((v) => !v);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-dm-sans)",
              backgroundColor: "#CCFF00",
              color: "#060e1c",
              letterSpacing: "0.08em",
            }}
            whileHover={{ scale: 1.04, backgroundColor: "#B8E600" }}
            whileTap={{ scale: 0.97 }}
          >
            Reservar pista
            <motion.span
              animate={{ rotate: reservaOpen ? 180 : 0 }}
              transition={{ duration: 0.22 }}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M2.5 4.5l4 4 4-4"
                  stroke="#060e1c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.button>

          <AnimatePresence>
            {reservaOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#0d1e38",
                  border: "1px solid rgba(204,255,0,0.2)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 30px rgba(204,255,0,0.04)",
                }}
              >
                <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,56,168,0.3)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      color: "#CCFF00",
                      letterSpacing: "0.22em",
                    }}
                    className="uppercase"
                  >
                    Elige cómo reservar
                  </p>
                </div>
                {reservaOptions.map((opt, i) => (
                  <a
                    key={i}
                    href={opt.href}
                    target={opt.external ? "_blank" : undefined}
                    rel={opt.external ? "noopener noreferrer" : undefined}
                    onClick={() => setReservaOpen(false)}
                    className="flex items-center gap-4 px-5 py-4 transition-all duration-200 group"
                    style={{
                      borderBottom:
                        i < reservaOptions.length - 1
                          ? "1px solid rgba(0,56,168,0.12)"
                          : "none",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,56,168,0.2)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                    }
                  >
                    <span style={{ fontSize: "20px" }}>{opt.icon}</span>
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                        {opt.label}
                      </span>
                      <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                        {opt.desc}
                      </span>
                    </div>
                    <span
                      className="ml-auto text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                      style={{ color: "#CCFF00" }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── HAMBURGUESA ── */}
        <div className="relative" ref={menuRef}>
          <motion.button
            onClick={() => {
              setMenuOpen((v) => !v);
              setReservaOpen(false);
            }}
            className="flex flex-col items-center justify-center w-11 h-11 rounded-full"
            style={{
              backgroundColor: menuOpen ? "rgba(0,56,168,0.35)" : "rgba(0,56,168,0.15)",
              border: "1px solid rgba(0,56,168,0.4)",
            }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Menú"
          >
            <div className="flex flex-col gap-[5px] items-center justify-center">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-[2px] w-5 rounded-full"
                style={{ backgroundColor: "#F0F4FF" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.18 }}
                className="block h-[2px] rounded-full"
                style={{ backgroundColor: "#F0F4FF", width: "13px" }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.22 }}
                className="block h-[2px] w-5 rounded-full"
                style={{ backgroundColor: "#F0F4FF" }}
              />
            </div>
          </motion.button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 mt-3 w-52 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: "#0d1e38",
                  border: "1px solid rgba(0,56,168,0.35)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                }}
              >
                <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(0,56,168,0.3)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "10px",
                      color: "var(--color-muted)",
                      letterSpacing: "0.22em",
                    }}
                    className="uppercase"
                  >
                    Navegación
                  </p>
                </div>
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/ranking" && isRanking;
                  const href = getLinkHref(link.anchor, link.href);
                  return (
                    <Link
                      key={link.label}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-5 py-4 transition-all duration-200 group"
                      style={{
                        borderBottom:
                          i < navLinks.length - 1
                            ? "1px solid rgba(0,56,168,0.12)"
                            : "none",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,56,168,0.2)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")
                      }
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          fontSize: "12px",
                          fontWeight: 600,
                          letterSpacing: "0.1em",
                          color: isActive ? "#CCFF00" : "rgba(240,244,255,0.85)",
                        }}
                        className="uppercase"
                      >
                        {link.label}
                      </span>
                      <span
                        className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                        style={{ color: isActive ? "#CCFF00" : "rgba(204,255,0,0.6)" }}
                      >
                        →
                      </span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </nav>
  );
}