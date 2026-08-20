"use client";

import { mockSalonGames, seededScores } from "@/app/lib/mockData";

export default function SalonPage() {
  const top3 = seededScores(42, 3);

  return (
    <div className="av-hall fade-in">
      <div className="hall-head">
        <h1>SALÓN DE LA FAMA</h1>
        <p>LOS MEJORES JUGADORES DEL ARCADE VAULT</p>
      </div>

      <div className="podium">
        {top3.map((player, i) => {
          const medals = ["gold", "silver", "bronze"];
          const medal = medals[i];
          return (
            <div key={player.name} className={`podium-slot ${medal}`}>
              <div className="rank-num">#{i + 1}</div>
              <div className="name">{player.name}</div>
              <div className="score">{player.score.toLocaleString("es-ES")}</div>
              <div className="date">{player.date}</div>
            </div>
          );
        })}
      </div>

      <div className="hall-table">
        <div className="th">
          <div>RANGO</div>
          <div>JUGADOR</div>
          <div>PUNTUACIÓN</div>
          <div>FECHA</div>
        </div>
        {seededScores(42, 10).map((r, i) => (
          <div
            key={r.name}
            className={`tr ${i === 0 ? "top1" : i === 1 ? "top2" : i === 2 ? "top3" : ""}`}
          >
            <div className="rk">#{String(r.rank).padStart(2, "0")}</div>
            <div className="pl">{r.name}</div>
            <div className="sc">{r.score.toLocaleString("es-ES")}</div>
            <div className="dt">{r.date}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "48px" }}>
        <h2 className="pixel" style={{ fontSize: "14px", letterSpacing: "0.12em", marginBottom: "16px", color: "var(--ink-dim)" }}>
          TORNEOS EN VIVO
        </h2>
        <div className="av-grid" style={{ marginBottom: 0 }}>
          {mockSalonGames.map((game) => (
            <div key={game.id} className="card">
              <div className="meta">
                <div className="title">{game.title}</div>
                <div style={{ fontSize: "12px", color: "var(--ink-dim)" }}>
                  {game.players} jugadores
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span
                  className="pixel"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.12em",
                    color:
                      game.status === "active"
                        ? "var(--green)"
                        : game.status === "waiting"
                          ? "var(--yellow)"
                          : "var(--ink-faint)",
                  }}
                >
                  {game.status === "active"
                    ? "EN DIRECTO"
                    : game.status === "waiting"
                      ? "PRÓXIMAMENTE"
                      : "FINALIZADO"}
                </span>
              </div>
              <button className={`btn ${game.status === "active" ? "" : "ghost"}`} style={{ marginTop: "12px", width: "100%" }}>
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
  );
}
