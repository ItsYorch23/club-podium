"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroCanvas from "@/components/HeroCanvas";
import Footer from "@/components/Footer";

// ─── Types ───────────────────────────────────────────────
interface Court {
  id: string;
  title: string;
  description: string;
  imgDay: string;
  imgNeon: string;
}
interface Stat { id: string; number: string; label: string; description: string; }
interface Step { id: string; num: string; title: string; description: string; }
interface Torneo { id: string; name: string; date: string; categories: string[]; prize: string; status: "proximo" | "inscripcion" | "finalizado"; }
interface Tarifa { id: string; tipo: string; hora: string; precio1h: string; precio2h: string; }
interface Resultado { id: string; torneo: string; campeon: string; subcampeon: string; fecha: string; }

// ─── Data ────────────────────────────────────────────────
const courts: Court[] = [
  {
    id: "cancha-1",
    title: "Cancha 1",
    description: "Cancha oficial del recinto Club Podium. Iluminación profesional para jugar de día y de noche.",
    imgDay: "/canchas/cancha1-dia.png",
    imgNeon: "/canchas/cancha1-neon.png",
  },
  {
    id: "cancha-2",
    title: "Cancha 2",
    description: "Segunda cancha oficial del recinto Club Podium. Mismo estándar profesional, disponible para reserva.",
    imgDay: "/canchas/cancha2-dia.png",
    imgNeon: "/canchas/cancha2-neon.png",
  },
];

const stats: Stat[] = [
  { id: "s1", number: "2", label: "Canchas oficiales", description: "Cancha 1 y Cancha 2 disponibles" },
  { id: "s2", number: "3K+", label: "Jugadores activos", description: "Comunidad creciente en Ocaña" },
  { id: "s3", number: "20", label: "Torneos al año", description: "Competición de todos los niveles" },
];

const steps: Step[] = [
  { id: "st1", num: "01", title: "Reserva tu cancha", description: "Elige horario en segundos por WhatsApp o app." },
  { id: "st2", num: "02", title: "Llega al club", description: "Acceso rápido, vestuarios premium listos." },
  { id: "st3", num: "03", title: "Juega y mejora", description: "Entrena o compite con análisis en directo." },
  { id: "st4", num: "04", title: "Vive el pádel", description: "Torneos, comunidad y competición federada." },
];

const torneos: Torneo[] = [
  {
    id: "t1", name: "Torneo Santo", date: "15 Abril 2025",
    categories: ["5ta Alta", "5ta", "6ta"],
    prize: "Campeón 5ta Alta: $1.200.000 · 5ta: $800.000 · 6ta: $600.000",
    status: "inscripcion",
  },
  {
    id: "t2", name: "Torneo Apertura Podium", date: "10 Mayo 2025",
    categories: ["4ta", "5ta", "6ta"],
    prize: "Premios por confirmar",
    status: "proximo",
  },
  {
    id: "t3", name: "Torneo Nocturno", date: "20 Junio 2025",
    categories: ["5ta Alta", "6ta"],
    prize: "Premios por confirmar",
    status: "proximo",
  },
];

const resultados: Resultado[] = [
  { id: "r1", torneo: "Torneo Barrio Libre", campeon: "Dupla A", subcampeon: "Dupla B", fecha: "Feb 2025" },
  { id: "r2", torneo: "Torneo Weekend", campeon: "Dupla C", subcampeon: "Dupla D", fecha: "Mar 2025" },
];

const tarifas: Tarifa[] = [
  { id: "tar1", tipo: "Day Match", hora: "6:00 AM – 6:00 PM", precio1h: "$60.000", precio2h: "$100.000" },
  { id: "tar2", tipo: "Night Match", hora: "7:00 PM – 10:00 PM", precio1h: "$80.000", precio2h: "$140.000" },
];

const statusConfig = {
  inscripcion: { label: "Inscripciones abiertas", color: "#CCFF00", bg: "rgba(204,255,0,0.1)" },
  proximo: { label: "Próximamente", color: "#0038A8", bg: "rgba(0,56,168,0.15)" },
  finalizado: { label: "Finalizado", color: "#7a92b8", bg: "rgba(122,146,184,0.1)" },
};

// ─── Variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (d: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (d: number = 0) => ({ opacity: 1, transition: { duration: 0.65, ease: "easeOut", delay: d } }),
};

