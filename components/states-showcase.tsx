'use client'

import { StatusBadge } from './status-badge'
import { ArrowRight } from 'lucide-react'

export function StatesShowcase() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-50 mb-2">
          Estados de Comprobantes
        </h2>
        <p className="text-slate-400">
          Flujo completo de procesamiento: READY → EXTRACTED → VALIDATED → SUCCESS
        </p>
      </div>

      {/* Linear Flow */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex flex-col items-center">
            <StatusBadge status="ready" />
            <p className="text-xs text-slate-400 mt-2">Recién Creado</p>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          <div className="flex flex-col items-center">
            <StatusBadge status="extracted" />
            <p className="text-xs text-slate-400 mt-2">Extraído</p>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          <div className="flex flex-col items-center">
            <StatusBadge status="validated" />
            <p className="text-xs text-slate-400 mt-2">Validado</p>
          </div>

          <ArrowRight className="w-5 h-5 text-slate-500" />

          <div className="flex flex-col items-center">
            <StatusBadge status="completed" />
            <p className="text-xs text-slate-400 mt-2">Éxito</p>
          </div>
        </div>
      </div>

      {/* Error State */}
      <div className="glass rounded-xl p-6 border-l-4 border-red-400">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-50 font-semibold mb-1">
              Estado de Error (en cualquier fase)
            </p>
            <p className="text-slate-400 text-sm">
              Si ocurre un error durante cualquier etapa, el comprobante pasa a estado ERROR y permite reintentos
            </p>
          </div>
          <StatusBadge status="error" />
        </div>
      </div>

      {/* Descriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="glass rounded-xl p-4 border-t-2 border-blue-400">
          <p className="font-semibold text-blue-400 mb-2">READY</p>
          <p className="text-sm text-slate-400">
            Comprobante recién cargado al sistema, listo para procesamiento
          </p>
        </div>

        <div className="glass rounded-xl p-4 border-t-2 border-amber-400">
          <p className="font-semibold text-amber-400 mb-2">EXTRACTED</p>
          <p className="text-sm text-slate-400">
            Datos extraídos por Gemini, pendiente de validación
          </p>
        </div>

        <div className="glass rounded-xl p-4 border-t-2 border-sky-400">
          <p className="font-semibold text-sky-400 mb-2">VALIDATED</p>
          <p className="text-sm text-slate-400">
            Datos validados, listo para enviar a creación de factura
          </p>
        </div>

        <div className="glass rounded-xl p-4 border-t-2 border-emerald-400">
          <p className="font-semibold text-emerald-400 mb-2">SUCCESS</p>
          <p className="text-sm text-slate-400">
            Factura creada exitosamente en el sistema
          </p>
        </div>

        <div className="glass rounded-xl p-4 border-t-2 border-red-400">
          <p className="font-semibold text-red-400 mb-2">ERROR</p>
          <p className="text-sm text-slate-400">
            Error detectado, requiere revisión y reintento
          </p>
        </div>
      </div>
    </div>
  )
}
