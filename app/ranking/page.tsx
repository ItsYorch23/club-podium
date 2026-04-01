"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { getCategoriaByElo, getConfigCategoria, CATEGORIAS } from "@/lib/categorias";

// ─── Types ───────────────────────────────────────────────
interface Jugador {
    id: string;
    nombre: string;
    elo: number;
    categoria: string;
    ganados: number;
    perdidos: number;
    elo_previo?: number;
}

interface PosicionRanking {
    jugador: Jugador;
    posicion: number;
    variacion: number;
}

// ─── Helpers visuales ────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (d: number = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
    }),
};

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
    return (
        <div className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ background: "radial-gradient(circle, rgba(0,56,168,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />
    );
}

function Divider() {
    return <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #0038A8, #CCFF00, transparent)" }} />;
}

function CategoriaBadge({ elo, categoria }: { elo: number; categoria: string }) {
    const config = getConfigCategoria(getCategoriaByElo(elo));
    return (
        <span className="text-xs px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
            style={{
                fontFamily: "var(--font-dm-sans)",
                color: config.color,
                backgroundColor: config.bg,
                border: `1px solid ${config.color}40`,
            }}>
            {categoria}
        </span>
    );
}

function Variacion({ valor }: { valor: number }) {
    if (valor === 0) return (
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "12px", color: "var(--color-muted)" }}>—</span>
    );
    const subio = valor > 0;
    return (
        <span className="flex items-center gap-1 text-xs font-bold"
            style={{ fontFamily: "var(--font-dm-sans)", color: subio ? "#CCFF00" : "#ef4444" }}>
            {subio ? "↑" : "↓"} {Math.abs(valor)}
        </span>
    );
}

function Medalla({ pos }: { pos: number }) {
    if (pos === 1) return <span style={{ fontSize: "18px" }}>🥇</span>;
    if (pos === 2) return <span style={{ fontSize: "18px" }}>🥈</span>;
    if (pos === 3) return <span style={{ fontSize: "18px" }}>🥉</span>;
    return (
        <span className="text-sm font-bold w-7 text-center"
            style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
            {pos}
        </span>
    );
}

function BarraElo({ elo, max }: { elo: number; max: number }) {
    const pct = Math.min(100, Math.round((elo / max) * 100));
    const config = getConfigCategoria(getCategoriaByElo(elo));
    return (
        <div className="w-full h-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
            <motion.div className="h-1 rounded-full"
                style={{ backgroundColor: config.color, width: `${pct}%` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.1 }} />
        </div>
    );
}

