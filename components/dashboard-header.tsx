'use client'

import { Bell, Settings, User } from 'lucide-react'

interface HeaderProps {
  title?: string
  showNotifications?: boolean
  userInfo?: {
    name: string
    role: string
    avatar?: string
  }
}

export function DashboardHeader({
  title = 'CPE - Dashboard',
  showNotifications = true,
  userInfo,
}: HeaderProps) {
  return (
    <div className="fixed top-0 right-0 left-20 md:left-64 bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between z-40">
      <div>
        <h1 className="text-xl font-bold text-slate-50">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {showNotifications && (
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-slate-300 hover:text-slate-200" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
          </button>
        )}

        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-slate-300 hover:text-slate-200" />
        </button>

        {userInfo && (
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-50">{userInfo.name}</p>
              <p className="text-xs text-slate-400">{userInfo.role}</p>
            </div>
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-400/20 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
