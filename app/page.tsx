'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { SidebarNav } from '@/components/sidebar-nav'
import { AdminView } from '@/components/admin-view'
import { ProviderView } from '@/components/provider-view'
import { useComprobantes } from '@/hooks/use-comprobantes'

export default function Dashboard() {
  const [currentView, setCurrentView] = useState<'admin' | 'provider'>('admin')
  const { data: comprobantes, isLoading, error } = useComprobantes()

  const criticalErrors = comprobantes.filter(
    (c) => c.internal_status === 'ERROR'
  ).length

  return (
    <DashboardLayout
      sidebar={
        <SidebarNav
          currentView={currentView}
          onViewChange={setCurrentView}
          criticalErrors={criticalErrors}
        />
      }
    >
      {error && (
        <div className="glass rounded-xl p-4 border-l-4 border-red-400 bg-red-400/5 mb-4">
          <p className="text-red-400 text-sm font-medium">
            Error cargando datos: {error.message}
          </p>
        </div>
      )}

      {currentView === 'admin' ? (
        <AdminView comprobantes={comprobantes} isLoading={isLoading} />
      ) : (
        <ProviderView comprobantes={comprobantes} isLoading={isLoading} />
      )}
    </DashboardLayout>
  )
}
