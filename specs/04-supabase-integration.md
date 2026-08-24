# 04 — CONFIGURACIÓN DE CONEXIÓN SUPABASE

**Estado**: Aprobado  
**Versión**: 1.0  
**Fecha**: 2026-08-24

---

## Objetivo

Instalar y configurar cliente Supabase + SSR como infraestructura base para futuros specs de autenticación, base de datos y realtime.

---

## Descripción General

Establecer conexión directa Supabase en proyecto Next.js Arcade Vault. Instalar paquetes, obtener credenciales, configurar variables de entorno, crear clientes browser + servidor.

---

## Alcance

**Incluido:**
- Instalar `@supabase/supabase-js` + `@supabase/ssr`
- Crear proyecto Supabase en supabase.com
- Obtener credenciales: URL, anon key, service role key
- Crear `.env.local` con credenciales
- Crear `lib/client.ts` — cliente Supabase browser
- Crear `lib/server.ts` — cliente Supabase servidor

**Excluido (specs futuros):**
- Schema base de datos (tablas, vistas, índices)
- Páginas o flujos de autenticación
- Rutas API
- Contexto o gestión de estado de auth
- Captura de scores o leaderboard
- Políticas RLS
- Cualquier operación en base de datos

---

## Dependencias

```bash
npm install @supabase/supabase-js @supabase/ssr
```

- `@supabase/supabase-js` (^1.198.0) — librería cliente Supabase
- `@supabase/ssr` (^0.6.0) — adaptador SSR para Next.js

---

## Variables de Entorno

Crear `.env.local` en raíz del proyecto (nunca hacer commit):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```

**Reglas:**
- `NEXT_PUBLIC_SUPABASE_URL` — expuesta en browser, segura
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — expuesta en browser, permisos limitados (RLS)
- `SUPABASE_SERVICE_ROLE_KEY` — solo servidor, **NUNCA exponer al cliente**

---

## Código: Clientes Supabase

### `lib/client.ts` — Cliente Browser

```typescript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
```

### `lib/server.ts` — Cliente Servidor

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}
```

---

## Lista de Implementación

### 1. INSTALAR DEPENDENCIAS
- [ ] Ejecutar: `npm install @supabase/supabase-js @supabase/ssr`

### 2. CREAR PROYECTO SUPABASE
- [ ] Ir a https://supabase.com
- [ ] Registrarse o iniciar sesión
- [ ] Crear nuevo proyecto
- [ ] Esperar inicialización

### 3. OBTENER CREDENCIALES
Del dashboard Supabase → Settings → API, copiar:
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY`

### 4. CREAR `.env.local`
- [ ] Crear archivo `.env.local` en raíz del proyecto
- [ ] Agregar tres variables del paso 3:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx
```
- [ ] Verificar `.env.local` está en `.gitignore`

### 5. CREAR ARCHIVOS CLIENTE
- [ ] Crear `lib/client.ts` (ver código arriba)
- [ ] Crear `lib/server.ts` (ver código arriba)

### 6. VERIFICAR CONEXIÓN
- [ ] Ejecutar: `npm run build`
- [ ] Build exitoso sin errores
- [ ] Conexión lista para siguientes specs

---

## Criterios de Aceptación

- [ ] `@supabase/supabase-js` instalado
- [ ] `@supabase/ssr` instalado
- [ ] Proyecto Supabase creado
- [ ] Credenciales obtenidas: URL, anon key, service role key
- [ ] `.env.local` creado con las tres variables
- [ ] `.env.local` en gitignore (nunca cometido)
- [ ] `lib/client.ts` creado y correcto
- [ ] `lib/server.ts` creado y correcto
- [ ] `npm run build` exitoso
