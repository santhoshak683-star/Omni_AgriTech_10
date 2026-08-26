import React, { useState } from 'react';
import { 
  Animal, 
  HealthStatus 
} from '../types';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  BatteryMedium, 
  ChevronRight, 
  Thermometer, 
  Activity, 
  ArrowUpDown,
  Download,
  ShieldCheck
} from 'lucide-react';
import { formatTemperature, getStatusBadgeColor } from '../utils/formatters';
import { CowAvatar } from './CowIllustrations';

interface LivestockDirectoryProps {
  animals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
  temperatureUnit: 'C' | 'F';
  onToggleIsolation: (animalId: string) => void;
}

export const LivestockDirectory: React.FC<LivestockDirectoryProps> = ({
  animals,
  onSelectAnimal,
  temperatureUnit,
  onToggleIsolation,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | HealthStatus | 'isolated'>('all');
  const [sortBy, setSortBy] = useState<'risk' | 'temp' | 'tag'>('risk');

  const filteredAnimals = animals
    .filter((animal) => {
      if (statusFilter === 'isolated') return animal.isIsolated;
      if (statusFilter !== 'all' && animal.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          animal.tagId.toLowerCase().includes(q) ||
          animal.name.toLowerCase().includes(q) ||
          animal.penLocation.toLowerCase().includes(q) ||
          animal.breed.toLowerCase().includes(q) ||
          animal.predictedIllness.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'risk') return b.riskProbability - a.riskProbability;
      if (sortBy === 'temp') return b.currentCoreTemp - a.currentCoreTemp;
      if (sortBy === 'tag') return a.tagId.localeCompare(b.tagId);
      return 0;
    });

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
      {/* Top Header & Search / Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800">
            Livestock Directory & Telemetry Roster
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time biometric roster of enrolled herd with live ear-tag and bolus sensor telemetry.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Tag, Breed, Pen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Filter Status Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            {(['all', 'critical', 'at-risk', 'healthy', 'isolated'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  statusFilter === st ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold py-1.5 px-2.5 rounded-xl cursor-pointer"
            >
              <option value="risk">Sort by ML Risk</option>
              <option value="temp">Sort by Core Temp</option>
              <option value="tag">Sort by Tag ID</option>
            </select>
          </div>
        </div>
      </div>

      {/* Livestock Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-3 px-3">Tag & Name</th>
              <th className="py-3 px-3">Location / Pen</th>
              <th className="py-3 px-3">Health Status</th>
              <th className="py-3 px-3">Core Body Temp</th>
              <th className="py-3 px-3">Actigraphy Motility</th>
              <th className="py-3 px-3">ML Anomaly Risk</th>
              <th className="py-3 px-3">Sensor Telemetry</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAnimals.map((animal) => {
              const statusColors = getStatusBadgeColor(animal.status);
              const isFlagship = animal.id === '8492';

              return (
                <tr
                  key={animal.id}
                  className={`hover:bg-slate-50 transition-colors ${
                    isFlagship ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* Tag & Name */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-xs shrink-0 bg-slate-100">
                        <CowAvatar
                          src={animal.photoUrl || '/images/cow-hero.jpg'}
                          alt={animal.name}
                          tagId={animal.tagId}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 flex items-center gap-1">
                          {animal.name}
                          {isFlagship && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-amber-100 text-amber-800">
                              Priority
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">{animal.breed}</div>
                      </div>
                    </div>
                  </td>

                  {/* Location / Pen */}
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-slate-700">{animal.penLocation}</div>
                    <div className="text-[11px] text-slate-400">{animal.pastureGroup}</div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColors.bg} border`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors.dot}`} />
                        {animal.status}
                      </span>
                      {animal.isIsolated && (
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">
                          Isolated
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Core Temp */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-slate-900 flex items-center gap-1">
                      <Thermometer className={`w-3.5 h-3.5 ${animal.currentTempDelta > 0.5 ? 'text-red-500' : 'text-slate-400'}`} />
                      {formatTemperature(animal.currentCoreTemp, temperatureUnit)}
                    </div>
                    <div className={`text-[10px] font-medium ${animal.currentTempDelta > 0.5 ? 'text-red-600 font-bold' : 'text-slate-400'}`}>
                      {animal.currentTempDelta > 0 ? `+${animal.currentTempDelta}°C` : `${animal.currentTempDelta}°C`} vs ML base
                    </div>
                  </td>

                  {/* Actigraphy Motility */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-semibold text-slate-800 flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-indigo-500" />
                      {animal.currentActivityIndex}/100
                    </div>
                    <div className={`text-[10px] ${animal.currentActivityDelta < -20 ? 'text-red-600 font-bold' : 'text-slate-400'}`}>
                      {animal.currentActivityDelta}% deviation
                    </div>
                  </td>

                  {/* ML Risk Score */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full ${
                            animal.riskProbability > 80
                              ? 'bg-red-500'
                              : animal.riskProbability > 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${animal.riskProbability}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs text-slate-800">
                        {animal.riskProbability}%
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[130px]" title={animal.predictedIllness}>
                      {animal.predictedIllness}
                    </div>
                  </td>

                  {/* Sensor Hardware */}
                  <td className="py-3.5 px-3">
                    <div className="text-[11px] text-slate-600 font-mono">
                      {animal.bolusSensorId} • {animal.earTagSensorId}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <BatteryMedium className="w-3 h-3" />
                      {animal.bolusBattery}% • {animal.earTagBattery}%
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectAnimal(animal)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onToggleIsolation(animal.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-colors ${
                          animal.isIsolated
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-white hover:bg-red-50 text-red-600 border border-red-200'
                        }`}
                      >
                        {animal.isIsolated ? 'Release' : 'Isolate'}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

