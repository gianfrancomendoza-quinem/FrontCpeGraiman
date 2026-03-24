'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface SyncButtonProps {
  onSync?: () => Promise<void>
  label?: string
  className?: string
}

export function SyncButton({
  onSync,
  label = 'Sincronizar',
  className = '',
}: SyncButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  const handleSync = async () => {
    setIsLoading(true)
    try {
      await onSync?.()
      setLastSync(new Date())
    } catch (error) {
      console.error('[v0] Sync failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <button
        onClick={handleSync}
        disabled={isLoading}
        className={`glass px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          isLoading
            ? 'bg-emerald-400/20 text-emerald-400 cursor-wait'
            : 'text-emerald-400 hover:bg-emerald-400/20 active:scale-95'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Sincronizando...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>{label}</span>
          </>
        )}
      </button>

      {lastSync && (
        <p className="text-xs text-slate-400 text-center">
          Última sincronización: {lastSync.toLocaleTimeString('es-PE')}
        </p>
      )}
    </div>
  )
}
