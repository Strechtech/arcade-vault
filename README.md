## Arcade Vault

Plataforma de gaming online para jugar clásicos de arcade y competir por puntos.

## Tech Stack

- **Next.js 16.3.1** (App Router)
- **React 19.2.8**
- **TypeScript 5** (strict mode)
- **Tailwind CSS 4**
- **Resend** (email delivery)

## Features Implementadas

### Página Home
- Hero section con call-to-action
- Showcase de juegos destacados
- Stats en tiempo real
- Activity feed
- Pricing section
- Reveal animations con IntersectionObserver

### Página About
- Información del proyecto
- Sección de contacto con formulario
- Validación de inputs con shake animation
- Integración de email via Resend API

### Contact Form + Email System
- Endpoint: `POST /api/contact`
- Envía email de confirmación al usuario
- Notificación al equipo
- Estados: loading, sent, error handling
- Reset automático de form después de envío

## Spec Driven Design

Basado en /specs y /spec-impl según: https://github.com/Klerith/fernando-skills

Specs implementadas:
- `01-mvp-pantallas-arcade.md` ✅
- `02-mvp-home-about-pages.md` ✅
- `03-home-about-resend.md` ✅ (en progreso)

## Configuración

Crear `.env.local`:
```
RESEND_API_KEY=<tu-api-key-de-resend>
RESEND_TO_EMAIL=<email-del-equipo>
```

## Commands

```bash
npm run dev      # Dev server (http://localhost:3000)
npm run build    # Build producción
npm start        # Run production build
npm run lint     # ESLint check
```

## Estructura

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── about/
│   └── page.tsx        # About page
├── api/
│   └── contact/
│       └── route.ts    # Contact form endpoint
├── components/
│   └── TopBar.tsx      # Navigation
└── globals.css         # Styling
```
