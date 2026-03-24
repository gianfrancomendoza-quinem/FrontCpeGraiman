'use client'

import { ReactNode, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DashboardLayoutProps {
  children: ReactNode
  sidebar?: ReactNode
  defaultOpen?: boolean
}

export function DashboardLayout({
  children,
  sidebar,
  defaultOpen = true,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(defaultOpen)

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gradient-to-b from-slate-900 to-slate-950 border-r border-white/10 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10 h-16">
          {sidebarOpen && (
            // <h2 className="text-lg font-bold text-emerald-400">CPE</h2>
            <img src="https://www.graiman.com/sites/all/themes/eikon/logo.svg" alt="Inicio" width="110"></img>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={sidebarOpen ? 'Cerrar' : 'Abrir'}
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto space-y-2">
          {sidebar}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="pt-24 pb-8 px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
