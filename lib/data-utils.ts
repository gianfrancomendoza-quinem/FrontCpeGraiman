import { Comprobante, ComprobanteStats, FilterOptions, InternalStatus } from './types'

/**
 * Calcula estadísticas de comprobantes
 */
export function calculateStats(comprobantes: Comprobante[]): ComprobanteStats {
  const stats: ComprobanteStats = {
    total: comprobantes.length,
    ready: 0,
    extracted: 0,
    validated: 0,
    completed: comprobantes.filter(c => c.internal_status === "COMPLETED").length,
    error: comprobantes.filter(c => c.internal_status === "ERROR").length,
    totalAmount: 0,
    avgAmount: 0,
    currencies: {},
  }

  comprobantes.forEach((comp) => {
    // Contar por estado
    const status = comp.internal_status.toLowerCase() as Lowercase<InternalStatus>
    stats[status as keyof Omit<ComprobanteStats, 'total' | 'totalAmount' | 'avgAmount' | 'currencies'>]++

    // Acumular montos
    const amount = parseFloat(comp.total_amount)
    stats.totalAmount += isNaN(amount) ? 0 : amount

    // Contar monedas
    const currency = comp.currency_code
    stats.currencies[currency] = (stats.currencies[currency] || 0) + 1
  })

  // Calcular promedio
  stats.avgAmount = stats.total > 0 ? stats.totalAmount / stats.total : 0

  return stats
}

/**
 * Filtra comprobantes con múltiples criterios (JavaScript puro)
 */
export function filterComprobantes(
  comprobantes: Comprobante[],
  filters: FilterOptions
): Comprobante[] {
  return comprobantes.filter((comp) => {
    // Filtro por estado
    if (filters.status && filters.status !== '' && comp.internal_status !== filters.status) {
      return false
    }

    // Filtro por fecha desde
    if (filters.dateFrom) {
      const invoiceDate = new Date(comp.invoice_date)
      const filterDate = new Date(filters.dateFrom)
      if (invoiceDate < filterDate) {
        return false
      }
    }

    // Filtro por fecha hasta
    if (filters.dateTo) {
      const invoiceDate = new Date(comp.invoice_date)
      const filterDate = new Date(filters.dateTo)
      filterDate.setHours(23, 59, 59, 999) // Incluir todo el día
      if (invoiceDate > filterDate) {
        return false
      }
    }

    // Filtro por monto mínimo
    if (filters.minAmount !== undefined) {
      const amount = parseFloat(comp.total_amount)
      if (isNaN(amount) || amount < filters.minAmount) {
        return false
      }
    }

    // Filtro por monto máximo
    if (filters.maxAmount !== undefined) {
      const amount = parseFloat(comp.total_amount)
      if (isNaN(amount) || amount > filters.maxAmount) {
        return false
      }
    }

    // Filtro por proveedor (búsqueda en nombre del proveedor)
    if (filters.supplier) {
      const supplierName = comp.raw_extraction_json?.header?.SupplierName || ''
      if (!supplierName.toLowerCase().includes(filters.supplier.toLowerCase())) {
        return false
      }
    }

    // Filtro por moneda
    if (filters.currency && comp.currency_code !== filters.currency) {
      return false
    }

    return true
  })
}

/**
 * Ordena comprobantes por campo y dirección
 */
export function sortComprobantes(
  comprobantes: Comprobante[],
  sortBy: keyof Comprobante = 'created_at',
  direction: 'asc' | 'desc' = 'desc'
): Comprobante[] {
  const sorted = [...comprobantes]

  sorted.sort((a, b) => {
    let aVal = a[sortBy]
    let bVal = b[sortBy]

    // Manejo de valores nulos/undefined
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return direction === 'asc' ? 1 : -1
    if (bVal == null) return direction === 'asc' ? -1 : 1

    // Conversión a números si es posible
    if (typeof aVal === 'string' && !isNaN(parseFloat(aVal))) {
      aVal = parseFloat(aVal) as any
    }
    if (typeof bVal === 'string' && !isNaN(parseFloat(bVal))) {
      bVal = parseFloat(bVal) as any
    }

    // Comparación
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })

  return sorted
}

/**
 * Obtiene lista única de proveedores
 */
export function getUniqueSuppliers(comprobantes: Comprobante[]): string[] {
  const suppliers = new Set<string>()

  comprobantes.forEach((comp) => {
    const supplier = comp.raw_extraction_json?.header?.SupplierName
    if (supplier) {
      suppliers.add(supplier)
    }
  })

  return Array.from(suppliers).sort()
}

/**
 * Obtiene lista única de monedas
 */
export function getUniqueCurrencies(comprobantes: Comprobante[]): string[] {
  const currencies = new Set<string>()

  comprobantes.forEach((comp) => {
    currencies.add(comp.currency_code)
  })

  return Array.from(currencies).sort()
}

/**
 * Formatea un monto con símbolo de moneda
 */
export function formatCurrency(amount: number | string, currency: string): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount

  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(num)
}

/**
 * Formatea una fecha sin dependencias de zona horaria
 */
export function formatDate(dateString: string): string {
  try {
    // Extraer solo la parte YYYY-MM-DD del ISO string
    const dateOnly = dateString.split('T')[0]
    const [year, month, day] = dateOnly.split('-')
    
    // Mapeo de meses en español
    const months = [
      'ene', 'feb', 'mar', 'abr', 'may', 'jun',
      'jul', 'ago', 'sep', 'oct', 'nov', 'dic'
    ]
    
    const monthName = months[parseInt(month) - 1]
    return `${parseInt(day)} ${monthName}. ${year}`
  } catch {
    return dateString
  }
}
