'use client'

import {
  FileText,
  Zap,
  CheckCircle2,
  AlertCircle,
  CheckSquare,
} from 'lucide-react'
import { ReactNode } from 'react'

export type StatusType = 'ready' | 'extracted' | 'validated' | 'COMPLETED' | 'error'

interface StatusBadgeProps {
  status: StatusType | string
  label?: string
  showIcon?: boolean
  tooltip?: ReactNode
  className?: string
}

const statusConfig: Record<string, any> = {
  ready: {
    icon: FileText,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    label: 'Recién Creado',
    description: 'Documento recién cargado al sistema',
  },
  extracted: {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    label: 'Datos Extraídos',
    description: 'Datos extraídos de Gemini, pendiente validación',
  },
  validated: {
    icon: CheckSquare,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    label: 'Validado',
    description: 'Listo para enviar a creación de factura',
  },
  completed: {
    icon: CheckCircle2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    label: 'Éxito',
    description: 'Factura creada exitosamente',
  },
  error: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    label: 'Error',
    description: 'Ocurrió un error en el proceso',
  },
}

export function StatusBadge({
  status,
  label,
  showIcon = true,
  tooltip,
  className = '',
}: StatusBadgeProps) {
  // Normalizar status a minúsculas para búsqueda en config
  const normalizedStatus = String(status).toLowerCase()
  const config = statusConfig[normalizedStatus]

  // Fallback si el estado no es válido
  if (!config) {
    console.log('[v0] Invalid status received:', status, 'Normalized:', normalizedStatus)
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-400/10 text-slate-400 text-sm font-medium">
        <AlertCircle className="w-4 h-4" />
        <span>Desconocido</span>
      </div>
    )
  }

  const Icon = config.icon

  return (
    <div className="relative group">
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} ${config.color} text-sm font-medium transition-colors hover:bg-opacity-20 ${className}`}
      >
        {showIcon && <Icon className="w-4 h-4" />}
        <span>{label || config.label}</span>
      </div>

      {tooltip && (
        <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg whitespace-nowrap z-50 border border-slate-700">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  )
}
