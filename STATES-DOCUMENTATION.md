# Documentación de Estados - CPE Dashboard

## Flujo de Procesamiento de Comprobantes

El sistema de automatización de facturas electrónicas maneja 5 estados principales que representan el ciclo de vida completo de un comprobante desde su carga hasta su procesamiento exitoso.

---

## Estados Disponibles

### 1. **READY** (Recién Creado)
- **Color**: Azul (`text-blue-400`, `bg-blue-400/10`)
- **Icono**: `FileText`
- **Descripción**: El comprobante acaba de ser cargado al sistema, listo para procesamiento
- **Siguiente estado**: `EXTRACTED`
- **Acciones**: Puede descargarse, editarse o eliminarse

```typescript
status: 'ready'
```

### 2. **EXTRACTED** (Datos Extraídos)
- **Color**: Ámbar (`text-amber-400`, `bg-amber-400/10`)
- **Icono**: `Zap`
- **Descripción**: Los datos han sido extraídos automáticamente por Gemini, pendiente de validación
- **Siguiente estado**: `VALIDATED` o `ERROR`
- **Acciones**: Revisar datos extraídos, realizar correcciones si es necesario

```typescript
status: 'extracted'
```

### 3. **VALIDATED** (Validado - Listo para Envío)
- **Color**: Cielo (`text-sky-400`, `bg-sky-400/10`)
- **Icono**: `CheckSquare`
- **Descripción**: Los datos han sido validados correctamente y están listos para enviar a creación de factura
- **Siguiente estado**: `SUCCESS` o `ERROR`
- **Acciones**: Proceder con creación de factura en el sistema

```typescript
status: 'validated'
```

### 4. **SUCCESS** (Éxito - Factura Creada)
- **Color**: Esmeralda (`text-emerald-400`, `bg-emerald-400/10`)
- **Icono**: `CheckCircle2`
- **Descripción**: La factura ha sido creada exitosamente en el sistema
- **Siguiente estado**: Ninguno (estado final)
- **Acciones**: Descargar comprobante, ver detalles, replicar

```typescript
status: 'success'
```

### 5. **ERROR** (Error)
- **Color**: Rojo (`text-red-400`, `bg-red-400/10`)
- **Icono**: `AlertCircle`
- **Descripción**: Ha ocurrido un error en alguna fase del procesamiento
- **Siguiente estado**: `READY` (reintentar)
- **Acciones**: Ver detalles del error, corregir datos, reintentar procesamiento

```typescript
status: 'error'
```

---

## Transiciones de Estados

```
┌─────────┐
│  READY  │  (Recién cargado)
└────┬────┘
     │
     ▼
┌──────────┐
│EXTRACTED │  (Extraído por Gemini)
└────┬─────┘
     │
     ├─────────────────────────┐
     │                         │
     ▼                         ▼
┌───────────┐            ┌────────┐
│VALIDATED  │            │ ERROR  │ (Fallo en extracción)
└─────┬─────┘            └────────┘
      │
      ├─────────────────┐
      │                 │
      ▼                 ▼
 ┌─────────┐      ┌────────┐
 │ SUCCESS │      │ ERROR  │ (Fallo en creación)
 └─────────┘      └────────┘
 (Final)          (Reintentar)
```

---

## Contadores en Dashboard

### Vista Administrador
- **Total de Comprobantes**: Suma de todos los estados
- **Validados (Listos)**: Conteo de estado `VALIDATED` (ready to submit)
- **Con Errores**: Conteo de estado `ERROR` (requieren revisión)
- **Última Sincronización**: Timestamp de última actualización Oracle

### Vista Proveedor
- **Total**: Suma de todos los comprobantes del proveedor
- **Éxito**: Comprobantes con estado `SUCCESS`
- **Validados**: Comprobantes listos en estado `VALIDATED`
- **Extraídos**: Comprobantes en estado `EXTRACTED`
- **Errores**: Comprobantes en estado `ERROR`

---

## Colores por Estado - Referencia Rápida

| Estado | Hex Color | Tailwind | Descripción |
|--------|-----------|----------|-------------|
| READY | #3B82F6 | `blue-400` | Nuevo documento |
| EXTRACTED | #F59E0B | `amber-400` | Datos extraídos |
| VALIDATED | #0EA5E9 | `sky-400` | Validado, listo |
| SUCCESS | #10B981 | `emerald-400` | Proceso completo |
| ERROR | #EF4444 | `red-400` | Error detectado |

---

## Implementación en Componentes

### StatusBadge
```typescript
import { StatusBadge } from '@/components/status-badge'

// Uso
<StatusBadge status="validated" />

// Con tooltip
<StatusBadge 
  status="validated" 
  tooltip="Listo para enviar a creación de factura"
/>
```

### Invoice Interface
```typescript
interface Invoice {
  id: string
  ruc: string
  company: string
  type: string
  amount: number
  status: 'ready' | 'extracted' | 'validated' | 'completed' | 'error'
  date: string
  lastUpdate: string
}
```

### Filtrado por Estado
```typescript
// Filtrar comprobantes validados
const validated = invoices.filter(i => i.status === 'validated')

// Filtrar errores
const errors = invoices.filter(i => i.status === 'error')

// Contar éxitos
const successCount = invoices.filter(i => i.status === 'completed').length
```

---

## Manejo de Errores

Cuando un comprobante entra en estado `ERROR`:
1. Se registra el motivo del error en `lastUpdate`
2. El usuario puede ver el detalle del error
3. Se puede hacer reintentar el procesamiento
4. El estado vuelve a `READY` o `EXTRACTED` según corresponda

---

## API Integration (Próximo Paso)

Para integrar con tu API real:

```typescript
// Actualizar estado
async function updateInvoiceStatus(invoiceId: string, newStatus: StatusType) {
  const response = await fetch('/api/invoices/update-status', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ invoiceId, status: newStatus })
  })
  return response.json()
}

// Procesar extracción con Gemini
async function extractInvoiceData(pdfFile: File) {
  const formData = new FormData()
  formData.append('file', pdfFile)
  
  const response = await fetch('/api/invoices/extract', {
    method: 'POST',
    body: formData
  })
  
  return response.json() // { status: 'extracted', data: {...} }
}
```

---

## Notas Importantes

- Los estados son **inmutables** en términos de historial (se registran todos)
- El campo `lastUpdate` guarda la marca de tiempo del último cambio
- Los filtros pueden combinar múltiples estados
- Las animaciones (pulse) se aplican a estados críticos como `EXTRACTED`
