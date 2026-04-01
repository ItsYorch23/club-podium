"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, GlowBlue, GlowYellow } from "@/components/ui";
import { stats } from "@/data";

export default function StatsSection() {
    const statsRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
    const statsY = useTransform(scrollYProgress, [0, 1], [30, -30]);

    return (
        <section id="estadisticas" ref={statsRef} className="relative py-32 px-6 md:px-12 overflow-hidden" style={{ backgroundColor: "#060e1c" }}>
            <GlowBlue className="w-[700px] h-[400px] top-0 right-0 translate-x-1/3 -translate-y-1/4" />
            <GlowYellow className="w-[350px] h-[350px] bottom-0 left-1/4" />
            <motion.div className="max-w-6xl mx-auto relative z-10" style={{ y: statsY }}>
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "rgba(0,56,168,0.2)" }}>
                    {stats.map((stat, i) => (
                        <motion.div key={stat.id} className="flex flex-col py-16 md:py-0 px-10 first:pl-0 last:pr-0"
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} custom={i * 0.15} variants={fadeUp}>
                            <span className="text-7xl md:text-8xl leading-none mb-3"
                                style={{ fontFamily: "var(--font-playfair)", fontWeight: 800, color: "#CCFF00" }}>{stat.number}</span>
                            <span className="text-white text-xl mb-2" style={{ fontFamily: "var(--font-playfair)", fontWeight: 600 }}>{stat.label}</span>
                            <span className="text-sm" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--color-muted)" }}>{stat.description}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}