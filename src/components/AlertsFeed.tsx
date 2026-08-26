import React, { useState } from 'react';
import { 
  AlertNotification, 
  Animal 
} from '../types';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Filter, 
  Bell, 
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { CowAvatar } from './CowIllustrations';

interface AlertsFeedProps {
  alerts: AlertNotification[];
  onSelectAnimalByTag: (tagId: string) => void;
  onAcknowledgeAlert: (alertId: string) => void;
  onIsolateAnimal: (animalId: string) => void;
}

export const AlertsFeed: React.FC<AlertsFeedProps> = ({
  alerts,
  onSelectAnimalByTag,
  onAcknowledgeAlert,
  onIsolateAnimal,
}) => {
  const [filter, setFilter] = useState<'all' | 'unacknowledged' | 'critical'>('all');
  const [search, setSearch] = useState('');

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'unacknowledged' && alert.acknowledged) return false;
    if (filter === 'critical' && alert.severity !== 'critical') return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        alert.tagId.toLowerCase().includes(q) ||
        alert.animalName.toLowerCase().includes(q) ||
        alert.message.toLowerCase().includes(q) ||
        alert.predictedCondition.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-slate-800">
              Physiological Anomaly Alerts & Early Warnings
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
              {alerts.filter((a) => !a.acknowledged).length} Pending
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time notifications triggered when continuous ear-tag and bolus data breaches ML confidence baselines.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All ({alerts.length})
            </button>
            <button
              onClick={() => setFilter('unacknowledged')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'unacknowledged' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pending ({alerts.filter((a) => !a.acknowledged).length})
            </button>
            <button
              onClick={() => setFilter('critical')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                filter === 'critical' ? 'bg-white text-red-700 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Critical ({alerts.filter((a) => a.severity === 'critical').length})
            </button>
          </div>
        </div>
      </div>

      {/* Alert Cards Stream */}
      {filteredAlerts.length === 0 ? (
        <div className="text-center py-10 text-slate-400 text-xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          No alerts matching the selected filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-red-50/40 border-red-200 hover:border-red-300'
                    : 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                } ${alert.acknowledged ? 'opacity-80' : ''}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0 bg-slate-100 mt-0.5">
                      <CowAvatar
                        src={alert.animalId === '8492' ? '/images/cow-hero.jpg' : alert.animalId === '7214' ? '/images/cow-jersey.jpg' : alert.animalId === '9180' ? '/images/cow-portrait.jpg' : '/images/cow-brown-swiss.jpg'}
                        alt={alert.animalName}
                        tagId={alert.tagId}
                      />
                      <div
                        className={`absolute top-0 right-0 p-1 rounded-bl-lg text-white z-10 ${
                          isCritical ? 'bg-red-600' : 'bg-amber-500'
                        }`}
                      >
                        {isCritical ? <ShieldAlert className="w-2.5 h-2.5" /> : <AlertTriangle className="w-2.5 h-2.5" />}
                      </div>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <button
                          onClick={() => onSelectAnimalByTag(alert.tagId)}
                          className="font-bold text-sm text-slate-800 hover:text-emerald-600 hover:underline flex items-center gap-1"
                        >
                          Tag #{alert.tagId} ({alert.animalName})
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </button>
                        <span className="text-xs text-slate-500">• {alert.penLocation}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            isCritical ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {alert.severity}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white border border-slate-200 text-slate-600">
                          Lead Time: ~{alert.leadTimeDays} Days Ahead
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {alert.message}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                        <span>
                          Predicted: <strong className="text-slate-800">{alert.predictedCondition}</strong>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {alert.timestamp}
                        </span>
                        {alert.actionTaken && (
                          <span className="font-semibold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                            Action Taken: {alert.actionTaken.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Alert Action Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 self-end sm:self-start">
                    <button
                      onClick={() => onSelectAnimalByTag(alert.tagId)}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xs flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect Telemetry</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {!alert.acknowledged && (
                        <button
                          onClick={() => onAcknowledgeAlert(alert.id)}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors"
                        >
                          Acknowledge
                        </button>
                      )}
                      <button
                        onClick={() => onIsolateAnimal(alert.animalId)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 transition-colors"
                      >
                        Isolate Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

