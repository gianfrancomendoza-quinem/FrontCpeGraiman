'use client'

import { BarChart3, FileText, LogOut, Settings } from 'lucide-react'
import { ReactNode } from 'react'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  isActive?: boolean
  badge?: number
}

function NavItem({
  icon,
  label,
  onClick,
  isActive = false,
  badge,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
        isActive
          ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
          : 'text-slate-300 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className="flex-shrink-0 px-2 py-0.5 bg-red-400/20 text-red-400 text-xs rounded-full font-semibold">
          {badge}
        </span>
      )}
    </button>
  )
}

interface SidebarNavProps {
  currentView: 'admin' | 'provider'
  onViewChange?: (view: 'admin' | 'provider') => void
  criticalErrors?: number
}

export function SidebarNav({
  currentView,
  onViewChange,
  criticalErrors = 0,
}: SidebarNavProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* View Toggle */}
      <div className="space-y-2">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Vistas
        </p>
        <NavItem
          icon={<BarChart3 className="w-5 h-5" />}
          label="Administrador"
          onClick={() => onViewChange?.('admin')}
          isActive={currentView === 'admin'}
        />
        <NavItem
          icon={<FileText className="w-5 h-5" />}
          label="Proveedor"
          onClick={() => onViewChange?.('provider')}
          isActive={currentView === 'provider'}
          badge={criticalErrors}
        />
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10"></div>

      {/* Admin Section */}
      {currentView === 'admin' && (
        <div className="space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Administración
          </p>
          <NavItem
            icon={<BarChart3 className="w-5 h-5" />}
            label="Dashboard"
            isActive
          />
          {/* <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Facturas"
          />
          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Configuración"
          /> */}
        </div>
      )}

      {/* Provider Section */}
      {currentView === 'provider' && (
        <div className="space-y-2">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mis Documentos
          </p>
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Mis Comprobantes"
            isActive
          />
          {/* <NavItem
            icon={<BarChart3 className="w-5 h-5" />}
            label="Reportes"
          /> */}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/10 space-y-2">
        <NavItem
          icon={<Settings className="w-5 h-5" />}
          label="Configuración"
        />
        <NavItem
          icon={<LogOut className="w-5 h-5" />}
          label="Cerrar sesión"
        />
      </div>
    </div>
  )
}
