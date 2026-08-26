import React from 'react';
import { 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowUpRight,
  Syringe,
  Timer,
  Sparkles
} from 'lucide-react';
import { FarmMetrics } from '../types';

interface MetricsOverviewProps {
  metrics: FarmMetrics;
  selectedFilter: 'all' | 'healthy' | 'at-risk' | 'critical';
  onFilterChange: (filter: 'all' | 'healthy' | 'at-risk' | 'critical') => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
  selectedFilter,
  onFilterChange,
}) => {
  const healthyPercentage = ((metrics.healthyCount / metrics.totalMonitored) * 100).toFixed(1);
  const atRiskPercentage = ((metrics.atRiskCount / metrics.totalMonitored) * 100).toFixed(1);

  const cards = [
    {
      id: 'all' as const,
      title: 'Total Monitored',
      value: metrics.totalMonitored.toLocaleString(),
      subValue: '+2% vs last week',
      subValueColor: 'text-emerald-500 font-bold',
      badge: 'ALL ACTIVE',
      badgeColor: 'bg-slate-100 text-slate-700',
      description: 'Active ear-tags & reticulo-rumen bolus sensors',
      textColor: 'text-slate-900',
      activeRing: 'ring-2 ring-slate-800 border-slate-800',
    },
    {
      id: 'healthy' as const,
      title: 'Healthy Status',
      value: metrics.healthyCount.toLocaleString(),
      subValue: `${healthyPercentage}% of herd`,
      subValueColor: 'text-slate-500 font-medium',
      badge: 'OPTIMAL',
      badgeColor: 'bg-emerald-100 text-emerald-700',
      description: 'Core temp & actigraphy within trained baseline',
      textColor: 'text-emerald-600',
      activeRing: 'ring-2 ring-emerald-600 border-emerald-600',
    },
    {
      id: 'at-risk' as const,
      title: 'At-Risk (Anomaly)',
      value: metrics.atRiskCount.toLocaleString(),
      subValue: `${atRiskPercentage}% anomaly`,
      subValueColor: 'text-amber-600 font-medium',
      badge: 'MONITORING',
      badgeColor: 'bg-amber-100 text-amber-700',
      description: 'Thermal & motility shift 3-5 days ahead',
      textColor: 'text-amber-500',
      activeRing: 'ring-2 ring-amber-500 border-amber-500',
    },
    {
      id: 'critical' as const,
      title: 'Critical Isolation',
      value: metrics.criticalCount.toLocaleString(),
      subValue: 'Urgent Intervention',
      subValueColor: 'text-red-600 font-bold',
      badge: 'URGENT',
      badgeColor: 'bg-red-100 text-red-700',
      description: 'Persistent hyperthermia & rumination crash',
      textColor: 'text-red-600',
      activeRing: 'ring-2 ring-red-600 border-red-600',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => {
          const isSelected = selectedFilter === card.id;

          return (
            <button
              key={card.id}
              onClick={() => onFilterChange(card.id)}
              className={`bg-white p-5 rounded-2xl shadow-xs border border-slate-200 text-left transition-all duration-150 cursor-pointer ${
                isSelected ? `${card.activeRing} bg-slate-50/50` : 'hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  {card.title}
                </p>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <div className="flex items-end justify-between">
                <h3 className={`text-3xl font-black ${card.textColor}`}>
                  {card.value}
                </h3>
                <span className={`text-xs ${card.subValueColor}`}>
                  {card.subValue}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-2.5 line-clamp-1">
                {card.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{isSelected ? 'Active Filter' : 'Click to filter'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Prevention & ML Impact Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>ML Predictive Isolation Active</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                3 to 5 Day Lead Window
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Continuous baseline divergence flags illness before symptoms develop, eliminating unnecessary prophylactic herd antibiotic treatments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs shrink-0 self-end sm:self-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-1.5">
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">Lead Time: <strong className="text-white">~3.8 Days</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Syringe className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-slate-300">Avoided Doses: <strong className="text-white">+{metrics.estimatedAntibioticDosesSaved}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

