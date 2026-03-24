'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FilterOptions, InternalStatus } from '@/lib/types'

interface FilterSectionProps {
  onFilterChange?: (filters: FilterOptions) => void
  suppliers?: string[]
  currencies?: string[]
}

export function FilterSection({
  onFilterChange,
  suppliers = [],
  currencies = ['USD', 'PEN', 'EUR'],
}: FilterSectionProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    dateFrom: '',
    dateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
    supplier: '',
    currency: '',
  })

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange?.(newFilters)
  }

  const handleReset = () => {
    const emptyFilters: FilterOptions = {
      status: '',
      dateFrom: '',
      dateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
      supplier: '',
      currency: '',
    }
    setFilters(emptyFilters)
    onFilterChange?.(emptyFilters)
  }

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== '' && v !== undefined
  )

  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-slate-300">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold">Filtros Avanzados</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Estado */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Estado
          </label>
          <select
            value={filters.status || ''}
            onChange={(e) =>
              handleFilterChange('status', e.target.value as InternalStatus | '')
            }
            className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-50 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
          >
            <option value="">Todos los estados</option>
            <option value="READY">Recién Creado</option>
            <option value="EXTRACTED">Datos Extraídos</option>
            <option value="VALIDATED">Validado</option>
            <option value="COMPLETED">Éxito</option>
            <option value="ERROR">Error</option>
          </select>
        </div>

        {/* Moneda */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Moneda
          </label>
          <select
            value={filters.currency || ''}
            onChange={(e) => handleFilterChange('currency', e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-50 text-sm focus:outline-none focus:border-emerald-400 transition-colors"
          >
            <option value="">Todas las monedas</option>
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
        </div>

        {/* Proveedor */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Proveedor
          </label>
          <Input
            type="text"
            placeholder="Buscar proveedor..."
            value={filters.supplier || ''}
            onChange={(e) => handleFilterChange('supplier', e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        {/* Monto Mínimo */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Monto Mínimo
          </label>
          <Input
            type="number"
            placeholder="0.00"
            value={filters.minAmount ?? ''}
            onChange={(e) =>
              handleFilterChange(
                'minAmount',
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            className="h-9 text-sm"
          />
        </div>

        {/* Monto Máximo */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Monto Máximo
          </label>
          <Input
            type="number"
            placeholder="9999.99"
            value={filters.maxAmount ?? ''}
            onChange={(e) =>
              handleFilterChange(
                'maxAmount',
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            className="h-9 text-sm"
          />
        </div>

        {/* Fecha Desde */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Desde
          </label>
          <Input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            className="h-9 text-sm"
          />
        </div>

        {/* Fecha Hasta */}
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-2">
            Hasta
          </label>
          <Input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            className="h-9 text-sm"
          />
        </div>
      </div>
    </div>
  )
}

export type { FilterOptions }
