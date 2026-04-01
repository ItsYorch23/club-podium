"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, fadeIn, GridLines, GlowBlue, SectionLabel } from "@/components/ui";
import { CourtCard } from "@/components/CourtCard";
import { courts } from "@/data";

/* ─────────────────────────────────────────────
   Datos cafetería
───────────────────────────────────────────── */
const cafeServices = ["WiFi gratis", "TV en vivo", "Carga USB", "Bebidas frías"];
const cafeSchedule = [
    { day: "Lun – Vie", hours: "7:00 – 22:00" },
    { day: "Sábados", hours: "8:00 – 23:00" },
    { day: "Domingos", hours: "9:00 – 20:00" },
];

/* ─────────────────────────────────────────────
   Tarjeta Cafetería
───────────────────────────────────────────── */
function CafeteriaCard() {
    return (
        <motion.div
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{
                width: "100%",
                height: "100%",
                border: "1px solid rgba(255,156,58,0.35)",
                backgroundColor: "#0e1c2e",
                backgroundImage: "radial-gradient(ellipse at 80% 0%, rgba(255,120,30,0.09) 0%, transparent 65%)",
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
            whileHover={{
                scale: 1.03,
                rotateX: -2,
                rotateY: -3,
                boxShadow: "0 24px 48px rgba(255,120,30,0.22), 0 8px 16px rgba(0,0,0,0.5)",
                borderColor: "rgba(255,156,58,0.7)",
                transition: { duration: 0.3, ease: [0.25, 0.8, 0.25, 1] },
            }}
        >
            {/* Borde luminoso inferior al hacer hover */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] pointer-events-none z-20"
                initial={{ scaleX: 0, opacity: 0 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                    background: "linear-gradient(90deg, transparent, #ff9c3a, transparent)",
                    transformOrigin: "center",
                }}
            />
            <div
                className="pointer-events-none absolute -top-10 -right-10 rounded-full"
                style={{
                    width: 180, height: 180,
                    background: "radial-gradient(circle, rgba(255,156,58,0.18) 0%, transparent 70%)",
                    filter: "blur(40px)",
                    zIndex: 0,
                }}
            />
            <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ height: 176 }}>
                <Image
                    src="/cafeteria/cafeteria_podium.png"
                    alt="Cafetería Club Podium"
                    fill
                    className="object-cover"
                    sizes="90vw"
                />
                <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(10,22,40,0.75) 0%, transparent 60%)" }}
                />
                <span
                    className="absolute top-3 right-3 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                        fontFamily: "var(--font-dm-sans)",
                        background: "rgba(255,156,58,0.18)",
                        border: "1px solid rgba(255,156,58,0.4)",
                        color: "#ff9c3a",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    Zona de Descanso
                </span>
            </div>
            <div className="flex flex-col flex-1 p-6 gap-4">
                <div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)", color: "#FFFFFF" }}>
                        Cafetería
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>
                        Relájate entre partidos con ambiente acogedor, bebidas y todo lo que necesitas.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    {cafeServices.map((s) => (
                        <span key={s} className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                            style={{ fontFamily: "var(--font-dm-sans)", background: "rgba(255,156,58,0.1)", border: "1px solid rgba(255,156,58,0.2)", color: "#ffb96a" }}>
                            {s}
                        </span>
                    ))}
                </div>
                <div style={{ borderTop: "1px solid rgba(255,156,58,0.12)" }} />
                <div className="flex flex-col gap-2">
                    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "#ff9c3a" }}>
                        Horarios
                    </p>
                    {cafeSchedule.map((row, i) => (
                        <div key={row.day} className="flex justify-between items-center">
                            <span className="text-xs" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{row.day}</span>
                            <span className="text-xs font-semibold tabular-nums"
                                style={{ fontFamily: "var(--font-dm-sans)", color: i === 0 ? "#ff9c3a" : "rgba(255,255,255,0.55)" }}>
                                {row.hours}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Carousel 3D Coverflow — basado en estado puro,
   sin scroll nativo (compatible con motion.div)
───────────────────────────────────────────── */
const CARD_W = 300;   /* ancho visible del card central */
const CARD_H = 560;   /* altura fija del stage */
const SIDE_OFF = 200;   /* cuánto se desplazan los cards laterales */
const SIDE_ROT = 42;    /* grados de rotación Y */
const SIDE_Z = -140;  /* profundidad de los cards laterales */
const SIDE_SC = 0.78;  /* escala de los cards laterales */

function CoverflowCarousel({ cards }: { cards: React.ReactNode[] }) {
    const [active, setActive] = useState(0);
    const [dir, setDir] = useState(0); /* -1 izq, +1 der */
    const total = cards.length;

    const go = (idx: number) => {
        setDir(idx > active ? 1 : -1);
        setActive(idx);
    };
    const prev = () => active > 0 && go(active - 1);
    const next = () => active < total - 1 && go(active + 1);

    /* Swipe táctil */
    let touchX = 0;
    const onTouchStart = (e: React.TouchEvent) => { touchX = e.touches[0].clientX; };
    const onTouchEnd = (e: React.TouchEvent) => {
        const dx = touchX - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) dx > 0 ? next() : prev();
    };

    return (
        <div
            className="relative w-full select-none"
            style={{ touchAction: "pan-y" }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Stage 3D */}
            <div
                style={{
                    position: "relative",
                    height: CARD_H,
                    perspective: "1000px",
                    perspectiveOrigin: "50% 45%",
                    overflow: "hidden",
                }}
            >
                {cards.map((card, i) => {
                    const diff = i - active;
                    const absD = Math.abs(diff);
                    const sign = diff === 0 ? 0 : diff / absD;
                    const visible = absD <= 1; /* solo renderiza centro ± 1 */

                    /* Posición horizontal centrada */
                    const tx = diff === 0
                        ? 0
                        : sign * SIDE_OFF;

                    const scale = diff === 0 ? 1 : SIDE_SC;
                    const rotateY = diff === 0 ? 0 : sign * -SIDE_ROT;
                    const tz = diff === 0 ? 40 : SIDE_Z;
                    const opacity = diff === 0 ? 1 : 0.45;
                    const zIdx = diff === 0 ? 10 : 5 - absD;

                    return (
                        <div
                            key={i}
                            onClick={() => diff !== 0 && go(i)}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                width: CARD_W,
                                height: "100%",
                                marginLeft: -(CARD_W / 2),
                                zIndex: zIdx,
                                cursor: diff !== 0 ? "pointer" : "default",
                                transformStyle: "preserve-3d",
                                transform: `
                                    translateX(${tx}px)
                                    translateZ(${tz}px)
                                    rotateY(${rotateY}deg)
                                    scale(${scale})
                                `,
                                opacity,
                                transition: "transform 0.45s cubic-bezier(.25,.8,.25,1), opacity 0.45s ease",
                                boxShadow: diff === 0
                                    ? "0 28px 56px rgba(0,0,0,0.75), 0 8px 20px rgba(0,0,0,0.45)"
                                    : "none",
                                borderRadius: 16,
                                overflow: "hidden",
                                /* Oculta cards muy lejanos para no bloquear el click */
                                pointerEvents: absD > 1 ? "none" : "auto",
                                visibility: visible || absD <= 2 ? "visible" : "hidden",
                            }}
                        >
                            {/* Contenedor interior: da altura real al card */}
                            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                                {card}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Controles */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 20 }}>
                <button
                    onClick={prev}
                    disabled={active === 0}
                    style={{
                        width: 36, height: 36, borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: active === 0 ? "transparent" : "rgba(255,255,255,0.07)",
                        color: active === 0 ? "rgba(255,255,255,0.2)" : "#fff",
                        fontSize: 22, cursor: active === 0 ? "default" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s",
                    }}
                    aria-label="Anterior"
                >‹</button>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            aria-label={`Tarjeta ${i + 1}`}
                            style={{
                                width: i === active ? 24 : 8, height: 8,
                                borderRadius: 4, border: "none", padding: 0,
                                cursor: "pointer",
                                background: i === active ? "#CCFF00" : "rgba(255,255,255,0.22)",
                                boxShadow: i === active ? "0 0 8px rgba(204,255,0,0.6)" : "none",
                                transition: "width 0.35s ease, background 0.3s ease",
                            }}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    disabled={active === total - 1}
                    style={{
                        width: 36, height: 36, borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.15)",
                        background: active === total - 1 ? "transparent" : "rgba(255,255,255,0.07)",
                        color: active === total - 1 ? "rgba(255,255,255,0.2)" : "#fff",
                        fontSize: 22, cursor: active === total - 1 ? "default" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s",
                    }}
                    aria-label="Siguiente"
                >›</button>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   Sección principal
───────────────────────────────────────────── */
export default function InstalacionesSection() {
    /* Construimos el array de cards aquí para pasarlo como prop */
    const carouselCards = [
        ...courts.map((court, i) => <CourtCard key={court.id} court={court} index={i} />),
        <CafeteriaCard key="cafeteria" />,
    ];

    return (
        <section
            id="instalaciones"
            className="relative py-32 px-6 md:px-12 overflow-hidden"
            style={{ backgroundColor: "#0a1628" }}
        >
            <GridLines />
            <GlowBlue className="w-[500px] h-[500px] -top-32 -left-32" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
                    <div>
                        <SectionLabel num="01" label="Instalaciones" />
                        <motion.h2
                            className="text-6xl md:text-7xl leading-[1.0]"
                            style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#FFFFFF" }}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
                        >
                            Nuestras<br /><em style={{ color: "#CCFF00" }}>canchas.</em>
                        </motion.h2>
                    </div>
                    <motion.p
                        className="max-w-xs text-sm leading-relaxed md:text-right"
                        style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true }} variants={fadeIn} custom={0.2}
                    >
                        El recinto Club Podium cuenta con 2 canchas profesionales. Activa el modo{" "}
                        <span style={{ color: "#00f0ff" }}>⚡ Neon</span> para ver cómo se ven de noche.
                    </motion.p>
                </div>

                {/* ── MÓVIL / TABLET: Coverflow 3D ── */}
                <div className="block lg:hidden">
                    <CoverflowCarousel cards={carouselCards} />
                </div>

                {/* ── DESKTOP: Grid 3 columnas ── */}
                <div className="hidden lg:grid grid-cols-3 gap-8">
                    {courts.map((court, i) => (
                        <motion.div
                            key={court.id}
                            initial="hidden" whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            variants={fadeUp} custom={i * 0.15}
                        >
                            <CourtCard court={court} index={i} />
                        </motion.div>
                    ))}
                    <motion.div
                        initial="hidden" whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={fadeUp} custom={0.3}
                    >
                        <CafeteriaCard />
                    </motion.div>
                </div>

            </div>
        </section>
    );
}