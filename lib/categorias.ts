import type { Categoria, RangoCategoria } from "@/types/jugador";

// ─── Tabla de categorías ─────────────────────────────────
// El jugador NO elige categoría → la define el ELO
export const CATEGORIAS: RangoCategoria[] = [
    { nombre: "6ta", min: 0, max: 999, color: "#7a92b8", bg: "rgba(122,146,184,0.12)" },
    { nombre: "5ta", min: 1000, max: 1199, color: "#0038A8", bg: "rgba(0,56,168,0.15)" },
    { nombre: "5ta Alta", min: 1200, max: 1399, color: "#1a56db", bg: "rgba(26,86,219,0.15)" },
    { nombre: "4ta", min: 1400, max: 1599, color: "#CCFF00", bg: "rgba(204,255,0,0.1)" },
    { nombre: "3ra", min: 1600, max: 1799, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    { nombre: "2da", min: 1800, max: 1999, color: "#f97316", bg: "rgba(249,115,22,0.12)" },
    { nombre: "1ra", min: 2000, max: 9999, color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
];

// ─── Obtener categoría por ELO ───────────────────────────
export function getCategoriaByElo(elo: number): Categoria {
    const rango = CATEGORIAS.find((c) => elo >= c.min && elo <= c.max);
    return rango?.nombre ?? "6ta";
}

// ─── Obtener config visual de una categoría ─────────────
export function getConfigCategoria(categoria: Categoria): RangoCategoria {
    return CATEGORIAS.find((c) => c.nombre === categoria) ?? CATEGORIAS[0];
}

// ─── Validar si dos jugadores pueden jugar ranking ──────
// Regla: no se puede jugar con diferencia > 200 ELO
export function puedenJugarRanking(elo1: number, elo2: number): boolean {
    return Math.abs(elo1 - elo2) <= 200;
}