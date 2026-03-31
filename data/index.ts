// ─── Types ───────────────────────────────────────────────
export interface Court {
    id: string;
    title: string;
    description: string;
    imgDay: string;
    imgNeon: string;
}
export interface Stat { id: string; number: string; label: string; description: string; }
export interface Step { id: string; num: string; title: string; description: string; }
export interface Torneo { id: string; name: string; date: string; categories: string[]; prize: string; status: "proximo" | "inscripcion" | "finalizado"; }
export interface Tarifa { id: string; tipo: string; hora: string; precio1h: string; precio2h: string; }
export interface Resultado { id: string; torneo: string; campeon: string; subcampeon: string; fecha: string; }
export interface TopJugador { pos: number; nombre: string; elo: number; categoria: string; ganados: number; perdidos: number; color: string; emoji: string; }

// ─── Data ────────────────────────────────────────────────
export const courts: Court[] = [
    {
        id: "cancha-1", title: "Cancha 1",
        description: "Cancha oficial del recinto Club Podium. Iluminación profesional para jugar de día y de noche.",
        imgDay: "/canchas/cancha1-dia.png", imgNeon: "/canchas/cancha1-neon.png",
    },
    {
        id: "cancha-2", title: "Cancha 2",
        description: "Segunda cancha oficial del recinto Club Podium. Mismo estándar profesional, disponible para reserva.",
        imgDay: "/canchas/cancha2-dia.png", imgNeon: "/canchas/cancha2-neon.png",
    },
];

export const stats: Stat[] = [
    { id: "s1", number: "2", label: "Canchas oficiales", description: "Cancha 1 y Cancha 2 disponibles" },
    { id: "s2", number: "3K+", label: "Jugadores activos", description: "Comunidad creciente en Ocaña" },
    { id: "s3", number: "20", label: "Torneos al año", description: "Competición de todos los niveles" },
];

export const steps: Step[] = [
    { id: "st1", num: "01", title: "Reserva tu cancha", description: "Elige horario en segundos por WhatsApp o app." },
    { id: "st2", num: "02", title: "Llega al club", description: "Acceso rápido, vestuarios premium listos." },
    { id: "st3", num: "03", title: "Juega y mejora", description: "Entrena o compite con análisis en directo." },
    { id: "st4", num: "04", title: "Vive el pádel", description: "Torneos, comunidad y competición federada." },
];

export const torneos: Torneo[] = [
    {
        id: "t1", name: "Torneo Santo", date: "15 Abril 2025",
        categories: ["5ta Alta", "5ta", "6ta"],
        prize: "Campeón 5ta Alta: $1.200.000 · 5ta: $800.000 · 6ta: $600.000",
        status: "inscripcion",
    },
    {
        id: "t2", name: "Torneo Apertura Podium", date: "10 Mayo 2025",
        categories: ["4ta", "5ta", "6ta"], prize: "Premios por confirmar", status: "proximo",
    },
    {
        id: "t3", name: "Torneo Nocturno", date: "20 Junio 2025",
        categories: ["5ta Alta", "6ta"], prize: "Premios por confirmar", status: "proximo",
    },
];

export const resultados: Resultado[] = [
    { id: "r1", torneo: "Torneo Barrio Libre", campeon: "Dupla A", subcampeon: "Dupla B", fecha: "Feb 2025" },
    { id: "r2", torneo: "Torneo Weekend", campeon: "Dupla C", subcampeon: "Dupla D", fecha: "Mar 2025" },
];

export const tarifas: Tarifa[] = [
    { id: "tar1", tipo: "Day Match", hora: "6:00 AM – 6:00 PM", precio1h: "$60.000", precio2h: "$100.000" },
    { id: "tar2", tipo: "Night Match", hora: "7:00 PM – 10:00 PM", precio1h: "$80.000", precio2h: "$140.000" },
];

// ─── Top 3 mock — reemplazar con Supabase en Fase 2 ─────
export const top3Ranking: TopJugador[] = [
    { pos: 1, nombre: "Carlos Mendoza", elo: 1820, categoria: "2da", ganados: 48, perdidos: 12, color: "#CCFF00", emoji: "🥇" },
    { pos: 2, nombre: "Andrés Torres", elo: 1745, categoria: "2da", ganados: 41, perdidos: 15, color: "#7a92b8", emoji: "🥈" },
    { pos: 3, nombre: "Felipe Rojas", elo: 1680, categoria: "3ra", ganados: 35, perdidos: 14, color: "#7a92b8", emoji: "🥉" },
];

export const statusConfig = {
    inscripcion: { label: "Inscripciones abiertas", color: "#CCFF00", bg: "rgba(204,255,0,0.1)" },
    proximo: { label: "Próximamente", color: "#0038A8", bg: "rgba(0,56,168,0.15)" },
    finalizado: { label: "Finalizado", color: "#7a92b8", bg: "rgba(122,146,184,0.1)" },
};