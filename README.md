# Interactive Capability Module

Módulo reutilizable enterprise-grade inspirado en AmalgamRx (Figma: Stop Fragmentation — FLAMBEE). Integrable en cualquier app Next.js + React sin layouts globales ni navegación.

## Stack

- React 19 + TypeScript
- Next.js 15 (compatible)
- Tailwind CSS
- Framer Motion

## Integración en tu app

```tsx
import { InteractiveCapabilityModule } from "@/modules/interactive-capability";
import "@/modules/interactive-capability/styles/module.css";

export function SolutionsSection() {
  return <InteractiveCapabilityModule />;
}
```

Asegura que `tailwind.config.ts` incluya `./src/modules/**/*.{ts,tsx}` (o copia las extensiones de color de este repo).

## Arquitectura

| Pieza | Rol |
|-------|-----|
| `config/module-data.ts` | Tabs, cards, nodos centrales, líneas SVG, mappings `activeWhen` / `highlightWhen` |
| `lib/resolve-card-state.ts` | Resuelve `inactive` \| `active` \| `highlighted` desde selección |
| `hooks/useCapabilitySelection.ts` | Estado de tabs + estados derivados |
| Componentes | `SolutionsTabs`, `ConfigTabs`, `CapabilityGrid`, `CapabilityCard`, `CentralNode`, `ConnectionLines`, `InteractiveCapabilityModule` |

Las cards **nunca se desmontan**; solo cambian opacidad, borde y glow.

## Personalizar mappings

Cada card define combinaciones `primary:config`:

```ts
highlightWhen: ["caregivers:config-a"],
activeWhen: ["caregivers:config-a", "patients:config-b", /* ... */],
```

## Figma → producción

1. Sustituye iconos en `components/icons/` con SVG exportados.
2. Ajusta `connectionLines[].path` con paths del diseño.
3. Refina tokens en `config/tokens.ts` y `tailwind.config.ts`.

## Layout

- Referencia de diseño: **1920px** (proporciones 480 : 837 : 480).
- El módulo ocupa **100% del ancho** del contenedor hasta `max-width: 1920px`, sin scroll horizontal.
- Entre **1920px** y **1440px** el contenido escala de forma fluida (labels de cajas: **15.5px → 10px**; iconos, gaps y padding en la misma proporción).
- Por debajo de **1440px** se mantiene la escala de 1440 hasta el breakpoint **1280px** (pendiente).
- Por debajo de **1024px** (`max-width: 1023px`): layout tablet vertical centrado; grids de cards con `auto-fill` (columnas según ancho).
- Desde **1024px**: tres columnas fijas por grid lateral, alineadas al borde correspondiente.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para ver el demo.
# Amalgam
