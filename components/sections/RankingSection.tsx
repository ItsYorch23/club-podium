"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, fadeIn, GridLines, GlowBlue, GlowYellow, SectionLabel } from "@/components/ui";
import { supabase } from "@/lib/supabase";

interface Jugador {
    id: string;
    nombre: string;
    elo: number;
    categoria: string;
    ganados: number;
    perdidos: number;
}

export default function RankingSection() {
    const [top3, setTop3] = useState<Jugador[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTop3() {
            const { data, error } = await supabase
                .from("jugadores")
                .select("id, nombre, elo, categoria, ganados, perdidos")
                .order("elo", { ascending: false })
                .limit(3);

            if (!error && data) setTop3(data);
            setLoading(false);
        }
        fetchTop3();
    }, []);

    const medals = ["🥇", "🥈", "🥉"];
    const heights = ["260px", "210px", "190px"];
    const borders = [
        "1px solid rgba(204,255,0,0.35)",
        "1px solid rgba(0,56,168,0.3)",
        "1px solid rgba(0,56,168,0.3)",
    ];
    const shadows = ["0 0 40px rgba(204,255,0,0.07)", "none", "none"];
    const order = [1, 0, 2]; // 1ro en centro, 2do izquierda, 3ro derecha

    return (
        <section id="ranking" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
            <GridLines />
            <GlowBlue className="w-[500px] h-[500px] top-0 left-0 -translate-x-1/3" />
            <GlowYellow className="w-[400px] h-[400px] bottom-0 right-0 translate-x-1/4" />
            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
                    <div>
                        <SectionLabel num="05" label="Ranking" />
                        <motion.h2 className="text-6xl md:text-7xl leading-[1.0]"
                            style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
                            Los mejores<br /><em style={{ color: "#CCFF00" }}>del club.</em>
                        </motion.h2>
                    </div>
                    <motion.p className="max-w-xs text-sm leading-relaxed md:text-right"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} custom={0.2}>
                        El ELO no miente. Cada partido suma o resta. La categoría la define el sistema, no la opinión.
                    </motion.p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div key={i} className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: "#CCFF00" }}
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Podio top 3 */}
                {!loading && top3.length > 0 && (
                    <div className="flex flex-col md:flex-row items-end justify-center gap-4 max-w-3xl mx-auto mb-12">
                        {order.map((idx, col) => {
                            const jugador = top3[idx];
                            if (!jugador) return null;
                            const isFirst = idx === 0;
                            return (
                                <motion.div key={jugador.id}
                                    className="flex-1 rounded-2xl flex flex-col items-center gap-3 text-center"
                                    style={{
                                        backgroundColor: "#0d1e38",
                                        border: borders[idx],
                                        minHeight: heights[idx],
                                        boxShadow: shadows[idx],
                                        padding: isFirst ? "2rem" : "1.5rem",
                                    }}
                                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                                    custom={col * 0.1} variants={fadeUp}>
                                    <span style={{ fontSize: isFirst ? "38px" : "28px" }}>{medals[idx]}</span>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-white font-bold" style={{ fontFamily: "var(--font-playfair)", fontSize: isFirst ? "20px" : "16px" }}>
                                            {jugador.nombre}
                                        </p>
                                        <span className="text-xs px-2 py-0.5 rounded-full self-center"
                                            style={{
                                                fontFamily: "var(--font-dm-sans)",
                                                color: isFirst ? "#CCFF00" : "#7a92b8",
                                                backgroundColor: isFirst ? "rgba(204,255,0,0.1)" : "rgba(122,146,184,0.12)",
                                                border: `1px solid ${isFirst ? "rgba(204,255,0,0.3)" : "rgba(122,146,184,0.25)"}`,
                                            }}>
                                            {jugador.categoria}
                                        </span>
                                    </div>
                                    <p style={{ fontFamily: "var(--font-playfair)", color: "#CCFF00", fontSize: isFirst ? "2.25rem" : "1.875rem", fontWeight: 700 }}>
                                        {jugador.elo}
                                    </p>
                                    <p className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                                        {jugador.ganados}V · {jugador.perdidos}P
                                    </p>
                                    {isFirst && (
                                        <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                                            style={{ fontFamily: "var(--font-dm-sans)", color: "#CCFF00", backgroundColor: "rgba(204,255,0,0.1)", border: "1px solid rgba(204,255,0,0.25)" }}>
                                            Líder del club
                                        </span>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* CTA */}
                <motion.div className="flex justify-center"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0.3}>
                    <Link href="/ranking"
                        className="inline-flex items-center gap-3 rounded-full px-8 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-200"
                        style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "#CCFF00", color: "#060e1c" }}>
                        Ver ranking completo →
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}