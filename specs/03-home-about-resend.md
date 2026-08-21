# 03 — HOME & ABOUT PAGES + RESEND EMAIL

**Status**: Aprobado  
**Version**: 1.0  
**Date**: 2026-08-20  
**Depends on**: SPEC 02 (visual structure and layout)

---

## Overview

Implementar las páginas HOME y ABOUT del spec 02 usando el template como referencia visual, adaptándolas a Next.js App Router, e integrar Resend para envío de emails desde el formulario de contacto.

---

## Scope

**In:**
- Página HOME: hero, feature grid, games preview, stats, live activity, pricing, CTA sections
- Página ABOUT: hero, highlights, divider, contact section con formulario
- Barra de navegación: desktop + mobile responsive
- Formulario de contacto en About: validación de campos requeridos
- API route `/api/contact` para procesar y enviar emails via Resend
- Dos emails: confirmación al usuario + notificación al equipo
- Manejo de errores: log silencioso, frontend siempre muestra éxito
- Variables env para Resend API key y email destino

**Not in:**
- Integración con base de datos para guardar contactos (futuro)
- Sistema de templates dinámicos en Resend (usar templates simples hardcoded)
- Autenticación requerida en About
- A/B testing de copy o diseño
- Analytics o tracking de form submissions
- Implementación de otras páginas (Biblioteca, Salón de la Fama, Auth)

---

## Data Model

No se introduce nuevas entidades persistidas. El formulario de contacto usa:

```typescript
// Contact form data (transient)
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// API response
interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}
```

Variables de entorno:

```
NEXT_PUBLIC_RESEND_API_KEY=... (clave pública o privada según setup)
RESEND_TO_EMAIL=team@arcade-vault.gg
```

---

## Implementation Plan

### 1. Setup y dependencias
- [ ] Instalar `resend` package: `npm install resend`
- [ ] Crear archivo `.env.local` con `RESEND_TO_EMAIL` y `NEXT_PUBLIC_RESEND_API_KEY` (o `RESEND_API_KEY` si backend-only)
- [ ] Verificar Resend API key funciona (test en docs)

### 2. Copiar template a app/
- [ ] Copiar `about.jsx` → `app/about/page.tsx` (adaptar React 19 + TypeScript)
- [ ] Copiar `home.jsx` → `app/page.tsx` (home page)
- [ ] Copiar `nav.jsx` → `app/components/Nav.tsx` (navbar)
- [ ] Copiar `styles.css` → `app/globals.css` (merge con estilos existentes)
- [ ] Copiar `arcade-vault-standalone.html` assets (iconos, si aplica) → `public/`

### 3. Integración en Layout y Rutas
- [ ] Importar `Nav` en `app/layout.tsx` y renderizar en todas las páginas
- [ ] Asegurar `app/about/page.tsx` accesible en `/about`
- [ ] Asegurar `app/page.tsx` es home (ruta `/`)
- [ ] Aplicar Tailwind reset y theming (dark mode class strategy)

### 4. Crear API route para emails
- [ ] Crear `app/api/contact/route.ts` con POST handler
- [ ] Validar campos: name, email, message (no vacíos)
- [ ] Resend setup: crear instancia con API key
  ```typescript
  const resendApiKey = process.env.RESEND_API_KEY;
  const teamEmail = process.env.RESEND_TO_EMAIL;
  // Verificar que ambas env vars existen
  ```
- [ ] Enviar email #1 (confirmación al usuario):
  - To: form.email
  - Subject: "Hemos recibido tu mensaje - Arcade Vault"
  - Body: Template simple con nombre y agradecimiento
- [ ] Enviar email #2 (notif al equipo):
  - To: `process.env.RESEND_TO_EMAIL` (leer de env var, no hardcodear)
  - Subject: "Nuevo contacto: {name}"
  - Body: Template con name, email, message, timestamp
- [ ] Manejar errores de Resend: log en console, return `{ success: true }` igual
- [ ] Validar que `process.env.RESEND_TO_EMAIL` existe en .env.local, si no → error del dev
- [ ] Rate limiting (opcional): máximo 5 requests por IP/hora para evitar spam

### 5. Actualizar componentes
- [ ] About.tsx: cambiar `onSubmit` para POST a `/api/contact` en lugar de mock
- [ ] Mostrar loading state en botón mientras se envía
- [ ] Capturar respuesta y mostrar success state si `response.success === true`
- [ ] En error de red: mostrar toast/alert, permitir reintentar (SPEC decidió silent fail)

