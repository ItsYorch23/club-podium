// ─── Partido ─────────────────────────────────────────────
export type EstadoPartido = "pendiente" | "confirmado" | "rechazado";

export interface Partido {
    id: string;
    jugador1Id: string;
    jugador2Id: string;
    score: string;         // ej: "6-3, 6-4"
    ganadorId: string;
    confirmado: boolean;
    estado: EstadoPartido;
    fecha: Date;
    // ELO antes y después del partido
    eloJ1Antes?: number;
    eloJ2Antes?: number;
    eloJ1Despues?: number;
    eloJ2Despues?: number;
}

// ─── Resultado de calcular ELO ───────────────────────────
export interface ResultadoElo {
    nuevoEloGanador: number;
    nuevoEloPerdedor: number;
    puntosGanados: number;
    puntosPerdidos: number;
}