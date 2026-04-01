"use client";

import { motion } from "framer-motion";
import { fadeUp, GridLines, GlowBlue, SectionLabel } from "@/components/ui";
import { steps } from "@/data";

export default function ExperienciaSection() {
    return (
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
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={i * 0.15} variants={fadeUp}>
                                <div className="hidden lg:flex items-center mb-10">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#CCFF00", boxShadow: "0 0 14px rgba(204,255,0,0.7)" }} />
                                </div>
                                <span className="text-7xl leading-none mb-4 select-none"
                                    style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "rgba(0,56,168,0.18)" }}>{step.num}</span>
                                <h3 className="text-white text-xl mb-3" style={{ fontFamily: "var(--font-playfair)", fontWeight: 700 }}>{step.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}