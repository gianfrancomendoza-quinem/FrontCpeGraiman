// Configuración de ejemplo para conectar con APIs reales

// CONFIGURACIÓN DE SUNAT/ORACLE
export const API_CONFIG = {
  SUNAT: {
    BASE_URL: 'https://api.sunat.gob.pe/v1',
    ENDPOINTS: {
      VALIDATE_RUC: '/ruc/validate',
      SEND_INVOICE: '/documents/invoice/send',
      QUERY_STATUS: '/documents/status',
      GET_CATALOG: '/catalogs',
    },
    TIMEOUT: 30000,
  },
  
  ORACLE: {
    BASE_URL: process.env.NEXT_PUBLIC_ORACLE_URL,
    SYNC_ENDPOINT: '/api/sync/masters',
    TIMEOUT: 30000,
  },

  LOCAL_API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    ENDPOINTS: {
      INVOICES: '/api/invoices',
      SYNC: '/api/sync',
      UPLOAD: '/api/upload',
    },
  },
}

// ESTADOS DE DOCUMENTO (SUNAT)
export const DOCUMENT_STATES = {
  ACCEPTED: 'accepted',
  PROCESSING: 'processing',
  OBSERVED: 'observed',
  REJECTED: 'rejected',
  PENDING: 'pending',
} as const

// TIPOS DE DOCUMENTO
export const DOCUMENT_TYPES = {
  INVOICE: '01',
  CREDIT_NOTE: '07',
  DEBIT_NOTE: '08',
  RECEIPT: '03',
  GUIDE: '09',
} as const

// CONFIGURACIÓN DE PAGINACIÓN
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 20, 50],
} as const

// CONFIGURACIÓN DE CACHE
export const CACHE_CONFIG = {
  REVALIDATE_INVOICES: 60, // segundos
  REVALIDATE_MASTERS: 3600, // 1 hora
  STALE_WHILE_REVALIDATE: true,
} as const

// Ejemplo de integración con API
/*
import { API_CONFIG } from '@/config/api'

async function fetchInvoices(filters?: FilterState) {
  const query = new URLSearchParams({
    ruc: filters?.ruc || '',
    status: filters?.status || '',
    from: filters?.dateFrom || '',
    to: filters?.dateTo || '',
  })

  const response = await fetch(
    `${API_CONFIG.LOCAL_API.BASE_URL}${API_CONFIG.LOCAL_API.ENDPOINTS.INVOICES}?${query}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  )

  return response.json()
}

async function syncOracleMasters() {
  const response = await fetch(
    `${API_CONFIG.LOCAL_API.BASE_URL}${API_CONFIG.LOCAL_API.ENDPOINTS.SYNC}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  )

  return response.json()
}
*/

export default API_CONFIG
