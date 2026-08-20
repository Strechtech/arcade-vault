"use client";

import { useState } from "react";
import { User } from "@/app/lib/mockData";

interface TopBarProps {
  user: User | null;
}

export default function TopBar({ user }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="av-nav">
        <div className="logo">
          <div className="logo-mark"></div>
          <div className="logo-text neon-cyan">ARCADE <span className="neon-magenta">VAULT</span></div>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        {user ? (
          <button className="btn ghost auth-btn">{user.name} ▾</button>
        ) : (
          <div style={{ fontSize: "12px", color: "var(--ink-dim)", fontFamily: "var(--mono)" }}>
            <a href="/auth">Iniciar Sesión</a>
          </div>
        )}
        <button
          className="btn ghost hamburger"
          aria-label="Menú"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ≡
        </button>
      </nav>
      {mobileMenuOpen && (
        <>
          <div
            className="av-mobile-backdrop open"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="av-mobile-panel open">
            {user ? (
              <a href="/perfil" onClick={() => setMobileMenuOpen(false)}>Cuenta</a>
            ) : (
              <a href="/auth" onClick={() => setMobileMenuOpen(false)}>Iniciar Sesión</a>
            )}
            <div style={{ flex: 1 }}></div>
            <div className="pixel" style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}>CRÉDITOS · 03</div>
          </aside>
        </>
      )}
    </>
  );
}
