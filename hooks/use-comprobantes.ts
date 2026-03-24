import { useState, useEffect } from 'react'
import { Comprobante } from '@/lib/types'

interface UseComprobantesResult {
  data: Comprobante[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

const API_URL = 'https://n8n.srv1308804.hstgr.cloud/webhook/ver-facturas-todas'

export function useComprobantes(): UseComprobantesResult {
  console.log('[v0] Fetching comprobantes from API...0')

  const [data, setData] = useState<Comprobante[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    try {
      console.log('[v0] Fetching comprobantes from API...1')
      setIsLoading(true)
      setError(null)
      console.log('[v0] Fetching comprobantes from API...')

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('[v0] API Response:', result)

      // Handle both array and object with data property
      const comprobantes = Array.isArray(result) ? result : result.data || []

      if (!Array.isArray(comprobantes)) {
        throw new Error('API returned invalid data format')
      }

      console.log('[v0] Loaded comprobantes:', comprobantes.length)
      setData(comprobantes)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error')
      console.error('[v0] Error fetching comprobantes:', error.message)
      setError(error)
      // Fallback to empty array on error
      setData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  }
}
