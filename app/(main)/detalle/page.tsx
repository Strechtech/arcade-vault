"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { mockGames, seededScores } from "@/app/lib/mockData";

export default function DetallePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const game = useMemo(() => {
    return mockGames.find((g) => g.id === id);
  }, [id]);

  const scores = useMemo(() => {
    if (!id) return [];
    return seededScores(id.length * 17 + 3, 10);
  }, [id]);

  if (!game) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p>Juego no encontrado</p>
        <Link href="/biblioteca">Volver a Biblioteca</Link>
      </div>
    );
  }

  return (
    <div className="av-detail fade-in">
      <div>
        <div className="detail-cover">
          <div className={`cover-bg ${game.cover}`}></div>
        </div>
        <div style={{ marginTop: 20 }} className="detail-info">
          <div className="detail-tags">
            <span>{game.cat}</span>
            <span>1 JUGADOR</span>
            <span>TECLADO / TÁCTIL</span>
            <span>RETRO 1985</span>
          </div>
          <h2 className="neon-cyan">{game.title}</h2>
          <p>{game.long}</p>
          <div className="stat-strip">
            <div>
              <div className="l">Partidas</div>
              <div className="v">{game.plays}</div>
            </div>
            <div>
              <div
                className="l"
                style={{
                  color: "var(--magenta)",
                  textShadow: "0 0 6px rgba(255,0,110,0.5)",
                }}
              >
                Mejor global
              </div>
              <div
                className="v"
                style={{
                  color: "var(--magenta)",
                  textShadow: "0 0 6px rgba(255,0,110,0.5)",
                }}
              >
                {game.best.toLocaleString("es-ES")}
              </div>
            </div>
            <div>
              <div className="l">Dificultad</div>
              <div
                className="v"
                style={{
                  color: "var(--yellow)",
                  textShadow: "0 0 6px rgba(245,255,0,0.5)",
                }}
              >
                ★ ★ ★ ☆ ☆
              </div>
            </div>
          </div>
          <div className="detail-actions">
            <Link href={`/reproductor?id=${game.id}`}>
              <button className="btn xl pulse">▶  JUGAR AHORA</button>
            </Link>
            <Link href="/biblioteca">
              <button className="btn ghost lg">VOLVER AL VAULT</button>
            </Link>
          </div>
        </div>
      </div>

      <aside>
        <div className="leaderboard">
          <h3>MEJORES PUNTUACIONES</h3>
          {scores.map((r, i) => (
            <div
              key={r.name}
              className={`lb-row ${i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : ""}`}
            >
              <div className="rk">#{String(r.rank).padStart(2, "0")}</div>
              <div className="pl">
                {r.name}
                <div
                  style={{
                    fontSize: 10,
                    color: "var(--ink-faint)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {r.date}
                </div>
              </div>
              <div className="sc">{r.score.toLocaleString("es-ES")}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
