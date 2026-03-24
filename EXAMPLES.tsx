// Ejemplos de uso de componentes del Dashboard

// ===== KPI Card =====
import { KPICard } from '@/components/kpi-card'
import { BarChart3 } from 'lucide-react'

// Uso básico
<KPICard
  icon={BarChart3}
  label="Total de Facturas"
  value={1250}
  trend={{ direction: 'up', percentage: 12 }}
/>

// Con animación de pulso
<KPICard
  icon={RefreshCw}
  label="Pendientes"
  value={45}
  animate
  footer="⚠ Requieren atención"
/>

// ===== Status Badge =====
import { StatusBadge } from '@/components/status-badge'

// Nuevos estados CPE (Flujo de procesamiento)
<StatusBadge status="ready" />              {/* Azul - Recién Creado */}
<StatusBadge status="extracted" />         {/* Ámbar - Datos Extraídos */}
<StatusBadge status="validated" />         {/* Cielo - Validado */}
<StatusBadge status="COMPLETED" />           {/* Verde - Éxito */}
<StatusBadge status="error" />             {/* Rojo - Error */}

// Con tooltip
<StatusBadge 
  status="validated" 
  tooltip="Listo para enviar a creación de factura"
/>

<StatusBadge 
  status="error" 
  tooltip="Revisar logs para más información"
/>

// ===== Invoice Table =====
import { InvoiceTable, Invoice } from '@/components/invoice-table'

const mockData: Invoice[] = [
  {
    id: '1',
    ruc: '20123456789',
    company: 'Empresa A S.A.',
    type: 'Factura',
    amount: 5400.00,
    status: 'success',
    date: '2024-03-20',
    lastUpdate: '2024-03-20 14:30',
  },
  {
    id: '2',
    ruc: '20987654321',
    company: 'Empresa B Ltda.',
    type: 'Boleta',
    amount: 1200.50,
    status: 'validated',
    date: '2024-03-19',
    lastUpdate: '2024-03-19 10:15',
  },
  {
    id: '3',
    ruc: '20555444333',
    company: 'Empresa C Peru',
    type: 'Factura',
    amount: 8900.00,
    status: 'error',
    date: '2024-03-18',
    lastUpdate: '2024-03-18 16:45',
  },
]
  },
  // ... más registros
]

<InvoiceTable
  data={mockData}
  isLoading={false}
  showActions
  onRowClick={(invoice) => console.log(invoice)}
/>

// ===== Filter Section =====
import { FilterSection } from '@/components/filter-section'

const [filters, setFilters] = useState<FilterState>({
  ruc: '',
  status: '',
  dateFrom: '',
  dateTo: '',
})

<FilterSection onFilterChange={setFilters} />

// ===== Drag & Drop Zone =====
import { DragDropZone } from '@/components/drag-drop-zone'

<DragDropZone
  onFilesDrop={(files) => {
    console.log('Archivos:', files)
    // Procesar archivos
  }}
  accept=".pdf"
  maxFiles={10}
/>

// ===== Sync Button =====
import { SyncButton } from '@/components/sync-button'

<SyncButton
  label="Sincronizar Maestros Oracle"
  onSync={async () => {
    // Llamar a API
    const response = await fetch('/api/sync')
    return response.json()
  }}
/>

// ===== Admin View =====
import { AdminView } from '@/components/admin-view'

<AdminView />
// Incluye: KPI Cards + Tabla + Filtros + Sync button

// ===== Provider View =====
import { ProviderView } from '@/components/provider-view'

<ProviderView />
// Incluye: Estadísticas + Upload + Mis Comprobantes

// ===== Dashboard Layout =====
import { DashboardLayout } from '@/components/dashboard-layout'
import { SidebarNav } from '@/components/sidebar-nav'

<DashboardLayout
  sidebar={
    <SidebarNav
      currentView="admin"
      onViewChange={(view) => console.log(view)}
      criticalErrors={3}
    />
  }
>
  <AdminView />
</DashboardLayout>

// ===== Toast Notifications =====
import { Toast } from '@/components/toast'
import { useState } from 'react'

const [showToast, setShowToast] = useState(false)

{showToast && (
  <Toast
    type="success"
    title="Sincronización completada"
    message="Se sincronizaron 150 maestros correctamente"
    onClose={() => setShowToast(false)}
    autoClose={5000}
  />
)}

// ===== Custom Hook: useCountUp =====
import { useCountUp } from '@/hooks/use-count-up'

const count = useCountUp(1000, 800) // Contar hasta 1000 en 800ms

<div className="text-3xl font-bold">{count}</div>

// ===== Animaciones CSS =====
{/* Pulse suave */}
<div className="animate-pulse-smooth">Pulsando...</div>

{/* Fade in */}
<div className="animate-in">Apareciendo...</div>

{/* Slide in desde abajo */}
<div className="slide-in-from-bottom-4">Deslizando...</div>

// ===== Status Colors =====
// Uso de las clases de estado
<div className="state-success">Éxito</div>        {/* Verde */}
<div className="state-error">Error</div>          {/* Rojo */}
<div className="state-processing">Procesando</div> {/* Azul */}

// ===== Glassmorphism Effect =====
// Uso de la clase glass
<div className="glass rounded-xl p-4">
  Contenedor con efecto vidrio
</div>

<div className="glass-sm rounded-lg p-2">
  Glassmorphism más sutil
</div>
