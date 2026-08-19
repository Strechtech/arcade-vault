"use client";

import { usePathname } from "next/navigation";
import { User } from "@/app/lib/mockData";

interface SidebarProps {
  user: User | null;
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "biblioteca") {
      return pathname.startsWith("/biblioteca") || pathname.startsWith("/detalle") || pathname.startsWith("/reproductor");
    }
    return pathname.startsWith(`/${path}`);
  };

  return (
    <aside className="av-sidebar">
      <div className="sidebar-content">
        <div className="pixel" style={{ fontSize: 11, marginBottom: 16 }}>MENÚ</div>
        <nav className="sidebar-nav">
          <a
            href="/biblioteca"
            className={`sidebar-link ${isActive("biblioteca") ? "active" : ""}`}
          >
            Biblioteca
          </a>
          <a
            href="/salon"
            className={`sidebar-link ${isActive("salon") ? "active" : ""}`}
          >
            Salón de la Fama
          </a>
          {user ? (
            <a href="/perfil" className="sidebar-link">
              Cuenta
            </a>
          ) : (
            <a href="/auth" className="sidebar-link">
              Iniciar Sesión
            </a>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="pixel" style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}>
            CRÉDITOS · 03
          </div>
        </div>
      </div>
    </aside>
  );
}
