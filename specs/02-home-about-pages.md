# 02 — HOME & ABOUT PAGES SPEC

**Status**: Aprobado 
**Version**: 1.0  
**Date**: 2026-08-20

---

## Overview

Página de inicio (HOME) y página de información (ABOUT) con navegación principal, formulario de contacto, y visualización de datos en vivo del arcade.

---

## HOME PAGE

### Hero Section
- **Eyebrow**: "▸ INSERTA UNA MONEDA_" (con cursor parpadeante)
- **Title**: "EL ARCADE CLÁSICO ESTÁ DE VUELTA" (multilinea con gradient)
- **Subtitle**: Descripción breve: "Juega los mejores clásicos directamente en tu navegador. Sin descargas. Sin costo. Solo diversión."
- **CTA Buttons**:
  - "▶ EXPLORAR JUEGOS" → redirect biblioteca
  - "✦ CREAR CUENTA" → redirect auth
- **Background**: Siluetas pixel flotantes animadas (máquinas arcade, monedas, corazones, platillos, D-pad, etc.)
- **Scroll Indicator**: "DESLIZA ▼" con animación bounce

### Why Arcade Vault Section
- **Kicker**: "// 01" (cyan)
- **Title**: "¿POR QUÉ ARCADE VAULT?"
- **Feature Grid** (4 columnas, responsivo):
  1. GAMEPAD icon → "JUEGOS CLÁSICOS" + descripción
  2. FREE icon → "100% GRATIS" + descripción
  3. TROPHY icon → "LADDER BOARDS" + descripción
  4. ROCKET icon → "SIEMPRE CRECIENDO" + descripción
- **Animation**: Reveal on scroll, staggered entrance

### Games Preview Section
- **Kicker**: "// 02" (cyan)
- **Title**: "JUEGOS DISPONIBLES AHORA"
- **Mini Grid**: 6 juegos (responsive: 6/3/2 columnas)
  - Cada card: thumbnail 1:1, título, categoría
- **Action**: Botón "VER TODOS LOS JUEGOS →" → redirect biblioteca

### Stats Section
- **Background**: Oscuro con gradiente amarillo (accent)
- **Stats** (3 columnas, responsivo a 1):
  1. "12+" → "JUEGOS" → "Y CONTANDO"
  2. "MILES" → "DE PARTIDAS" → "JUGADAS CADA DÍA"
  3. "GLOBAL" → "RANKING" → "COMPITE CON EL MUNDO"
- **Animation**: Reveal on scroll, staggered by 90ms

### Live Activity Section
- **Kicker**: "// 03" (yellow)
- **Title**: "ACTIVIDAD EN VIVO"
- **Grid** (2 columnas, responsivo a 1):
  
  **Left Card: Recent Scores**
  - Title: "▸ ÚLTIMAS PUNTUACIONES"
  - Ticker: Lista animada de jugadores, juegos, puntuaciones, timestamps
  - Colores por jugador (cyan, yellow, green, magenta)
  
  **Right Card: Top Players Today**
  - Title: "▸ TOP JUGADORES · HOY"
  - Link: "VER SALÓN →"
  - Leaderboard: Top 5 con rank, nombre, puntuación
  - Barra visual de puntuación progresiva
  - Colores especiales: #1 gold, #2 silver, #3 bronze

### Pricing Section
- **Kicker**: "// 04" (green)
- **Title**: "PRECIOS"
- **Grid** (2 columnas, responsivo a 1):
  
  **Left: Price Card**
  - Label: "PLAN ÚNICO"
  - Name: "JUGADOR VAULT"
  - Price: "$0 / SIEMPRE"
  - Tag: "SIN TRUCOS · SIN LETRA PEQUEÑA"
  - Features checklist (✔ prefix):
    - Acceso a todos los juegos
    - Ranking global y salón de la fama
    - Sin anuncios entre partidas
    - Guarda tus puntuaciones
    - Nuevos juegos cada mes
    - Funciona en cualquier navegador
  - CTA: "EMPEZAR GRATIS →" (pulse animation)
  - Footer: "No pedimos tarjeta. Nunca lo haremos."
  - Stamp: "FREE PLAY"
  
  **Right: FAQ**
  - ¿REALMENTE ES GRATIS?
  - ¿NECESITO CREAR CUENTA?
  - ¿CÓMO SOBREVIVEN SIN COBRAR?

