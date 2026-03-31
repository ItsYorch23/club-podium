import { motion } from "framer-motion";

// ─── Animation variants ──────────────────────────────────
export const fadeUp = {
    hidden: { opacity: 0, y: 48 },
    visible: (d: number = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: d },
    }),
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: (d: number = 0) => ({
        opacity: 1,
        transition: { duration: 0.65, ease: "easeOut", delay: d },
    }),
};

// ─── Visual helpers ──────────────────────────────────────
export function GridLines() {
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

export function GlowBlue({ className }: { className?: string }) {
    return (
        <div className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ background: "radial-gradient(circle, rgba(0,56,168,0.35) 0%, transparent 70%)", filter: "blur(60px)" }} />
    );
}

export function GlowYellow({ className }: { className?: string }) {
    return (
        <div className={`absolute rounded-full pointer-events-none ${className}`}
            style={{ background: "radial-gradient(circle, rgba(204,255,0,0.1) 0%, transparent 70%)", filter: "blur(70px)" }} />
    );
}

export function Divider() {
    return (
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #0038A8, #CCFF00, transparent)" }} />
    );
}

export function SectionLabel({ num, label }: { num: string; label: string }) {
    return (
        <motion.p className="uppercase tracking-[0.28em] mb-3"
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", color: "#CCFF00" }}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeIn}>
            {num} — {label}
        </motion.p>
    );
}