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
        <div className="sidebar-footer">
          <div className="pixel" style={{ fontSize: 9, color: "var(--ink-faint)", letterSpacing: "0.16em" }}>
            CRÉDITOS · 03
          </div>
        </div>
      </div>
    </aside>
  );
}
