"use client";

import { motion } from "framer-motion";
import { fadeUp, fadeIn, GridLines, GlowBlue, SectionLabel } from "@/components/ui";
import { torneos, resultados, statusConfig } from "@/data";

export default function TorneosSection() {
    return (
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

                {/* Cards torneos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {torneos.map((torneo, i) => {
                        const s = statusConfig[torneo.status];
                        return (
                            <motion.div key={torneo.id} className="relative rounded-2xl p-8 flex flex-col gap-4 overflow-hidden"
                                style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                                custom={i * 0.12} variants={fadeUp} whileHover={{ y: -4, transition: { duration: 0.25 } }}>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full font-bold"
                                        style={{ fontFamily: "var(--font-dm-sans)", color: s.color, backgroundColor: s.bg }}>{s.label}</span>
                                    <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{torneo.date}</span>
                                </div>
                                <h3 className="text-white text-2xl" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>{torneo.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {torneo.categories.map((cat) => (
                                        <span key={cat} className="text-xs px-2 py-1 rounded"
                                            style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "rgba(0,56,168,0.2)", color: "#7a92b8", border: "1px solid rgba(0,56,168,0.3)" }}>
                                            {cat}
                                        </span>
                                    ))}
                                </div>
                                <div className="pt-2 border-t" style={{ borderColor: "rgba(0,56,168,0.2)" }}>
                                    <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>🏆 {torneo.prize}</p>
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

                {/* Cómo inscribirse */}
                <motion.div className="rounded-2xl p-8 md:p-12 mb-16"
                    style={{ backgroundColor: "#0d1e38", border: "1px solid rgba(0,56,168,0.25)" }}
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h3 className="text-white text-2xl mb-8" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>¿Cómo inscribirse?</h3>
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

                {/* Resultados anteriores */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <h3 className="text-white text-2xl mb-6" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>Resultados anteriores</h3>
                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,56,168,0.25)" }}>
                        <div className="grid grid-cols-4 px-6 py-3"
                            style={{ backgroundColor: "rgba(0,56,168,0.2)", borderBottom: "1px solid rgba(0,56,168,0.25)" }}>
                            {["Torneo", "Campeón", "Subcampeón", "Fecha"].map((h) => (
                                <span key={h} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00", letterSpacing: "0.15em" }} className="uppercase">{h}</span>
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
    );
}