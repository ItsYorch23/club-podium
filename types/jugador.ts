// ─── Jugador ─────────────────────────────────────────────
export interface Jugador {
    id: string;
    nombre: string;
    email: string;
    elo: number;
    categoria: Categoria;
    ganados: number;
    perdidos: number;
    partidosJugados: number;
    fechaRegistro: Date;
    avatarUrl?: string;
    // Para mostrar subida/bajada en ranking
    eloPrevio?: number;
}

// ─── Categorías ──────────────────────────────────────────
export type Categoria = "6ta" | "5ta" | "5ta Alta" | "4ta" | "3ra" | "2da" | "1ra";

export interface RangoCategoria {
    nombre: Categoria;
    min: number;
    max: number;
    color: string;
    bg: string;
}

// ─── Posición en ranking ─────────────────────────────────
export interface PosicionRanking {
    jugador: Jugador;
    posicion: number;
    variacion: number; // positivo = subió, negativo = bajó, 0 = igual
}