import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  Settings, 
  ShieldCheck, 
  Radio, 
  Cpu, 
  BatteryMedium,
  HeartPulse,
  Syringe,
  Layers,
  ChevronRight,
  Activity
} from 'lucide-react';
import { FarmMetrics } from '../types';
import { AnimatedCowIcon } from './AnimatedCowIcon';

export type NavTab = 'overview' | 'directory' | 'alerts' | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  metrics: FarmMetrics;
  onQuickSelect8492: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  metrics,
  onQuickSelect8492,
}) => {
  const navItems: Array<{
    id: NavTab;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
  }> = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'directory',
      label: 'Livestock Directory',
      icon: Users,
      badge: `${metrics.totalMonitored}`,
      badgeColor: 'bg-slate-100 text-slate-700',
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: AlertTriangle,
      badge: metrics.activeAlerts,
      badgeColor: 'bg-red-500 text-white',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 lg:min-h-[calc(100vh-80px)]">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-100">
        <AnimatedCowIcon size="sm" showRadar={false} />
        <div>
          <span className="font-bold text-slate-800 text-base tracking-tight block leading-tight">
            Techhorizon
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Livestock Intelligence</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 py-5 px-4 space-y-1.5">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Main Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    item.badgeColor || 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Quick Pin / Flagship Livestock #8492 */}
        <div className="pt-3">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
              <span className="font-bold uppercase tracking-wider text-[9px] text-slate-400">Priority Anomaly</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black bg-red-100 text-red-700">
                FEBRILE
              </span>
            </div>
            <button
              onClick={onQuickSelect8492}
              className="w-full text-left group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-800 text-xs group-hover:text-emerald-600 transition-colors">
                    Tag #8492 (Bella)
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Core: <span className="text-red-600 font-bold">40.4°C</span> (+1.4°C)
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Telemetry & Farm Diagnostics Summary Card */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <div className="bg-slate-900 rounded-xl p-4 text-white space-y-2.5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">System Health</p>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-200">All IoT Nodes Online</p>
          
          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 text-[10px] block">Sensor Fleet</span>
              <span className="font-mono text-emerald-400 font-bold">{metrics.sensorHealthPercentage}%</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Saved Doses</span>
              <span className="font-mono text-teal-300 font-bold">+{metrics.estimatedAntibioticDosesSaved}</span>
            </div>
          </div>
        </div>

        {/* Farm Metadata */}
        <div className="text-[10px] text-slate-400 px-1 flex items-center justify-between font-medium">
          <span>Pine Valley Pastures</span>
          <span>Gateway Alpha</span>
        </div>
      </div>
    </aside>
  );
};

