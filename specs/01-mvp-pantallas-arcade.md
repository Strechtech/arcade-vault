# Spec 01: MVP Pantallas Arcade

**State:** Implementado + `/inicio`
**Date:** 2026-08-19 | Updated: 2026-08-20
**Depends on:** —

**Objetivo:** Implementar todas las pantallas visuales del MVP de Arcade Vault (inicio, auth, biblioteca, detalle, reproductor, salon) como rutas Next.js con layout global, navegación navbar, y mock data estructurada.

---

## Scope

**IN:**
- ✅ Convertir templates (`auth.jsx`, `biblioteca.jsx`, `detalle.jsx`, `reproductor.jsx`, `salon.jsx`, `home.jsx`, `about.jsx`) a rutas Next.js
- ✅ Ruta `/inicio` → home-about landing con hero, features, games preview, stats, activity, pricing
- ✅ Root layout global (`app/layout.tsx`) con nav integrado
- ✅ Route group `(auth)` separado, sin nav
- ✅ Route group `(main)` para páginas protegidas con nav
- ✅ Nav: topbar con links (Inicio, Biblioteca, Salón, Auth)
- ✅ Mock data estructurada en `app/lib/mockData.ts` (games, users, leaderboard)
- ✅ TypeScript strict mode
- ✅ Estilos: globals.css (neon arcade, pixel fonts, animaciones reveal/float)

**OUT:**
- Lógica de autenticación real (solo UI + mock)
- Juegos implementados
- Persistencia de datos (localStorage, BD)
- Responsive móvil (solo desktop CSS; mobile pendiente en otro spec)
- Modales (anotado para después)

---

## Data Model

```typescript
// app/lib/mockData.ts
interface Game {
  id: string
  title: string
  image: string
  points: number
}

interface User {
  id: string
  name: string
  points: number
  avatar: string
}

interface SalonGame {
  id: string
  title: string
  players: number
  status: 'active' | 'waiting' | 'finished'
}

// Mock data exports:
export const mockGames: Game[] = [...]
export const mockUser: User = {...}
export const mockSalonGames: SalonGame[] = [...]
```

---

## Implementation Plan

1. Crear estructura de rutas:
   - ✅ `app/layout.tsx` (root, incluye TopBar nav)
   - ✅ `app/page.tsx` (redirect a `/inicio`)
   - ✅ `app/inicio/page.tsx` (landing hero con sections)
   - ✅ `app/(auth)/layout.tsx` y `app/(auth)/page.tsx` (login visual)
   - ✅ `app/(main)/layout.tsx` (con nav heredado)
   - ✅ `app/(main)/biblioteca/page.tsx`
   - ✅ `app/(main)/detalle/page.tsx`
   - ✅ `app/(main)/reproductor/page.tsx`
   - ✅ `app/(main)/salon/page.tsx`

2. Crear componentes nav:
   - `app/components/Sidebar.tsx`
   - `app/components/TopBar.tsx`

3. Crear mock data:
   - `app/lib/mockData.ts` con interfaces TypeScript

4. Migrar templates a componentes React (JSX → TSX):
   - Reemplazar estilos inline/CSS por clases Tailwind
   - Integrar mock data en `biblioteca`, `detalle`, `reproductor`, `salon`
   - Auth: formularios visuales (sin POST)

5. Verificar rutas sin errores:
   - Navegar auth → main flow
   - Verificar nav persiste
   - Sin errores TypeScript strict

---

## Acceptance Criteria

- [x] `app/layout.tsx` renderiza sin errores
- [x] Ruta `/` redirige a `/inicio`
- [x] Ruta `/inicio` muestra landing completo (hero + features + games + stats + activity + pricing)
- [x] Ruta `/auth` muestra formulario visual (no valida, no envía)
- [x] Rutas `/biblioteca`, `/detalle`, `/reproductor`, `/salon` existen y renderizan
- [x] Nav (TopBar) aparece en todas las rutas con link "Inicio" + logo enruta a `/inicio`
- [x] Estilos home-about integrados en globals.css (neon arcade, pixel fonts)
- [x] Reveal animations (scroll lazy-load) funcionan en `/inicio`
- [x] Responsive: feature-grid 4→2→1 col; mini-rail 6→3→2 col; activity-grid 1.2fr→1fr
- [ ] Mock data se inyecta correctamente en componentes
- [ ] Cero errores TypeScript strict mode
- [ ] Tailwind CSS se aplica correctamente (sin CSS inline legacy)

---

## Decisions Taken

| Decisión | Razón |
|----------|-------|
| Route groups `(auth)` y `(main)` | Separa auth sin nav del flujo principal con nav |
| Mock data en `lib/mockData.ts` | Centralizado, fácil de migrar a API después |
| TypeScript strict | Alineado con stack del proyecto |
| Desktop-first CSS | Mobile pendiente, reduce scope del MVP |

---

## Identified Risks

- **Templates no son React:** Si templates son HTML plano, requiere traducción manual mayor (JSX, props, imports)
- **Estilos CSS legacy:** Si templates usan CSS externo/inline, Tailwind migration puede ser tedioso
- **Rutas anidadas:** Si nav es compartida pero hay rutas especiales (ej: modal sobre reproductor), agrupar route puede limitar