function LoadingDots() {
    return (
        <div className="flex justify-center items-center py-32">
            <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                    <motion.div key={i} className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#CCFF00" }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                ))}
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────
export default function RankingPage() {
    const [jugadores, setJugadores] = useState<Jugador[]>([]);
    const [loading, setLoading] = useState(true);
    const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        async function fetchJugadores() {
            const { data, error } = await supabase
                .from("jugadores")
                .select("id, nombre, elo, categoria, ganados, perdidos, elo_previo")
                .order("elo", { ascending: false });

            if (!error && data) setJugadores(data);
            setLoading(false);
        }
        fetchJugadores();
    }, []);

    const maxElo = jugadores[0]?.elo ?? 2000;

    const ranking: PosicionRanking[] = jugadores.map((j, i) => ({
        jugador: j,
        posicion: i + 1,
        variacion: j.elo_previo !== undefined ? j.elo - j.elo_previo : 0,
    }));

    const rankingFiltrado = ranking.filter((r) => {
        const matchCategoria = filtroCategoria === "todas" || r.jugador.categoria === filtroCategoria;
        const matchBusqueda = r.jugador.nombre.toLowerCase().includes(busqueda.toLowerCase());
        return matchCategoria && matchBusqueda;
    });

    const top3 = ranking.slice(0, 3);

    // Conteo por categoría desde datos reales
    const conteoCategoria = (nombre: string) =>
        jugadores.filter((j) => j.categoria === nombre).length;

    return (
        <main style={{ backgroundColor: "#0a1628" }}>
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-36 pb-20 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#060e1c" }}>
                <GridLines />
                <GlowBlue className="w-[600px] h-[400px] -top-20 left-1/2 -translate-x-1/2" />
                <div className="max-w-6xl mx-auto relative z-10 text-center">
                    <motion.p className="uppercase tracking-[0.28em] mb-4"
                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                        05 — Ranking
                    </motion.p>
                    <motion.h1 className="text-6xl md:text-8xl leading-[1.0] mb-6"
                        style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                        initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}>
                        Ranking<br /><em style={{ color: "#CCFF00" }}>oficial.</em>
                    </motion.h1>
                    <motion.p className="max-w-lg mx-auto text-sm leading-relaxed"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                        La categoría la define el ELO, no la opinión. Cada partido cuenta.
                        Juega, confirma el resultado y sube en el ranking.
                    </motion.p>
                </div>
            </section>

            <Divider />

            {/* ── PODIO TOP 3 ── */}
            <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
                <GlowBlue className="w-[500px] h-[300px] top-0 right-0 translate-x-1/3" />
                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.h2 className="text-2xl mb-12 text-center"
                        style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF" }}
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Top del club
                    </motion.h2>

                    {loading ? <LoadingDots /> : (
                        <div className="flex flex-col md:flex-row items-end justify-center gap-4 max-w-3xl mx-auto">
                            {/* 2do lugar */}
                            {top3[1] && (
                                <motion.div className="flex-1 rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
                                    style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.3)", minHeight: "220px" }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} variants={fadeUp}>
                                    <span style={{ fontSize: "32px" }}>🥈</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                                            {top3[1].jugador.nombre}
                                        </p>
                                        <CategoriaBadge elo={top3[1].jugador.elo} categoria={top3[1].jugador.categoria} />
                                    </div>
                                    <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>
                                        {top3[1].jugador.elo}
                                    </p>
                                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                                        {top3[1].jugador.ganados}V / {top3[1].jugador.perdidos}P
                                    </p>
                                </motion.div>
                            )}

                            {/* 1er lugar */}
                            {top3[0] && (
                                <motion.div className="flex-1 rounded-2xl p-8 flex flex-col items-center gap-3 text-center"
                                    style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(204,255,0,0.3)", minHeight: "270px", boxShadow: "0 0 40px rgba(204,255,0,0.08)" }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
                                    <span style={{ fontSize: "40px" }}>🥇</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white font-bold text-xl" style={{ fontFamily: "var(--font-playfair)" }}>
                                            {top3[0].jugador.nombre}
                                        </p>
                                        <CategoriaBadge elo={top3[0].jugador.elo} categoria={top3[0].jugador.categoria} />
                                    </div>
                                    <p className="text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>
                                        {top3[0].jugador.elo}
                                    </p>
                                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                                        {top3[0].jugador.ganados}V / {top3[0].jugador.perdidos}P
                                    </p>
                                    <span className="text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold"
                                        style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "rgba(204,255,0,0.12)", color: "#CCFF00", border: "1px solid rgba(204,255,0,0.3)" }}>
                                        Líder del club
                                    </span>
                                </motion.div>
                            )}

                            {/* 3er lugar */}
                            {top3[2] && (
                                <motion.div className="flex-1 rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
                                    style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.3)", minHeight: "200px" }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.2} variants={fadeUp}>
                                    <span style={{ fontSize: "28px" }}>🥉</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                                            {top3[2].jugador.nombre}
                                        </p>
                                        <CategoriaBadge elo={top3[2].jugador.elo} categoria={top3[2].jugador.categoria} />
                                    </div>
                                    <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>
                                        {top3[2].jugador.elo}
                                    </p>
                                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                                        {top3[2].jugador.ganados}V / {top3[2].jugador.perdidos}P
                                    </p>
                                </motion.div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Divider />

            {/* ── TABLA RANKING COMPLETA ── */}
            <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#060e1c" }}>
                <GridLines />
                <div className="max-w-6xl mx-auto relative z-10">

                    {/* Filtros */}
                    <motion.div className="flex flex-col sm:flex-row gap-4 mb-10"
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <input type="text" placeholder="Buscar jugador..."
                            value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
                            className="rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none flex-1"
                            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                        <div className="flex flex-wrap gap-2">
                            {["todas", ...CATEGORIAS.map((c) => c.nombre)].map((cat) => {
                                const activo = filtroCategoria === cat;
                                const config = cat !== "todas" ? CATEGORIAS.find((c) => c.nombre === cat) : null;
                                return (
                                    <button key={cat} onClick={() => setFiltroCategoria(cat)}
                                        className="text-xs px-3 py-2 rounded-full font-bold uppercase tracking-wider transition-all"
                                        style={{
                                            fontFamily: "var(--font-dm-sans)",
                                            backgroundColor: activo ? (config?.bg ?? "rgba(204,255,0,0.1)") : "rgba(0,56,168,0.08)",
                                            color: activo ? (config?.color ?? "#CCFF00") : "var(--color-muted)",
                                            border: `1px solid ${activo ? (config?.color ?? "#CCFF00") + "60" : "rgba(0,56,168,0.2)"}`,
                                        }}>
                                        {cat === "todas" ? "Todas" : cat}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Tabla */}
                    {loading ? <LoadingDots /> : (
                        <motion.div className="rounded-2xl overflow-hidden"
                            style={{ border: "1px solid rgba(0,56,168,0.25)" }}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.1}>

                            {/* Header */}
                            <div className="hidden md:grid px-6 py-4"
                                style={{ gridTemplateColumns: "56px 1fr 100px 80px 80px 80px 80px", backgroundColor: "rgba(0,56,168,0.2)", borderBottom: "1px solid rgba(0,56,168,0.25)" }}>
                                {["#", "Jugador", "Categoría", "ELO", "V", "P", "±"].map((h) => (
                                    <span key={h} className="uppercase text-center"
                                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00", letterSpacing: "0.15em" }}>
                                        {h}
                                    </span>
                                ))}
                            </div>

                            {/* Filas */}
                            {rankingFiltrado.length === 0 ? (
                                <div className="flex items-center justify-center py-16" style={{ backgroundColor: "#0d1e38" }}>
                                    <p style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)", fontSize: "14px" }}>
                                        No se encontraron jugadores.
                                    </p>
                                </div>
                            ) : (
                                rankingFiltrado.map((entry, i) => {
                                    const { jugador, posicion, variacion } = entry;
                                    const esTop3 = posicion <= 3;
                                    const config = getConfigCategoria(getCategoriaByElo(jugador.elo));
                                    return (
                                        <motion.div key={jugador.id}
                                            className="grid px-6 py-4 items-center"
                                            style={{
                                                gridTemplateColumns: "56px 1fr 100px 80px 80px 80px 80px",
                                                backgroundColor: i % 2 === 0 ? "#0d1e38" : "#0a1628",
                                                borderBottom: "1px solid rgba(0,56,168,0.1)",
                                                borderLeft: esTop3 ? `3px solid ${config.color}` : "3px solid transparent",
                                            }}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: i * 0.04 }}
                                            whileHover={{ backgroundColor: "rgba(0,56,168,0.12)" }}>
                                            <div className="flex justify-center"><Medalla pos={posicion} /></div>
                                            <div className="flex flex-col gap-2 pr-4">
                                                <span className="text-white font-semibold" style={{ fontFamily: "var(--font-playfair)", fontSize: "15px" }}>
                                                    {jugador.nombre}
                                                </span>
                                                <BarraElo elo={jugador.elo} max={maxElo} />
                                            </div>
                                            <div className="flex justify-center">
                                                <CategoriaBadge elo={jugador.elo} categoria={jugador.categoria} />
                                            </div>
                                            <div className="text-center">
                                                <span className="font-bold text-base" style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00" }}>
                                                    {jugador.elo}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "#4ade80" }}>
                                                    {jugador.ganados}
                                                </span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-dm-sans)", color: "#f87171" }}>
                                                    {jugador.perdidos}
                                                </span>
                                            </div>
                                            <div className="flex justify-center"><Variacion valor={variacion} /></div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </motion.div>
                    )}

                    <motion.p className="text-center mt-6 text-xs"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        {rankingFiltrado.length} jugadores · Datos en tiempo real desde Supabase
                    </motion.p>
                </div>
            </section>

            <Divider />

            {/* ── TABLA DE CATEGORÍAS ── */}
            <section className="relative py-20 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
                <GlowBlue className="w-[400px] h-[400px] bottom-0 left-0 -translate-x-1/3 translate-y-1/4" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div className="text-center mb-12"
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <p className="uppercase tracking-[0.28em] mb-3"
                            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00" }}>
                            Sistema de categorías
                        </p>
                        <h2 className="text-4xl md:text-5xl"
                            style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}>
                            Tu ELO define<br /><em style={{ color: "#CCFF00" }}>tu nivel.</em>
                        </h2>
                    </motion.div>

                    <div className="flex flex-col gap-3">
                        {[...CATEGORIAS].reverse().map((cat, i) => {
                            const count = conteoCategoria(cat.nombre);
                            return (
                                <motion.div key={cat.nombre}
                                    className="flex items-center gap-4 rounded-xl px-6 py-4"
                                    style={{ backgroundColor: "#0d1e38", border: `1px solid ${cat.color}20` }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08} variants={fadeUp}>
                                    <div className="w-3 h-3 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}60` }} />
                                    <span className="font-bold w-20"
                                        style={{ fontFamily: "var(--font-playfair)", fontSize: "18px", color: cat.color }}>
                                        {cat.nombre}
                                    </span>
                                    <span className="flex-1 text-sm"
                                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                                        {cat.min === 0 ? "Hasta" : cat.min} — {cat.max === 9999 ? "Sin límite" : cat.max} ELO
                                    </span>
                                    <span className="text-xs px-3 py-1 rounded-full"
                                        style={{ fontFamily: "var(--font-dm-sans)", color: cat.color, backgroundColor: cat.bg, border: `1px solid ${cat.color}30` }}>
                                        {count} jugador{count !== 1 ? "es" : ""}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}