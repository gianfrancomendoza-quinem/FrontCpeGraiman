# CPE Perú - Dashboard de Facturación Electrónica

Dashboard profesional enterprise para automatización y gestión de facturas electrónicas con dos vistas integradas: Administrador y Proveedor.

## 🎨 Características

✨ **Diseño Enterprise 2026**
- Estilo Glassmorphism con Deep Navy + Esmeralda
- Inter font, espaciado generoso, transiciones suaves

📊 **Vista Administrador**
- 4 KPI Cards animadas (Total, Validados, Errores, Última Sync)
- Tabla densa con sorting y filtros avanzados
- Sincronización Oracle con estado de carga
- Skeleton loaders durante carga de datos

📤 **Vista Proveedor**
- Zona Drag & Drop para subida de PDFs
- Mis Comprobantes con semáforo de estados (5 estados)
- Estadísticas rápidas (Total, Éxito, Validados, Extraídos, Errores)
- Alertas visuales con tooltips

🎯 **Estados de Comprobantes** (5 estados)
- **READY**: Recién creado
- **EXTRACTED**: Datos extraídos por Gemini
- **VALIDATED**: Validado, listo para envío
- **SUCCESS**: Factura creada exitosamente
- **ERROR**: Error en procesamiento

🎯 **Componentes**
- Status Badge (5 estados: Ready/Extracted/Validated/Success/Error)
- Sidebar colapsable responsivo
- Filtros avanzados (RUC, Estado, Fecha)
- Toast notifications para feedback

⚡ **Performance**
- Animaciones smooth (pulse, count-up, fade-in)
- Transiciones optimizadas
- Respeta prefers-reduced-motion
- Responsive desde 320px

## 🚀 Quick Start

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📁 Estructura

```
app/
├── page.tsx              # Página principal
├── layout.tsx            # Layout root
└── globals.css           # Estilos globales + tokens

components/
├── admin-view.tsx        # Vista Administrador
├── provider-view.tsx     # Vista Proveedor
├── dashboard-layout.tsx  # Layout principal
├── kpi-card.tsx         # Cards KPI
├── invoice-table.tsx    # Tabla de facturas
├── filter-section.tsx   # Filtros avanzados
└── [otros componentes]

hooks/
└── use-count-up.ts      # Hook para animación de números
```

## 🎨 Paleta de Colores

- **Deep Navy**: `#0F172A` (Fondo)
- **Esmeralda**: `#10B981` (Éxito/CTA)
- **Sky Blue**: `#0EA5E9` (Proceso)
- **Coral**: `#FF6B6B` (Error)
- **Slate**: Varios (Grises neutros)

## 📖 Documentación

Ver [DASHBOARD.md](./DASHBOARD.md) para documentación técnica completa.

## 🔧 Tech Stack

- **Framework**: Next.js 15+
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Language**: TypeScript

## 📝 Mock Data

Incluye 6 facturas de prueba y 4 comprobantes de proveedor. Reemplaza con tu API.

## 🎯 Próximos Pasos

- [ ] Conectar con API SUNAT
- [ ] Autenticación JWT/OAuth
- [ ] Exportación CSV/PDF
- [ ] Notificaciones WebSocket
- [ ] Analytics dashboard
- [ ] Dark mode completo

---

Creado como Senior Frontend Engineer usando v0
