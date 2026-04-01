"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { fadeUp } from "@/components/ui";
import type { Court } from "@/data";

export function CourtCard({ court, index }: { court: Court; index: number }) {
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
            /* ── Hover 3D ── */
            whileHover={{
                scale: 1.03,
                rotateX: -2,
                rotateY: 3,
                boxShadow: isNeon
                    ? "0 24px 48px rgba(0,240,255,0.2), 0 8px 16px rgba(0,0,0,0.5)"
                    : "0 24px 48px rgba(0,56,168,0.3), 0 8px 16px rgba(0,0,0,0.5)",
                borderColor: isNeon ? "rgba(0,240,255,0.5)" : "rgba(204,255,0,0.35)",
                transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
            }}
            /* ── Estado reposo ── */
            style={{
                backgroundColor: "#0d1e38",
                border: "1px solid rgba(0,56,168,0.25)",
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
        >
            {/* Borde luminoso inferior al hacer hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none z-20"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                    background: isNeon
                        ? "linear-gradient(90deg, transparent, #00f0ff, transparent)"
                        : "linear-gradient(90deg, transparent, #CCFF00, transparent)",
                    transformOrigin: "center",
                }}
            />

            <div className="relative w-full overflow-hidden" style={{ height: "240px" }}>
                <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: isNeon ? 0 : 1, zIndex: 1 }}>
                    <Image src={court.imgDay} alt={`${court.title} día`} fill style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="absolute inset-0 transition-opacity duration-700" style={{ opacity: isNeon ? 1 : 0, zIndex: 2 }}>
                    <Image src={court.imgNeon} alt={`${court.title} neon`} fill style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to top, #0d1e38, transparent)" }} />
                <div className="absolute top-3 left-3 z-10">
                    <span className="text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider"
                        style={{
                            fontFamily: "var(--font-dm-sans)",
                            backgroundColor: isNeon ? "rgba(0,240,255,0.15)" : "rgba(204,255,0,0.15)",
                            color: isNeon ? "#00f0ff" : "#CCFF00",
                            border: `1px solid ${isNeon ? "rgba(0,240,255,0.4)" : "rgba(204,255,0,0.4)"}`,
                            transition: "all 0.4s ease",
                        }}>
                        {isNeon ? "⚡ Neon" : "☀ Día"}
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col gap-4 flex-1">
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
                    <button onClick={() => setIsNeon(!isNeon)}
                        className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 flex-shrink-0"
                        style={{
                            backgroundColor: isNeon ? "rgba(0,240,255,0.1)" : "rgba(204,255,0,0.08)",
                            border: `1px solid ${isNeon ? "rgba(0,240,255,0.35)" : "rgba(204,255,0,0.3)"}`,
                        }}>
                        <div className="relative w-10 h-5 rounded-full transition-all duration-300"
                            style={{ backgroundColor: isNeon ? "rgba(0,240,255,0.3)" : "rgba(204,255,0,0.2)" }}>
                            <motion.div className="absolute top-0.5 w-4 h-4 rounded-full"
                                animate={{ left: isNeon ? "calc(100% - 18px)" : "2px" }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                style={{ backgroundColor: isNeon ? "#00f0ff" : "#CCFF00" }} />
                        </div>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", color: isNeon ? "#00f0ff" : "#CCFF00", transition: "color 0.3s ease" }} className="uppercase">
                            {isNeon ? "Neon" : "Día"}
                        </span>
                    </button>
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                    {court.description}
                </p>
                {isNeon && (
                    <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className="text-xs leading-relaxed"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "rgba(0,240,255,0.6)" }}>
                        ⚡ Modo neon activo — pádel con luces de neón para una experiencia única de noche.
                    </motion.p>
                )}
                <motion.a href="#reservas"
                    className="mt-auto inline-flex items-center gap-2 text-xs uppercase tracking-widest pt-4"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        color: isNeon ? "#00f0ff" : "#CCFF00",
                        borderTop: `1px solid ${isNeon ? "rgba(0,240,255,0.15)" : "rgba(204,255,0,0.1)"}`,
                        transition: "color 0.4s ease, border-color 0.4s ease",
                    }}
                    whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <span>Reservar {court.title}</span><span>→</span>
                </motion.a>
            </div>
        </motion.div>
    );
}