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
        <div className="links">
          <a href="/biblioteca">Biblioteca</a>
          <a href="/salon">Salón de la Fama</a>
        </div>
        <div className="spacer"></div>
        <div className="coin-counter">
          <span className="coin"></span>
          <span>CRÉDITOS · 03</span>
        </div>
        {user ? (
          <button className="btn ghost auth-btn">{user.name} ▾</button>
        ) : (
          <a href="/auth" className="btn auth-btn">Iniciar Sesión</a>
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
            <div className="pixel neon-cyan" style={{ fontSize: 11, marginBottom: 16 }}>MENÚ</div>
            <a href="/biblioteca" onClick={() => setMobileMenuOpen(false)}>Biblioteca</a>
            <a href="/salon" onClick={() => setMobileMenuOpen(false)}>Salón de la Fama</a>
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