### 6. Responsive & Testing
- [ ] Verificar nav responsive: desktop navbar ↔ mobile hamburger menu
- [ ] Verificar formulario valida y rechaza inputs vacíos (shake animation)
- [ ] Probar success state terminal UI con nombre del usuario
- [ ] Probar en móvil: touch interactions, layout single-column
- [ ] Verificar Resend sandbox mode si aún no en producción

### 7. Documentación & Cleanup
- [ ] Remover console.logs de debug
- [ ] Documentar variables env en `.env.example`
- [ ] Actualizar README si aplica
- [ ] Commit con mensaje claro

---

## Acceptance Criteria

- [ ] HOME page renderiza hero con siluetas flotantes pixel animadas
- [ ] HOME: todas las secciones (hero, features, games, stats, live activity, pricing) revelan on scroll
- [ ] HOME: responsive a mobile (breakpoints 840px, 720px, 520px)
- [ ] HOME: botones CTA navegan correctamente
- [ ] ABOUT page renderiza hero con mission + highlights
- [ ] ABOUT: divider con píxeles parpadeantes animados
- [ ] ABOUT: formulario valida campos (shake si vacío)
- [ ] ABOUT: al enviar, POST a `/api/contact` exitoso
- [ ] ABOUT: recibe response success, muestra terminal UI con nombre
- [ ] Emails: usuario recibe confirmación en inbox
- [ ] Emails: equipo recibe notificación con detalles contacto
- [ ] Errores Resend loguean pero no rompen UX (silent fail)
- [ ] Nav sticky, responsive, logo clickeable, links activos resaltados
- [ ] Nav mobile: hamburger abre panel, cierra al clickear link
- [ ] Neon colors glean correctamente: cyan #00f5ff, magenta #ff006e, yellow #f5ff00, green #00ff88
- [ ] No layout breaks en ningún breakpoint
- [ ] Performance: animaciones 60fps, scroll smooth
- [ ] Variables env configuradas: RESEND_TO_EMAIL, RESEND_API_KEY

---

## Decisions Taken and Discarded

| Decision | Rationale | Alternative |
|----------|-----------|-------------|
| Copiar template como-está → Next.js | Mantiene diseño pixel-perfect del template. Faster time to pixel. | Reescribir desde spec 02 → más tiempo. |
| API route backend para Resend | Protege API key, centraliza lógica, evita CORS. | Frontend directo → expone key, inseguro. |
| Silent fail (log error, success UI) | UX no se rompe si Resend down. Usuario ve confirmación igual. | Show error → confunde, reduce conversión. |
| Email destino desde env var | Flexible deployment (dev/staging/prod cambio env). | Hardcoded → refactor en cada deploy. |
| Two emails (user confirm + team notify) | User closure. Team context. Balance. | Single email → less UX. |
| Tailwind CSS merge con template CSS | Convierte pixel-static a utility-first. Mantiene visual. | Rewrite CSS Tailwind from scratch → tiempo. |
| No database persistence yet | Spec pide solo envío. Guardar contactos = futuro spec. | Include DB → scope creep. |

---

## Identified Risks

1. **Resend API limits**: Free tier has request cap. Si form viral, puede hit limit.
   - *Mitigation*: Rate limiting en API route (5 req/IP/hour), queue messages si needed.

2. **Email templates HTML**: Hardcoded strings en route.ts puede ser frágil.
   - *Mitigation*: Usar Resend template IDs si escalamos. Documentar emails en markdown.

3. **Mobile form UX**: Textarea resize en mobile puede ser clunky.
   - *Mitigation*: Test en real devices, ajustar row height.

4. **Timezone en timestamps**: Email timestamp puede confundir si timezone server ≠ user.
   - *Mitigation*: Usar ISO string, mostrar timezone en email.

5. **Fallback si Resend SDK falla import**: Node.js env issue.
   - *Mitigation*: Try-catch en route handler, log error, return success anyway.

---

## Technical Notes

- **Framework**: Next.js 16.3.1 + App Router
- **Email**: Resend (https://resend.com/docs)
- **Language**: TypeScript 5 strict
- **Styling**: Tailwind CSS 4 + custom CSS from template
- **Forms**: React hooks (useState) + fetch API
- **Animations**: CSS keyframes + Intersection Observer
- **Fonts**: Press Start 2P (headings), JetBrains Mono (body)
- **Responsive**: Mobile-first, breakpoints 520px, 720px, 840px, 980px
- **Browser support**: Modern browsers (ES2020+)
