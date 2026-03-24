'use client'

import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

interface KPICardProps {
  icon: LucideIcon
  label: string
  value: string | number
  unit?: string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  animate?: boolean
  className?: string
  footer?: ReactNode
}

export function KPICard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  animate = false,
  className = '',
  footer,
}: KPICardProps) {
  return (
    <div
      className={`glass rounded-xl p-6 flex flex-col justify-between h-40 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-400/10 transform hover:-translate-y-1 ${
        animate ? 'animate-pulse-smooth' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-50">{value}</h3>
            {unit && <span className="text-sm text-slate-400">{unit}</span>}
          </div>
        </div>
        <Icon className="w-8 h-8 text-emerald-400 opacity-80" />
      </div>

      {trend && (
        <div
          className={`text-xs font-medium ${
            trend.direction === 'up' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}%
        </div>
      )}

      {footer && (
        <div className="text-xs text-slate-400 mt-2 border-t border-white/10 pt-2">
          {footer}
        </div>
      )}
    </div>
  )
}
