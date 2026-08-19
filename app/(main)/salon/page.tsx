"use client";

import { mockSalonGames, seededScores } from "@/app/lib/mockData";

export default function SalonPage() {
  return (
    <div className="av-salon fade-in">
      <section className="salon-header">
        <h1>SALÓN DE LA FAMA</h1>
        <div className="sub">LOS MEJORES JUGADORES DEL ARCADE VAULT</div>
      </section>

      <div className="salon-sections">
        <div className="salon-leaderboard">
          <h2>RANKING GENERAL</h2>
          <div className="leaderboard">
            {seededScores(42, 10).map((r, i) => (
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
        </div>

        <div className="salon-tournaments">
          <h2>TORNEOS EN VIVO</h2>
          <div className="tournament-list">
            {mockSalonGames.map((game) => (
              <div key={game.id} className={`tournament-card status-${game.status}`}>
                <div className="tournament-title">{game.title}</div>
                <div className="tournament-info">
                  <span>{game.players} jugadores</span>
                  <span className={`status status-${game.status}`}>
                    {game.status === "active"
                      ? "EN DIRECTO"
                      : game.status === "waiting"
                        ? "PRÓXIMAMENTE"
                        : "FINALIZADO"}
                  </span>
                </div>
                <button className={`btn ${game.status === "active" ? "" : "ghost"}`}>
                  {game.status === "active"
                    ? "VER EN VIVO"
                    : game.status === "waiting"
                      ? "RESERVARSE"
                      : "RESULTADOS"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