### Final CTA Section
- **Title**: "¿LISTO PARA JUGAR?"
- **Button**: "INSERTAR MONEDA →"
- **Subtext**: "Gratis. Sin registro obligatorio. Empieza en segundos."

---

## NAVIGATION BAR

**Persistent across all pages**

### Desktop Layout
- **Logo**: Mark (gradient) + "ARCADE VAULT" (cyan + magenta)
- **Links** (left-aligned after logo):
  - Inicio
  - Biblioteca
  - Salón de la Fama
  - Acerca de
- **Spacer**: Flex grow
- **Credit Counter**: Coin icon + "CRÉDITOS · 03"
- **Auth Button**:
  - Logged out: "Iniciar Sesión"
  - Logged in: "{username} ▾" (dropdown option)
- **Hamburger**: Hidden on desktop

### Mobile Layout (< 840px)
- Logo + hamburger visible
- Links/coins hidden
- Hamburger opens side panel from right
- Panel: Vertical menu + créditos counter

### Styling
- Sticky top (z-index 50)
- Background: Blurred dark gradient
- Bottom border: Cyan line (opacity 0.18)
- Active link: Cyan text + glow + underline

---

## ABOUT PAGE

### Hero Section
- **Kicker**: "▸ ACERCA DE"
- **Title**: "ACERCA DE ARCADE VAULT"
- **Mission**: ~4 líneas sobre el proyecto (preservar arcade clásicos, accesibilidad, sin costo)
- **Highlights** (3 columnas, responsivo a 1):
  1. HEART icon → "HECHO CON ❤️ PARA JUGADORES"
  2. BROWSER icon → "JUEGOS EN HTML — CORREN EN CUALQUIER NAVEGADOR"
  3. PLANT icon → "PROYECTO EN CONSTANTE CRECIMIENTO"

### Divider Section
- **Visual**: Línea gradiente + píxeles parpadeantes animados (24 píxeles con delay escalonado)
- **Colors**: Rotate cyan/magenta/yellow

### Contact Section
- **Kicker**: "▸ CONTACTO"
- **Title**: "CONTÁCTANOS"
- **Subtitle**: Invitación a escribir sugerencias
- **Tips** (vertical list):
  - LED green: "RESPUESTA EN 24-48H"
  - LED yellow: "SUGERENCIAS BIENVENIDAS"
  - LED magenta: "SIN SPAM, JAMÁS"

**Contact Form**:
- **Fields**:
  - NOMBRE (text, placeholder: "px_kai")
  - CORREO ELECTRÓNICO (email, placeholder: "jugador@vault.gg")
  - MENSAJE (textarea 5 rows, placeholder: "Cuéntanos qué tienes en mente…")
- **Submit Button**: "▶ ENVIAR MENSAJE" (full width)
- **Validation**: Todos los campos requeridos, shake animation si falla
- **Success State**: Terminal-style UI
  - Bar con dots (red, yellow, green)
  - Title: "VAULT-OS // TERMINAL"
  - Output lines con animación typewriter
  - Button: "ENVIAR OTRO MENSAJE"
  - Mensaje: "> MENSAJE RECIBIDO. TE RESPONDEREMOS PRONTO. GRACIAS, {NAME}._"

---

## SHARED COMPONENTS

### Button Styles
- **Base** (.btn):
  - Pixel font, 10px, uppercase
  - Cyan border, transparent bg
  - Glow on hover
  - Pressed state (scale + offset)
  - Clip-path corner cutout
  
