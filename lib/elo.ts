import type { ResultadoElo } from "@/types/partido";

// ─── Factor K ────────────────────────────────────────────
// K alto (40) = más volatilidad, para jugadores nuevos
// K bajo (20) = más estabilidad, para jugadores experimentados
export function getFactorK(partidosJugados: number): number {
    if (partidosJugados < 10) return 40; // nuevo en el club
    if (partidosJugados < 30) return 30; // intermedio
    return 20;                            // experimentado
}

// ─── Probabilidad de victoria ────────────────────────────
// Fórmula estándar ELO: P(A gana) = 1 / (1 + 10^((eloB - eloA)/400))
export function probabilidadVictoria(eloJugador: number, eloRival: number): number {
    return 1 / (1 + Math.pow(10, (eloRival - eloJugador) / 400));
}

// ─── Calcular nuevo ELO tras un partido ─────────────────
export function calcularElo(
    eloGanador: number,
    eloPerdedor: number,
    partidosGanador: number,
    partidosPerdedor: number
): ResultadoElo {
    const kGanador = getFactorK(partidosGanador);
    const kPerdedor = getFactorK(partidosPerdedor);

    const probGanador = probabilidadVictoria(eloGanador, eloPerdedor);
    const probPerdedor = probabilidadVictoria(eloPerdedor, eloGanador);

    // Ganador: resultado real = 1, Perdedor: resultado real = 0
    const puntosGanados = Math.round(kGanador * (1 - probGanador));
    const puntosPerdidos = Math.round(kPerdedor * (0 - probPerdedor));

    return {
        nuevoEloGanador: eloGanador + puntosGanados,
        nuevoEloPerdedor: Math.max(100, eloPerdedor + puntosPerdidos), // mínimo 100
        puntosGanados,
        puntosPerdidos: Math.abs(puntosPerdidos),
    };
}

// ─── ELO inicial para jugadores nuevos ──────────────────
export const ELO_INICIAL = 1000;