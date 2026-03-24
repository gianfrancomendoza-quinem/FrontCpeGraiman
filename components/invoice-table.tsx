'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { StatusBadge } from '@/components/status-badge'
import { TableSkeleton } from '@/components/table-skeleton'
import { Comprobante } from '@/lib/types'
import { formatCurrency, formatDate } from '@/lib/data-utils'

interface ComprobanteTableProps {
  data?: Comprobante[]
  isLoading?: boolean
  onRowClick?: (comprobante: Comprobante) => void
  showActions?: boolean
}

type SortField = 'invoice_num' | 'total_amount' | 'invoice_date' | 'internal_status'
type SortOrder = 'asc' | 'desc'

export function InvoiceTable({
  data = [],
  isLoading = false,
  onRowClick,
  showActions = false,
}: ComprobanteTableProps) {
  const [sortField, setSortField] = useState<SortField>('invoice_date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const getSortedData = () => {
    const sorted = [...data]
    sorted.sort((a, b) => {
      let aVal = a[sortField]
      let bVal = b[sortField]

      if (aVal == null && bVal == null) return 0
      if (aVal == null) return sortOrder === 'asc' ? 1 : -1
      if (bVal == null) return sortOrder === 'asc' ? -1 : 1

      // Para montos, convertir a número
      if (sortField === 'total_amount') {
        aVal = parseFloat(aVal as string) as any
        bVal = parseFloat(bVal as string) as any
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
    return sorted
  }

  const sortedData = getSortedData()

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? (
      <ChevronUp className="w-4 h-4 inline" />
    ) : (
      <ChevronDown className="w-4 h-4 inline" />
    )
  }

  if (isLoading) return <TableSkeleton />

  return (
    <div className="glass rounded-xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 cursor-pointer hover:bg-white/10" onClick={() => handleSort('invoice_num')}>
                Factura <SortIcon field="invoice_num" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">
                Proveedor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 cursor-pointer hover:bg-white/10" onClick={() => handleSort('total_amount')}>
                Monto <SortIcon field="total_amount" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 cursor-pointer hover:bg-white/10" onClick={() => handleSort('invoice_date')}>
                Fecha <SortIcon field="invoice_date" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200 cursor-pointer hover:bg-white/10" onClick={() => handleSort('internal_status')}>
                Estado <SortIcon field="internal_status" />
              </th>
              {showActions && (
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">
                  Acciones
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 6 : 5} className="px-6 py-8 text-center text-slate-400">
                  No hay comprobantes disponibles
                </td>
              </tr>
            ) : (
              sortedData.map((comp) => {
                const supplierName = comp.raw_extraction_json?.header?.SupplierName || 'N/A'
                const statusMap: Record<string, any> = {
                  READY: 'ready',
                  EXTRACTED: 'extracted',
                  VALIDATED: 'validated',
                  COMPLETED: 'COMPLETED',
                  ERROR: 'error',
                }
                const mappedStatus = statusMap[comp.internal_status] || 'error'

                return (
                  <tr
                    key={comp.document_id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => onRowClick?.(comp)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-50">
                      {comp.invoice_num}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      <span title={supplierName} className="truncate block max-w-xs">
                        {supplierName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-50 font-medium">
                      {formatCurrency(comp.total_amount, comp.currency_code)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {formatDate(comp.invoice_date)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={mappedStatus} />
                    </td>
                    {showActions && (
                      <td className="px-6 py-4 text-sm text-slate-400">
                        <button className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-medium">
                          Ver detalles
                        </button>
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export type { Comprobante }