- **Variants**:
  - `.magenta` — magenta border/glow
  - `.yellow` — yellow border/glow
  - `.ghost` — faint border, no glow
  - `.lg` — 16px padding, 12px font
  - `.xl` — 20px padding, 14px font
  - `.pulse` — continuous glow animation

### Animations
- **reveal**: On scroll, fade-in + slide-up over 600ms
- **float**: Silhouettes, translateY + rotate, 6s cycle
- **pulse**: Button glow, 1.6s ease-in-out
- **bounce**: Scroll indicator, 1.6s
- **drift**: Enemy positions, 2.8–3.2s
- **bob**: Player ship, 2s
- **rise**: Leaderboard rows, 360ms
- **gridscroll**: Perspective grid floor, 8s

### Color Palette
- **Neon**: cyan (#00f5ff), magenta (#ff006e), yellow (#f5ff00), green (#00ff88)
- **Accent**: gold (#ffcf3a), silver (#c7d0e0), bronze (#d97a3a)
- **Background**: #0a0a0f (dark), #0f0f18 (medium), #15151f (light)
- **Text**: #e6e9ff (primary), #8a8fb5 (dim), #4a4f70 (faint)

### Typography
- **Pixel Font**: "Press Start 2P" (headings, labels, status)
- **Mono Font**: "JetBrains Mono" (body, inputs, timestamps)

### Responsive Breakpoints
- Desktop: Default
- Tablet (≤ 980px): Feature grid → 2 columns
- Mobile (≤ 840px): Navbar shrinks, hamburger appears
- Small (≤ 720px): Single column layouts, reduced padding
- Very Small (≤ 520px): Further condensed

---

## DATA REQUIREMENTS

### Games Data
- Array of game objects with: id, title, category, cover (class name), description
- Sample: Arkanoid, Tetris, Snake, Glotón, Invasores, Rocas, Ranaria, Duel, Bloque Buster, Caída

### Live Activity Mock
- Recent scores: 7–10 entries (player, game, score, time)
- Top players: 5 entries (rank, player, score)

### Contact Form
- POST endpoint to receive: name, email, message
- Response: Success confirmation with typed animation

---

## INTERACTION FLOW

### Page Navigation
1. User lands on HOME
2. Reads hero, scrolls through sections
3. Clicks "EXPLORAR JUEGOS" → Biblioteca
4. Clicks "CREAR CUENTA" → Auth
5. Clicks "ACERCA DE" → About
6. Fills contact form → success terminal UI

### Mobile Menu
1. Tap hamburger
2. Side panel slides in from right
3. Tap link or outside panel
4. Panel slides out

---

## TECHNICAL NOTES

- All text in Spanish (MX/Latin American Spanish)
- Neon glow effects via text-shadow and drop-shadow filters
- Pixel-perfect alignment for arcade aesthetic
- Reveal animations triggered via Intersection Observer
- Sticky navbar with blur backdrop
- Mobile-first responsive design
- No external images (all CSS-generated or SVG)

---

## ACCEPTANCE CRITERIA

- [ ] HOME page renders hero with floating silhouettes
- [ ] All sections reveal on scroll with correct animations
- [ ] Navigation bar is sticky and responsive
- [ ] Features grid displays 4 cards (2 on tablet, 1 on mobile)
- [ ] Games preview shows 6 cards (3 on tablet, 2 on mobile)
- [ ] Live activity ticker scrolls continuously
- [ ] Leaderboard colors correct (gold/silver/bronze)
- [ ] CTA buttons navigate correctly
- [ ] ABOUT page displays mission and highlights
- [ ] Contact form validates and submits
- [ ] Success state shows terminal UI with typewriter animation
- [ ] All neon colors glow correctly
- [ ] Mobile menu opens/closes smoothly
- [ ] No layout breaks at any breakpoint
- [ ] Performance: Smooth animations (60fps)

