'use client'

import { useState, useMemo } from 'react'
import { FileText, AlertCircle, Upload } from 'lucide-react'
import { InvoiceTable } from '@/components/invoice-table'
import { DragDropZone } from '@/components/drag-drop-zone'
import { StatusBadge } from '@/components/status-badge'
import { Comprobante, ComprobanteStats } from '@/lib/types'
import { calculateStats, formatCurrency } from '@/lib/data-utils'

interface ProviderViewProps {
  comprobantes: Comprobante[]
  isLoading?: boolean
}

const PROVIDER_FILTER = 'Google LLC'

export function ProviderView({ comprobantes, isLoading }: ProviderViewProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Filtrar solo datos de "Google LLC"
  const providerData = useMemo(() => {
    return comprobantes.filter(
      (c) =>
        c.raw_extraction_json?.header?.SupplierName === PROVIDER_FILTER ||
        c.tax_registration_number === '770493581' // Google LLC tax ID
    )
  }, [comprobantes])

  // Calcular estadísticas del proveedor
  const stats: ComprobanteStats = useMemo(() => calculateStats(providerData), [providerData])

  // Agrupar por estado para visualización
  const stateGroups = useMemo(() => {
    const groups = {
      completed: providerData.filter((c) => c.internal_status === 'COMPLETED'),
      validated: providerData.filter((c) => c.internal_status === 'VALIDATED'),
      extracted: providerData.filter((c) => c.internal_status === 'EXTRACTED'),
      ready: providerData.filter((c) => c.internal_status === 'READY'),
      error: providerData.filter((c) => c.internal_status === 'ERROR'),
    }
    return groups
  }, [providerData])

  const handleFilesDropped = (files: File[]) => {
    setUploadedFiles([...uploadedFiles, ...files])
    console.log('[v0] Archivos cargados:', files.length)
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-50">Mi Cuenta - Proveedor</h1>
        <p className="text-slate-400 mt-2">
          Gestiona tus comprobantes electrónicos y monitorea su procesamiento
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass rounded-xl p-4">
          <p className="text-sm text-slate-400 mb-1">Total</p>
          <p className="text-2xl font-bold text-slate-50">{stats.total}</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-2 border-emerald-400">
          <p className="text-sm text-slate-400 mb-1">Éxito</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.completed}</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-2 border-sky-400">
          <p className="text-sm text-slate-400 mb-1">Validados</p>
          <p className="text-2xl font-bold text-sky-400">{stats.validated}</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-2 border-amber-400">
          <p className="text-sm text-slate-400 mb-1">Extraídos</p>
          <p className="text-2xl font-bold text-amber-400">{stats.extracted}</p>
        </div>
        <div className="glass rounded-xl p-4 border-l-2 border-red-400">
          <p className="text-sm text-slate-400 mb-1">Errores</p>
          <p className="text-2xl font-bold text-red-400">{stats.error}</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-50 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Cargar Comprobantes
        </h2>
        <DragDropZone onFilesDropped={handleFilesDropped} />

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="glass rounded-xl p-4">
            <p className="text-sm font-medium text-slate-300 mb-3">
              Archivos cargados ({uploadedFiles.length})
            </p>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/10"
                >
                  <span className="text-sm text-slate-300">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Alerts Section */}
      {stats.error > 0 && (
        <div className="glass rounded-xl p-4 border-l-4 border-red-400 bg-red-400/5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-400 mb-1">
                {stats.error} Comprobante{stats.error > 1 ? 's' : ''} con Error
              </h3>
              <p className="text-sm text-slate-300">
                Revisa los errores y corrige los datos antes de reenviar.
              </p>
            </div>
          </div>
        </div>
      )}

      {stats.validated > 0 && (
        <div className="glass rounded-xl p-4 border-l-4 border-sky-400 bg-sky-400/5">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sky-400 mb-1">
                {stats.validated} Comprobante{stats.validated > 1 ? 's' : ''} Validado{stats.validated > 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-slate-300">
                Listos para enviar a creación de factura electrónica.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mis Comprobantes Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-50">Mis Comprobantes ({PROVIDER_FILTER})</h2>
          <span className="text-sm text-slate-400">{providerData.length} registros</span>
        </div>
        {providerData.length > 0 ? (
          <InvoiceTable data={providerData} isLoading={isLoading} showActions={false} />
        ) : (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-slate-400">No hay comprobantes disponibles para este proveedor</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-slate-50 mb-4">Estados de Comprobantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="ready" />
            </div>
            <p className="text-sm text-slate-400">
              Recién creado. El comprobante acaba de ser cargado al sistema.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="extracted" />
            </div>
            <p className="text-sm text-slate-400">
              Datos extraídos de Gemini. Pendiente validación antes de envío.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="validated" />
            </div>
            <p className="text-sm text-slate-400">
              Validado y listo para enviar a creación de factura a Oracle ERP Cloud.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="completed" />
            </div>
            <p className="text-sm text-slate-400">
              Éxito. Factura creada exitosamente en Oracle ERP Cloud.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <StatusBadge status="error" />
            </div>
            <p className="text-sm text-slate-400">
              Error. Hubo un problema en el procesamiento. Requiere revisión.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { Comprobante }