// ─── Helpers ─────────────────────────────────────────────
function GridLines() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `
        linear-gradient(rgba(0,56,168,0.07) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,56,168,0.07) 1px, transparent 1px)
      `,
      backgroundSize: "72px 72px",
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
    }} />
  );
}
function GlowBlue({ className }: { className?: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`}
    style={{ background: "radial-gradient(circle, rgba(0,56,168,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />;
}
function GlowYellow({ className }: { className?: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`}
    style={{ background: "radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 70%)", filter: "blur(70px)" }} />;
}
function Divider() {
  return <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #0038A8, #CCFF00, transparent)" }} />;
}
function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <motion.p className="uppercase tracking-[0.28em] mb-3"
      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00" }}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeIn}>
      {num} — {label}
    </motion.p>
  );
}

// ─── Court Card con toggle día/neon ──────────────────────
function CourtCard({ court, index }: { court: Court; index: number }) {
  const [isNeon, setIsNeon] = useState(false);

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={index * 0.12}
      variants={fadeUp}
    >
      {/* ── Foto con transición día/neon ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "240px" }}>

        {/* Imagen de día */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: isNeon ? 0 : 1, zIndex: 1 }}
        >
          <Image
            src={court.imgDay}
            alt={`${court.title} día`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Imagen de neon */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: isNeon ? 1 : 0, zIndex: 2 }}
        >
          <Image
            src={court.imgNeon}
            alt={`${court.title} neon`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay gradiente bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to top, #0d1e38, transparent)" }} />

        {/* Badge modo activo */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-dm-sans)",
              backgroundColor: isNeon ? "rgba(0,240,255,0.15)" : "rgba(204,255,0,0.15)",
              color: isNeon ? "#00f0ff" : "#CCFF00",
              border: `1px solid ${isNeon ? "rgba(0,240,255,0.4)" : "rgba(204,255,0,0.4)"}`,
              transition: "all 0.4s ease",
            }}
          >
            {isNeon ? "⚡ Neon" : "☀ Día"}
          </span>
        </div>
      </div>

      {/* ── Contenido ── */}
      <div className="p-8 flex flex-col gap-4 flex-1">
        {/* Número + título */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-5xl font-bold select-none block leading-none mb-2"
              style={{ fontFamily: "var(--font-playfair)", color: "rgba(0,56,168,0.25)" }}>
              {index + 1}
            </span>
            <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 800 }}>
              {court.title}
            </h3>
          </div>

          {/* ── Toggle día / neon ── */}
          <button
            onClick={() => setIsNeon(!isNeon)}
            className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 flex-shrink-0"
            style={{
              backgroundColor: isNeon ? "rgba(0,240,255,0.1)" : "rgba(204,255,0,0.08)",
              border: `1px solid ${isNeon ? "rgba(0,240,255,0.35)" : "rgba(204,255,0,0.3)"}`,
            }}
          >
            {/* Track */}
            <div className="relative w-10 h-5 rounded-full transition-all duration-300"
              style={{ backgroundColor: isNeon ? "rgba(0,240,255,0.3)" : "rgba(204,255,0,0.2)" }}>
              <motion.div
                className="absolute top-0.5 w-4 h-4 rounded-full"
                animate={{ left: isNeon ? "calc(100% - 18px)" : "2px" }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{ backgroundColor: isNeon ? "#00f0ff" : "#CCFF00" }}
              />
            </div>
            <span style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: isNeon ? "#00f0ff" : "#CCFF00",
              transition: "color 0.3s ease",
            }} className="uppercase">
              {isNeon ? "Neon" : "Día"}
            </span>
          </button>
        </div>

        <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
          {court.description}
        </p>

        {/* Neon tag extra */}
        {isNeon && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(0,240,255,0.6)" }}
          >
            ⚡ Modo neon activo — pádel con luces de neón para una experiencia única de noche.
          </motion.p>
        )}

        {/* CTA */}
        <motion.a
          href="#reservas"
          className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest pt-4"
          style={{
            fontFamily: "var(--font-dm-sans)",
            color: isNeon ? "#00f0ff" : "#CCFF00",
            borderTop: `1px solid ${isNeon ? "rgba(0,240,255,0.15)" : "rgba(204,255,0,0.1)"}`,
            transition: "color 0.4s ease, border-color 0.4s ease",
          }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <span>Reservar {court.title}</span><span>→</span>
        </motion.a>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
  const statsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const [formData, setFormData] = useState({ nombre: "", telefono: "", fecha: "", cancha: "", turno: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const msg = `Hola Club Podium! Me llamo ${formData.nombre}, quiero reservar la ${formData.cancha} el ${formData.fecha} en el turno ${formData.turno}. ${formData.mensaje}`;
    window.open(`https://wa.me/message/TNQRBXWZJWAML1?text=${encodeURIComponent(msg)}`, "_blank");
    setFormSent(true);
  };

  return (
    <main style={{ backgroundColor: "#0a1628" }}>
      <Navbar />
      <HeroCanvas />
      <Divider />

      {/* ── INSTALACIONES ── */}
      <section id="instalaciones" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
        <GridLines />
        <GlowBlue className="w-[500px] h-[500px] -top-32 -left-32" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
            <div>
              <SectionLabel num="01" label="Instalaciones" />
              <motion.h2 className="text-6xl md:text-7xl leading-[1.0]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                Nuestras<br /><em style={{ color: "#CCFF00" }}>canchas.</em>
              </motion.h2>
            </div>
            <motion.p className="max-w-xs text-sm leading-relaxed md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.2}>
              El recinto Club Podium cuenta con 2 canchas profesionales. Activa el modo <span style={{ color: "#00f0ff" }}>⚡ Neon</span> para ver cómo se ven de noche.
            </motion.p>
          </div>

          {/* 2 Court Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {courts.map((court, i) => (
              <CourtCard key={court.id} court={court} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── STATS ── */}
      <section id="estadisticas" ref={statsRef} className="relative py-32 px-6 md:px-12 overflow-hidden"
        style={{ backgroundColor: "#060e1c" }}>
        <GlowBlue className="w-[700px] h-[400px] top-0 right-0 translate-x-1/3 -translate-y-1/4" />
        <GlowYellow className="w-[350px] h-[350px] bottom-0 left-1/4" />
        <motion.div className="max-w-6xl mx-auto relative z-10" style={{ y: statsY }}>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "rgba(0,56,168,0.2)" }}>
            {stats.map((stat, i) => (
              <motion.div key={stat.id} className="flex flex-col py-16 md:py-0 px-10 first:pl-0 last:pr-0"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                custom={i * 0.15} variants={fadeUp}>
                <span className="text-7xl md:text-8xl leading-none mb-3"
                  style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#CCFF00" }}>
                  {stat.number}
                </span>
                <span className="text-white text-xl mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>
                  {stat.label}
                </span>
                <span className="text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                  {stat.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Divider />

      {/* ── TORNEOS ── */}
      <section id="torneos" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
        <GridLines />
        <GlowBlue className="w-[600px] h-[600px] -top-40 right-0 translate-x-1/3" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
            <div>
              <SectionLabel num="02" label="Torneos" />
              <motion.h2 className="text-6xl md:text-7xl leading-[1.0]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                Compite.<br /><em style={{ color: "#CCFF00" }}>Gana.</em>
              </motion.h2>
            </div>
            <motion.p className="max-w-sm text-sm leading-relaxed md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.2}>
              Torneos para todos los niveles con premiaciones en efectivo. Inscríbete y demuestra de qué estás hecho.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {torneos.map((torneo, i) => {
              const s = statusConfig[torneo.status];
              return (
                <motion.div key={torneo.id}
                  className="relative rounded-2xl p-8 flex flex-col gap-4 overflow-hidden"
                  style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  custom={i * 0.12} variants={fadeUp}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold"
                      style={{ fontFamily: "var(--font-dm-sans)", color: s.color, backgroundColor: s.bg }}>
                      {s.label}
                    </span>
                    <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      {torneo.date}
                    </span>
                  </div>
                  <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
                    {torneo.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {torneo.categories.map((cat) => (
                      <span key={cat} className="text-xs px-2 py-1 rounded"
                        style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "rgba(0,56,168,0.2)", color: "#7a92b8", border: "1px solid rgba(0,56,168,0.3)" }}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t" style={{ borderColor: "rgba(0,56,168,0.2)" }}>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      🏆 {torneo.prize}
                    </p>
                  </div>
                  {torneo.status === "inscripcion" && (
                    <motion.a href="https://wa.me/message/TNQRBXWZJWAML1" target="_blank" rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-bold uppercase tracking-wider"
                      style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "#CCFF00", color: "#060e1c" }}
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      Inscribirme →
                    </motion.a>
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div className="rounded-2xl p-8 md:p-12 mb-16"
            style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-white text-2xl mb-8" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
              ¿Cómo inscribirse?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { num: "1", title: "Escríbenos", desc: "Contáctanos por WhatsApp con tu nombre y categoría." },
                { num: "2", title: "Confirma tu cupo", desc: "Te informamos disponibilidad y realizas el pago del kit." },
                { num: "3", title: "¡A jugar!", desc: "Recibe tu kit competidor y compite por los premios." },
              ].map((s) => (
                <div key={s.num} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{ backgroundColor: "#CCFF00", color: "#060e1c" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 800, fontSize: "13px" }}>{s.num}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>{s.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-white text-2xl mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
              Resultados anteriores
            </h3>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,56,168,0.25)" }}>
              <div className="grid grid-cols-4 px-6 py-3"
                style={{ backgroundColor: "rgba(0,56,168,0.2)", borderBottom: "1px solid rgba(0,56,168,0.25)" }}>
                {["Torneo", "Campeón", "Subcampeón", "Fecha"].map((h) => (
                  <span key={h} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00", letterSpacing: "0.15em" }} className="uppercase">
                    {h}
                  </span>
                ))}
              </div>
              {resultados.map((r, i) => (
                <div key={r.id} className="grid grid-cols-4 px-6 py-4"
                  style={{ backgroundColor: i % 2 === 0 ? "#0d1e38" : "#0a1628", borderBottom: "1px solid rgba(0,56,168,0.1)" }}>
                  <span className="text-white text-sm font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>{r.torneo}</span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "#CCFF00" }}>🥇 {r.campeon}</span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>🥈 {r.subcampeon}</span>
                  <span className="text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{r.fecha}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Divider />

      {/* ── EXPERIENCIA ── */}
      <section id="experiencia" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#060e1c" }}>
        <GridLines />
        <GlowBlue className="w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20">
            <SectionLabel num="03" label="Experiencia" />
            <motion.h2 className="text-6xl md:text-7xl leading-[1.0]"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
              Así<br /><em style={{ color: "#CCFF00" }}>funciona.</em>
            </motion.h2>
          </div>
          <div className="relative">
            <motion.div className="hidden lg:block absolute top-[22px] left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, #0038A8, rgba(204,255,0,0.4))" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              {steps.map((step, i) => (
                <motion.div key={step.id} className="flex flex-col"
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                  custom={i * 0.15} variants={fadeUp}>
                  <div className="hidden lg:flex items-center mb-10">
                    <div className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: "#CCFF00", boxShadow: "0 0 14px rgba(204,255,0,0.7)" }} />
                  </div>
                  <span className="text-7xl leading-none mb-4 select-none"
                    style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "rgba(0,56,168,0.18)" }}>
                    {step.num}
                  </span>
                  <h3 className="text-white text-xl mb-3" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── RESERVAS ── */}
      <section id="reservas" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
        <GridLines />
        <GlowYellow className="w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
            <div>
              <SectionLabel num="04" label="Reservas" />
              <motion.h2 className="text-6xl md:text-7xl leading-[1.0]"
                style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                Reserva tu<br /><em style={{ color: "#CCFF00" }}>cancha.</em>
              </motion.h2>
            </div>
            <motion.p className="max-w-sm text-sm leading-relaxed md:text-right"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.2}>
              Reserva en segundos. Elige tu cancha, horario y turno. Sin complicaciones.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-6">
              <motion.div className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(0,56,168,0.25)" }}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="px-8 py-5"
                  style={{ backgroundColor: "rgba(0,56,168,0.2)", borderBottom: "1px solid rgba(0,56,168,0.25)" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "18px" }}>
                    Horarios y Tarifas
                  </span>
                </div>
                {tarifas.map((tarifa, i) => (
                  <div key={tarifa.id} className="px-8 py-6"
                    style={{ backgroundColor: i % 2 === 0 ? "#0d1e38" : "#0a1628", borderBottom: i < tarifas.length - 1 ? "1px solid rgba(0,56,168,0.15)" : "none" }}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                        {tarifa.tipo}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "rgba(0,56,168,0.2)", color: "#7a92b8", border: "1px solid rgba(0,56,168,0.3)" }}>
                        {tarifa.hora}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "rgba(0,56,168,0.15)", border: "1px solid rgba(0,56,168,0.25)" }}>
                        <p className="text-xs mb-1 uppercase tracking-widest" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>1 Hora</p>
                        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>{tarifa.precio1h}</p>
                      </div>
                      <div className="rounded-xl p-4 text-center" style={{ backgroundColor: "rgba(204,255,0,0.06)", border: "1px solid rgba(204,255,0,0.15)" }}>
                        <p className="text-xs mb-1 uppercase tracking-widest" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>2 Horas</p>
                        <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>{tarifa.precio2h}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="px-8 py-4" style={{ backgroundColor: "#0d1e38" }}>
                  <p className="text-xs italic" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                    * Todos tenemos un podium, el tuyo está aquí arriba.
                  </p>
                </div>
              </motion.div>

              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.2}>
                <a href="https://wa.me/message/TNQRBXWZJWAML1" target="_blank" rel="noopener noreferrer"
                  className="rounded-2xl p-6 flex items-center gap-4 transition-all duration-200"
                  style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(37,211,102,0.15)", border: "1px solid rgba(37,211,102,0.3)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.118 1.528 5.855L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.502-5.175-1.381l-.371-.22-3.762.893.952-3.658-.242-.378A9.944 9.944 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-playfair)" }}>WhatsApp</p>
                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Reserva al instante</p>
                  </div>
                </a>
                <a href="https://www.instagram.com/clubpodiumocana" target="_blank" rel="noopener noreferrer"
                  className="rounded-2xl p-6 flex items-center gap-4 transition-all duration-200"
                  style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(225,48,108,0.12)", border: "1px solid rgba(225,48,108,0.25)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" stroke="none" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm" style={{ fontFamily: "var(--font-playfair)" }}>Instagram</p>
                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>@clubpodiumocana</p>
                  </div>
                </a>
              </motion.div>
            </div>

            {/* Formulario */}
            <motion.div className="rounded-2xl p-8 md:p-10"
              style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.15}>
              <h3 className="text-white text-2xl mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>
                Enviar solicitud
              </h3>
              <p className="text-sm mb-8" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                Completa el formulario y te contactamos por WhatsApp para confirmar tu reserva.
              </p>

              {formSent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(204,255,0,0.1)", border: "2px solid #CCFF00" }}>
                    <span style={{ fontSize: "28px" }}>✓</span>
                  </div>
                  <p className="text-white text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>
                    ¡Redirigiendo a WhatsApp!
                  </p>
                  <p className="text-sm text-center" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                    Confirma tu reserva en el chat que se abrió.
                  </p>
                  <button onClick={() => setFormSent(false)}
                    className="text-xs uppercase tracking-widest mt-2"
                    style={{ fontFamily: "var(--font-dm-sans)", color: "#CCFF00" }}>
                    Nueva reserva
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2"
                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      Nombre completo
                    </label>
                    <input type="text" value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none"
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2"
                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      Teléfono / WhatsApp
                    </label>
                    <input type="tel" value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="Tu número"
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none"
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                        Cancha
                      </label>
                      <select value={formData.cancha}
                        onChange={(e) => setFormData({ ...formData, cancha: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-white outline-none"
                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.15)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }}>
                        <option value="">Seleccionar</option>
                        <option value="Cancha 1">Cancha 1</option>
                        <option value="Cancha 2">Cancha 2</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-2"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                        Fecha
                      </label>
                      <input type="date" value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 text-white outline-none"
                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2"
                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      Turno
                    </label>
                    <select value={formData.turno}
                      onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                      className="w-full rounded-xl px-4 py-3 text-white outline-none"
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.15)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }}>
                      <option value="">Seleccionar turno</option>
                      <option value="Day Match (6:00 AM – 6:00 PM)">Day Match — 6:00 AM a 6:00 PM</option>
                      <option value="Night Match (7:00 PM – 10:00 PM)">Night Match — 7:00 PM a 10:00 PM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2"
                      style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                      Mensaje adicional (opcional)
                    </label>
                    <textarea value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="¿Alguna preferencia o comentario?"
                      rows={3}
                      className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none resize-none"
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                  </div>
                  <motion.button onClick={handleSubmit}
                    className="w-full rounded-xl py-4 font-bold uppercase tracking-wider text-sm mt-2"
                    style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "#CCFF00", color: "#060e1c" }}
                    whileHover={{ scale: 1.02, backgroundColor: "#B8E600" }}
                    whileTap={{ scale: 0.98 }}>
                    Enviar por WhatsApp →
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}