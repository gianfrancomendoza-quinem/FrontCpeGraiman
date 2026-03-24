# 📊 CPE Perú - Dashboard de Automatización de Facturas

## Descripción General

Dashboard profesional de administración de facturas electrónicas con arquitectura modular, diseño glassmorphism 2026 y soporte para dos vistas (Administrador y Proveedor).

---

## 🎨 Diseño & Estética

### Paleta de Colores
- **Base**: Deep Navy (`#0F172A`) - Fondo principal
- **Éxito**: Esmeralda (`#10B981`) - Estados aceptados, CTA principal
- **Advertencia**: Sky Blue (`#0EA5E9`) - Estados en proceso
- **Error**: Coral (`#FF6B6B`) - Estados observados/rechazados

### Tipografía
- **Heading**: Inter Bold/SemiBold
- **Body**: Inter Regular/Medium
- **Mono**: Fira Code (para RUCs y datos técnicos)

### Efectos Visuales
- **Glassmorphism**: `backdrop-blur-md` + `bg-white/5` + `border-white/10`
- **Animaciones**: Pulse suave en pendientes, fade-in en tablas, count-up en KPIs
- **Hover Effects**: Elevación (`-translate-y-1`), sombras emerald, cambio de opacidad

---

## 🏗️ Estructura de Componentes

### Core Components
```
components/
├── dashboard-layout.tsx      # Layout principal con sidebar colapsable
├── dashboard-header.tsx      # Header fijo con notificaciones y user info
├── sidebar-nav.tsx           # Navegación con toggle de vistas
├── kpi-card.tsx              # Cards KPI con animaciones
├── status-badge.tsx          # Estados con tooltip (3 estados)
├── invoice-table.tsx         # Tabla con sorting y skeleton loader
├── table-skeleton.tsx        # Skeleton loader customizable
├── filter-section.tsx        # Filtros avanzados (RUC, Estado, Fecha)
├── drag-drop-zone.tsx        # Upload zone para PDFs
├── sync-button.tsx           # Botón Oracle sync con loader
└── toast.tsx                 # Notificaciones tipo toast
```

### View Components
```
├── admin-view.tsx            # Vista Administrador (4 KPIs + tabla + filtros)
├── provider-view.tsx         # Vista Proveedor (upload + mis comprobantes)
└── app/page.tsx              # Página principal (integración)
```

### Hooks
```
hooks/
├── use-count-up.ts           # Animación de contadores
├── use-mobile.tsx            # Detección de responsive
└── use-toast.ts              # Gestión de notificaciones
```

---

## 🎯 Funcionalidades Principales

### Vista Administrador
1. **4 KPI Cards Animadas**
   - Total Facturas (count-up animation)
   - Pendientes (pulse animation + badge rojo)
   - Errores Críticos (con alerta)
   - Última Sincronización Oracle

2. **Tabla Densa de Facturas**
   - Columnas: RUC | Empresa | Tipo | Monto | Estado | Fecha
   - Sorting interactivo (RUC, Monto, Fecha)
   - Skeleton loader durante carga
   - Status badges con colores

3. **Filtros Avanzados**
   - Búsqueda por RUC
   - Filtro por Estado (Aceptado/Proceso/Observado/Rechazado)
   - Filtro por Rango de Fechas

4. **Botón Sincronizar Oracle**
   - Estado de carga con spinner
   - Timestamp de última sincronización

### Vista Proveedor
1. **Estadísticas Rápidas**
   - Total, Aceptados, En Proceso, Observados

2. **Drag & Drop Zone**
   - Upload de PDFs (máx 10 archivos)
   - Feedback visual durante drag
   - Lista de archivos cargados

3. **Mis Comprobantes**
   - Tabla simplificada (solo datos del proveedor)
   - Status badges con semáforo visual
   - Alertas de observaciones/procesos

---

## 🎛️ Comportamientos Interactivos

### Responsive Design
- **Mobile**: Sidebar colapsable por defecto
- **Tablet**: Sidebar expandible, grid 2 columnas
- **Desktop**: Sidebar expandido, grid 4 columnas

### Animaciones
- **Count-Up**: Números en KPIs cuentan hasta el valor
- **Pulse Smooth**: Animación suave en "Pendientes"
- **Hover Effects**: Elevación de cards, cambio de opacidad
- **Transitions**: 150ms cubic-bezier para todas las propiedades

### Accesibilidad
- Respeta `prefers-reduced-motion`
- Tooltips con información adicional
- Labels semánticas en inputs
- ARIA roles en componentes interactivos

---

## 🚀 Instalación & Setup

```bash
# Clonar y instalar
git clone [repo-url]
cd v0-project
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build
pnpm start
```

---

## 📋 Datos Mock

- **6 Facturas de prueba** en `admin-view.tsx`
- **4 Comprobantes de proveedor** en `provider-view.tsx`
- Reemplazar con API calls según necesidad

---

## 🔄 Next Steps

1. Conectar con API real de SUNAT/Oracle
2. Implementar autenticación (JWT/OAuth)
3. Agregar exportación a CSV/PDF
4. Notificaciones en tiempo real (WebSocket)
5. Analytics y reportes detallados
6. Dark mode toggle (ya estructurado en CSS)

---

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Responsive hasta 320px (mobile-first)

---

**Creado con ❤️ usando Next.js 15, Tailwind CSS, shadcn/ui y Lucide Icons**
