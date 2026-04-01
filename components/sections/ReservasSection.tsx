"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, GridLines, GlowYellow, SectionLabel } from "@/components/ui";
import { tarifas } from "@/data";

export default function ReservasSection() {
    const [formData, setFormData] = useState({ nombre: "", telefono: "", fecha: "", cancha: "", turno: "", mensaje: "" });
    const [formSent, setFormSent] = useState(false);

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const msg = `Hola Club Podium! Me llamo ${formData.nombre}, quiero reservar la ${formData.cancha} el ${formData.fecha} en el turno ${formData.turno}. ${formData.mensaje}`;
        window.open(`https://wa.me/message/TNQRBXWZJWAML1?text=${encodeURIComponent(msg)}`, "_blank");
        setFormSent(true);
    };

    return (
        <section id="reservas" className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#0a1628" }}>
            <GridLines />
            <GlowYellow className="w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2" />
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
                    <div>
                        <SectionLabel num="06" label="Reservas" />
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
                        {/* Tarifas */}
                        <motion.div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,56,168,0.25)" }}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="px-8 py-5" style={{ backgroundColor: "rgba(0,56,168,0.2)", borderBottom: "1px solid rgba(0,56,168,0.25)" }}>
                                <span style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, color: "#FFFFFF", fontSize: "18px" }}>Horarios y Tarifas</span>
                            </div>
                            {tarifas.map((tarifa, i) => (
                                <div key={tarifa.id} className="px-8 py-6"
                                    style={{ backgroundColor: i % 2 === 0 ? "#0d1e38" : "#0a1628", borderBottom: i < tarifas.length - 1 ? "1px solid rgba(0,56,168,0.15)" : "none" }}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>{tarifa.tipo}</span>
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

                        {/* Redes */}
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
                        <h3 className="text-white text-2xl mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>Enviar solicitud</h3>
                        <p className="text-sm mb-8" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                            Completa el formulario y te contactamos por WhatsApp para confirmar tu reserva.
                        </p>
                        {formSent ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: "rgba(204,255,0,0.1)", border: "2px solid #CCFF00" }}>
                                    <span style={{ fontSize: "28px" }}>✓</span>
                                </div>
                                <p className="text-white text-lg font-semibold" style={{ fontFamily: "var(--font-playfair)" }}>¡Redirigiendo a WhatsApp!</p>
                                <p className="text-sm text-center" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Confirma tu reserva en el chat que se abrió.</p>
                                <button onClick={() => setFormSent(false)} className="text-xs uppercase tracking-widest mt-2"
                                    style={{ fontFamily: "var(--font-dm-sans)", color: "#CCFF00" }}>Nueva reserva</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Nombre completo</label>
                                    <input type="text" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                        placeholder="Tu nombre" className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none"
                                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Teléfono / WhatsApp</label>
                                    <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                        placeholder="Tu número" className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none"
                                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Cancha</label>
                                        <select value={formData.cancha} onChange={(e) => setFormData({ ...formData, cancha: e.target.value })}
                                            className="w-full rounded-xl px-4 py-3 text-white outline-none"
                                            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.15)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }}>
                                            <option value="">Seleccionar</option>
                                            <option value="Cancha 1">Cancha 1</option>
                                            <option value="Cancha 2">Cancha 2</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Fecha</label>
                                        <input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                                            className="w-full rounded-xl px-4 py-3 text-white outline-none"
                                            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Turno</label>
                                    <select value={formData.turno} onChange={(e) => setFormData({ ...formData, turno: e.target.value })}
                                        className="w-full rounded-xl px-4 py-3 text-white outline-none"
                                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.15)", border: "1px solid rgba(0,56,168,0.3)", colorScheme: "dark" }}>
                                        <option value="">Seleccionar turno</option>
                                        <option value="Day Match (6:00 AM – 6:00 PM)">Day Match — 6:00 AM a 6:00 PM</option>
                                        <option value="Night Match (7:00 PM – 10:00 PM)">Night Match — 7:00 PM a 10:00 PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>Mensaje adicional (opcional)</label>
                                    <textarea value={formData.mensaje} onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                                        placeholder="¿Alguna preferencia o comentario?" rows={3}
                                        className="w-full rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none resize-none"
                                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "14px", backgroundColor: "rgba(0,56,168,0.1)", border: "1px solid rgba(0,56,168,0.3)" }} />
                                </div>
                                <motion.button onClick={handleSubmit}
                                    className="w-full rounded-xl py-4 font-bold uppercase tracking-wider text-sm mt-2"
                                    style={{ fontFamily: "var(--font-dm-sans)", backgroundColor: "#CCFF00", color: "#060e1c" }}
                                    whileHover={{ scale: 1.02, backgroundColor: "#B8E600" }} whileTap={{ scale: 0.98 }}>
                                    Enviar por WhatsApp →
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}