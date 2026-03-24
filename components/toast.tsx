'use client'

import { ReactNode } from 'react'
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastProps {
  type: ToastType
  title: string
  message?: ReactNode
  onClose?: () => void
  autoClose?: number
}

const toastConfig = {
  completed: {
    icon: CheckCircle,
    bgColor: 'bg-emerald-400/10',
    borderColor: 'border-emerald-400/30',
    textColor: 'text-emerald-400',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-400/10',
    borderColor: 'border-red-400/30',
    textColor: 'text-red-400',
  },
  info: {
    icon: Info,
    bgColor: 'bg-sky-400/10',
    borderColor: 'border-sky-400/30',
    textColor: 'text-sky-400',
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/30',
    textColor: 'text-amber-400',
  },
}

export function Toast({
  type,
  title,
  message,
  onClose,
  autoClose = 5000,
}: ToastProps) {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`fixed bottom-4 right-4 glass rounded-xl p-4 flex items-start gap-4 max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300 ${config.bgColor} border ${config.borderColor}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.textColor}`} />
      <div className="flex-1">
        <h3 className={`font-semibold ${config.textColor}`}>{title}</h3>
        {message && <p className="text-sm text-slate-300 mt-1">{message}</p>}
      </div>
      <button
        onClick={onClose}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
      >
        <X className="w-4 h-4 text-slate-400" />
      </button>
    </div>
  )
}
