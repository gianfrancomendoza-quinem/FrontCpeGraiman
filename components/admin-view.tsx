'use client'

import { useState, useMemo } from 'react'
import { FileText, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react'
import { KPICard } from '@/components/kpi-card'
import { InvoiceTable } from '@/components/invoice-table'
import { FilterSection } from '@/components/filter-section'
import { SyncButton } from '@/components/sync-button'
import { useCountUp } from '@/hooks/use-count-up'
import { Comprobante, FilterOptions } from '@/lib/types'
import {
  calculateStats,
  filterComprobantes,
  sortComprobantes,
  formatCurrency,
  getUniqueSuppliers,
  getUniqueCurrencies,
} from '@/lib/data-utils'

interface AdminViewProps {
  comprobantes: Comprobante[]
  isLoading?: boolean
}

export function AdminView({ comprobantes, isLoading: initialLoading }: AdminViewProps) {
  const [filters, setFilters] = useState<FilterOptions>({})
  const [isSyncing, setIsSyncing] = useState(false)
  const isLoading = initialLoading || isSyncing
  //const [setIsLoading] = useState(false)

  // Calcular estadísticas totales
  const totalStats = useMemo(() => calculateStats(comprobantes), [comprobantes])

  // Obtener listados únicos para los filtros
  const suppliers = useMemo(() => getUniqueSuppliers(comprobantes), [comprobantes])
  const currencies = useMemo(() => getUniqueCurrencies(comprobantes), [comprobantes])

  // Filtrar datos según los criterios (JavaScript puro)
  const filteredData = useMemo(() => {
    console.log("filteredData");
    const filtered = filterComprobantes(comprobantes, filters);
    return sortComprobantes(filtered, 'invoice_date', 'desc')
  }, [comprobantes, filters])

  // Calcular estadísticas filtradas
  const filteredStats = useMemo(() => calculateStats(filteredData), [filteredData])

  // Contadores animados
  const animatedTotal = useCountUp(filteredStats.total, 800)
  const animatedSuccess = useCountUp(filteredStats.completed, 600)
  const animatedErrors = useCountUp(filteredStats.error, 600)
  const animatedValidated = useCountUp(filteredStats.validated, 600)

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      console.log('[v0] Sincronización completada 0')
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('[v0] Sincronización completada')
    } catch (error) {
      console.error('[v0] Error en sincronización:', error)
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Dashboard de Administración</h1>
        <p className="text-slate-400 mt-2">
          Monitoreo centralizado de comprobantes electrónicos y sincronización Oracle
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          icon={FileText}
          label="Total de Comprobantes"
          value={animatedTotal}
          trend={{ direction: 'up', percentage: totalStats.total > 0 ? 12 : 0 }}
        />
        <KPICard
          icon={TrendingUp}
          label="Éxito"
          value={animatedSuccess}
          animate={filteredStats.completed > 0}
          footer={
            <span className="text-emerald-400">
              ✓ Creados con éxito.
            </span>
          }
        />
        <KPICard
          icon={AlertTriangle}
          label="Con Errores"
          value={animatedErrors}
          footer={
            <span className="text-red-400">
              ✕ Requieren revisión
            </span>
          }
        />
        <KPICard
          icon={DollarSign}
          label="Monto Total"
          value={formatCurrency(filteredStats.totalAmount, 'USD')}
          footer={`Promedio: ${formatCurrency(filteredStats.avgAmount, 'USD')}`}
        />
      </div>

      {/* Sync Button & Filters */}
      <div className="space-y-4">
        {/* <SyncButton onSync={handleSync} /> */}
        <FilterSection
          onFilterChange={setFilters}
          suppliers={suppliers}
          currencies={currencies}
        />
      </div>

      {/* Results Info */}
      <div className="glass rounded-xl p-4 text-sm text-slate-300">
        Mostrando <span className="font-semibold text-emerald-400">{filteredData.length}</span> de{' '}
        <span className="font-semibold text-slate-50">{totalStats.total}</span> comprobantes
      </div>

      {/* Invoice Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-50">Comprobantes Registrados</h2>
        <InvoiceTable
          data={filteredData}
          isLoading={isLoading}
          showActions
        />
      </div>
    </div>
  )
}
