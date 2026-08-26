import React, { useState } from 'react';
import {
  Animal,
  TelemetryDataPoint,
} from '../types';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  ReferenceLine,
  BarChart,
  Bar,
} from 'recharts';
import {
  Thermometer,
  Activity,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Calendar,
  Clock,
  Radio,
  Cpu,
  BatteryMedium,
  Syringe,
  FileText,
  ChevronDown,
  Info,
  HeartPulse
} from 'lucide-react';
import { formatTemperature, getStatusBadgeColor } from '../utils/formatters';
import { CowAvatar } from './CowIllustrations';

interface AnimalDetailViewProps {
  animal: Animal;
  allAnimals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
  temperatureUnit: 'C' | 'F';
  onToggleIsolation: (animalId: string) => void;
  onOpenReportModal: (animal: Animal) => void;
}

export const AnimalDetailView: React.FC<AnimalDetailViewProps> = ({
  animal,
  allAnimals,
  onSelectAnimal,
  temperatureUnit,
  onToggleIsolation,
  onOpenReportModal,
}) => {
  const [activeChartTab, setActiveChartTab] = useState<'temp' | 'activity' | 'combined'>('combined');
  const [showIsolationSuccess, setShowIsolationSuccess] = useState(false);

  const statusColors = getStatusBadgeColor(animal.status);

  // Quick action: Isolate
  const handleIsolationClick = () => {
    onToggleIsolation(animal.id);
    setShowIsolationSuccess(true);
    setTimeout(() => setShowIsolationSuccess(false), 3000);
  };

  // Convert celsius numbers for chart display if unit is 'F'
  const processedTelemetry = animal.telemetryHistory.map((pt) => {
    const convert = (c: number) => (temperatureUnit === 'F' ? Number(((c * 9) / 5 + 32).toFixed(2)) : c);
    return {
      ...pt,
      displayCoreTemp: convert(pt.coreTemp),
      displayTempBaseline: convert(pt.tempBaseline),
      displayTempBaselineMin: convert(pt.tempBaselineMin),
      displayTempBaselineMax: convert(pt.tempBaselineMax),
    };
  });

  const anomalyStartPoint = animal.telemetryHistory.find((p) => p.isAnomaly);
  const anomalyStartIndex = anomalyStartPoint ? animal.telemetryHistory.indexOf(anomalyStartPoint) : -1;
  const anomalyStartTimestamp = anomalyStartPoint ? anomalyStartPoint.timestamp : '';
  const lastTimestamp = animal.telemetryHistory[animal.telemetryHistory.length - 1]?.timestamp || '';

  return (
    <div className="space-y-6">
      {/* Animal Identity Card Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Cow Identity */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0 bg-slate-100">
              <CowAvatar
                src={animal.photoUrl || '/images/cow-hero.jpg'}
                alt={animal.name}
                tagId={animal.tagId}
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h4 className="text-lg font-bold text-slate-800">
                  Tag ID: {animal.tagId} ({animal.name})
                </h4>
                {animal.isIsolated ? (
                  <span className="bg-purple-100 text-purple-800 px-3 py-0.5 rounded-full text-xs font-bold">
                    ISOLATED ({animal.quarantinePen || 'Quarantine Alpha'})
                  </span>
                ) : animal.status !== 'healthy' ? (
                  <span className="bg-amber-100 text-amber-800 px-3 py-0.5 rounded-full text-xs font-bold">
                    ANOMALY DETECTED: {animal.predictedIllness.toUpperCase()}
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded-full text-xs font-bold">
                    OPTIMAL BASELINE
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-500">
                {animal.breed} • Age: {(animal.ageMonths / 12).toFixed(1)} yrs • {animal.penLocation} • Lactation #{animal.lactationNumber} • {animal.weightKg} kg
              </p>
            </div>
          </div>

          {/* Controls & Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Animal Switcher */}
            <div className="relative">
              <label htmlFor="animal-select" className="sr-only">Switch Animal</label>
              <select
                id="animal-select"
                value={animal.id}
                onChange={(e) => {
                  const target = allAnimals.find((a) => a.id === e.target.value);
                  if (target) onSelectAnimal(target);
                }}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold py-2.5 pl-3 pr-8 rounded-xl cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                {allAnimals.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.tagId} - {a.name} ({a.status.toUpperCase()})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Quarantine / Isolate Action */}
            <button
              onClick={handleIsolationClick}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                animal.isIsolated
                  ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300'
                  : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
              }`}
            >
              {animal.isIsolated ? 'Release from Isolation' : `Quarantine Tag #${animal.tagId}`}
            </button>

            {/* Export Clinical Report */}
            <button
              onClick={() => onOpenReportModal(animal)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Diagnostic PDF</span>
            </button>
          </div>
        </div>

        {/* Isolation confirmation banner */}
        {showIsolationSuccess && (
          <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-xl text-purple-900 text-xs flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>
                <strong>Quarantine Protocol Updated:</strong> Tag #{animal.tagId} moved to isolation status.
              </span>
            </div>
          </div>
        )}

        {/* Live Hardware Telemetry Strip */}
        <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Cpu className="w-3 h-3 text-slate-400" />
              Bolus Sensor
            </div>
            <div className="font-mono font-bold text-slate-800 text-xs mt-1">{animal.bolusSensorId}</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <BatteryMedium className="w-3 h-3" />
              {animal.bolusBattery}% Battery
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-slate-400" />
              Ear-Tag Sensor
            </div>
            <div className="font-mono font-bold text-slate-800 text-xs mt-1">{animal.earTagSensorId}</div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <BatteryMedium className="w-3 h-3" />
              {animal.earTagBattery}% Battery
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Thermometer className="w-3 h-3 text-red-500" />
              Core Body Temp
            </div>
            <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">
              {formatTemperature(animal.currentCoreTemp, temperatureUnit)}
            </div>
            <div className={`text-[10px] font-semibold mt-0.5 ${animal.currentTempDelta > 0.5 ? 'text-red-600' : 'text-slate-500'}`}>
              {animal.currentTempDelta > 0 ? `+${animal.currentTempDelta}°C vs ML` : `${animal.currentTempDelta}°C`}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3 text-indigo-500" />
              Movement Index
            </div>
            <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">
              {animal.currentActivityIndex}/100
            </div>
            <div className={`text-[10px] font-semibold mt-0.5 ${animal.currentActivityDelta < -20 ? 'text-red-600' : 'text-slate-500'}`}>
              {animal.currentActivityDelta}% deviation
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <HeartPulse className="w-3 h-3 text-teal-600" />
              Daily Rumination
            </div>
            <div className="font-mono font-bold text-sm text-slate-900 mt-0.5">
              {animal.currentRuminationMinDay} min
            </div>
            <div className={`text-[10px] font-semibold mt-0.5 ${animal.currentRuminationDelta < -20 ? 'text-red-600' : 'text-slate-500'}`}>
              {animal.currentRuminationDelta}% vs normal
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-600" />
              Signal & Sync
            </div>
            <div className="font-mono font-bold text-slate-800 text-xs mt-1">{animal.signalStrengthDbm} dBm</div>
            <div className="text-[10px] text-slate-500 mt-0.5 truncate">{animal.lastSyncTimestamp}</div>
          </div>
        </div>
      </div>

      {/* Flagship Charts Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-800">
                7-Day Physiological Telemetry vs ML Baseline
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                IoT 4h Resolution
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Continuous rumen bolus & 3D accelerometer data compared against cow #{animal.tagId}'s trained baseline.
            </p>
          </div>

          {/* Chart View Toggles */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveChartTab('combined')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeChartTab === 'combined'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Signals
            </button>
            <button
              onClick={() => setActiveChartTab('temp')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeChartTab === 'temp'
                  ? 'bg-white text-red-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Core Temp (°{temperatureUnit})
            </button>
            <button
              onClick={() => setActiveChartTab('activity')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeChartTab === 'activity'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Actigraphy & Rumination
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-amber-500 rounded-full inline-block" />
              <span className="font-bold text-slate-700">Actual Core Temp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-slate-300 border-dashed inline-block" />
              <span className="text-slate-500">ML Baseline Expected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-50 border border-emerald-300 rounded-xs inline-block" />
              <span className="text-slate-500">Normal Range (38.2 - 39.1°C)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-indigo-600 rounded-full inline-block" />
              <span className="font-bold text-slate-700">Actigraphy (Motility)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 bg-teal-500 rounded-full inline-block" />
              <span className="text-slate-500">Rumination (Mins)</span>
            </div>
          </div>

          {anomalyStartIndex !== -1 && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Highlighted Area = ML Pre-Symptomatic Window (3-5 Days Early Lead)</span>
            </div>
          )}
        </div>

        {/* CHART 1: Core Body Temperature */}
        {(activeChartTab === 'combined' || activeChartTab === 'temp') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-700 font-semibold px-1">
              <h5 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-500" />
                Core Body Temperature (°{temperatureUnit})
              </h5>
              <span className="text-[11px] text-slate-400">Reticulo-rumen Bolus Telemetry</span>
            </div>

            <div className="h-64 sm:h-72 w-full bg-slate-50/50 rounded-xl p-2 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={processedTelemetry}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    interval={5}
                  />
                  <YAxis
                    domain={
                      temperatureUnit === 'F'
                        ? [100, 106]
                        : [37.8, 41.0]
                    }
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    tickFormatter={(val) => `${val}°`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as TelemetryDataPoint & {
                          displayCoreTemp: number;
                          displayTempBaseline: number;
                        };
                        return (
                          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                            <div className="font-bold text-slate-200 border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
                              <span>{data.day} - {label}</span>
                              {data.isAnomaly && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-600 text-white">
                                  Anomaly Detected
                                </span>
                              )}
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-amber-300">Actual Core Temp:</span>
                              <span className="font-mono font-bold">{data.displayCoreTemp}°{temperatureUnit}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">ML Baseline:</span>
                              <span className="font-mono">{data.displayTempBaseline}°{temperatureUnit}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Deviation:</span>
                              <span className={`font-mono font-bold ${data.coreTemp - data.tempBaseline > 0.4 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {(data.coreTemp - data.tempBaseline > 0 ? '+' : '') +
                                  (data.coreTemp - data.tempBaseline).toFixed(2)}°C
                              </span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  {/* Anomaly Window Shading */}
                  {anomalyStartTimestamp && (
                    <ReferenceArea
                      x1={anomalyStartTimestamp}
                      x2={lastTimestamp}
                      {...({
                        fill: '#fef3c7',
                        fillOpacity: 0.6,
                        stroke: '#f59e0b',
                        strokeDasharray: '4 4',
                      } as any)}
                      label={{
                        value: 'ANOMALY WINDOW (3-5 Days Ahead)',
                        position: 'insideTopLeft',
                        fill: '#d97706',
                        fontSize: 10,
                        fontWeight: 'bold',
                      }}
                    />
                  )}

                  {/* Fever Threshold Line */}
                  <ReferenceLine
                    y={temperatureUnit === 'F' ? 103.5 : 39.7}
                    label={{
                      value: 'Clinical Fever (39.7°C)',
                      position: 'right',
                      fill: '#ef4444',
                      fontSize: 9,
                    }}
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                  />

                  {/* Normal Upper Envelope */}
                  <Area
                    type="monotone"
                    dataKey="displayTempBaselineMax"
                    stroke="none"
                    fill="#ecfdf5"
                    fillOpacity={0.8}
                    name="Normal Baseline Envelope"
                  />

                  {/* ML Baseline Line */}
                  <Line
                    type="monotone"
                    dataKey="displayTempBaseline"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                    name="ML Baseline"
                  />

                  {/* Actual Temperature */}
                  <Line
                    type="monotone"
                    dataKey="displayCoreTemp"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    dot={(props: any) => {
                      const { cx, cy, payload } = props;
                      if (payload.isAnomaly) {
                        return (
                          <circle
                            key={payload.timestamp}
                            cx={cx}
                            cy={cy}
                            r={3.5}
                            fill="#ef4444"
                            stroke="#fff"
                            strokeWidth={1.5}
                          />
                        );
                      }
                      return (
                        <circle
                          key={payload.timestamp}
                          cx={cx}
                          cy={cy}
                          r={2}
                          fill="#10b981"
                          stroke="none"
                        />
                      );
                    }}
                    name="Real-time Core Temp"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* CHART 2: Movement Motility & Rumination */}
        {(activeChartTab === 'combined' || activeChartTab === 'activity') && (
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-700 font-semibold px-1">
              <h5 className="text-sm font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-indigo-600" />
                Activity / Movement Index & Rumination
              </h5>
              <span className="text-[11px] text-slate-400">Ear-Tag 3D Accelerometer Telemetry</span>
            </div>

            <div className="h-56 sm:h-64 w-full bg-slate-50/50 rounded-xl p-2 border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={processedTelemetry}
                  margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="timestamp"
                    tick={{ fontSize: 10, fill: '#64748b' }}
                    interval={5}
                  />
                  <YAxis
                    yAxisId="left"
                    domain={[0, 100]}
                    tick={{ fontSize: 10, fill: '#6366f1' }}
                    tickFormatter={(val) => `${val}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 60]}
                    tick={{ fontSize: 10, fill: '#0d9488' }}
                    tickFormatter={(val) => `${val}m`}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload as TelemetryDataPoint;
                        return (
                          <div className="p-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs space-y-1 border border-slate-800">
                            <div className="font-bold text-slate-200 border-b border-slate-800 pb-1">
                              {data.day} - {label}
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-indigo-300">Actigraphy Index:</span>
                              <span className="font-mono font-bold">{data.activityIndex}/100</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-slate-400">Activity Baseline:</span>
                              <span className="font-mono">{data.activityBaseline}/100</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span className="text-teal-300">Rumination:</span>
                              <span className="font-mono font-bold">{data.ruminationMinutes} min/4h</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />

                  {/* Anomaly Window Shading */}
                  {anomalyStartTimestamp && (
                    <ReferenceArea
                      yAxisId="left"
                      x1={anomalyStartTimestamp}
                      x2={lastTimestamp}
                      {...({
                        fill: '#fef3c7',
                        fillOpacity: 0.4,
                        stroke: '#f59e0b',
                        strokeDasharray: '4 4',
                      } as any)}
                    />
                  )}

                  {/* Rumination Bar */}
                  <Bar
                    yAxisId="right"
                    dataKey="ruminationMinutes"
                    fill="#14b8a6"
                    opacity={0.65}
                    radius={[3, 3, 0, 0]}
                    name="Rumination (Mins)"
                  />

                  {/* Baseline Activity */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="activityBaseline"
                    stroke="#94a3b8"
                    strokeDasharray="3 3"
                    strokeWidth={1.5}
                    dot={false}
                    name="Activity ML Baseline"
                  />

                  {/* Actual Activity */}
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="activityIndex"
                    stroke="#4f46e5"
                    strokeWidth={2.2}
                    dot={false}
                    name="Actigraphy Index"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Grid: System Intelligence Feed & Veterinary Action Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Intelligence Feed (Dark Slate-900 Card from Design) */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h5 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              System Intelligence Feed
            </h5>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              LIVE ML ANALYSIS
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-60 pr-1">
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-red-400 uppercase tracking-wide">Predictive Isolation</span>
                <span className="text-[10px] text-white/40 font-mono">2m ago</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Tag #{animal.tagId} shows febrile trend and activity drop. Predicts early illness ({animal.predictedIllness}). Recommend isolation immediately.
              </p>
            </div>

            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 opacity-80">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">Recovery Update</span>
                <span className="text-[10px] text-white/40 font-mono">4h ago</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tag #3112 temperature normalized. Returning to baseline actigraphy. Monitor for 12 more hours.
              </p>
            </div>

            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 opacity-60">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">Environmental</span>
                <span className="text-[10px] text-white/40 font-mono">6h ago</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ambient humidity spike detected in Barn B. Adjusting ventilation cycles.
              </p>
            </div>
          </div>
        </div>

        {/* Veterinary Action Protocol */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-xs">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h5 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Veterinary Action
              </h5>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Antimicrobial Stewardship
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  defaultChecked={animal.isIsolated}
                  onChange={handleIsolationClick}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  id="chk-isolate-clean"
                />
                <label htmlFor="chk-isolate-clean" className="cursor-pointer">
                  <div className="font-bold text-slate-800">1. Pre-emptive Quarantine Isolation</div>
                  <div className="text-slate-500 text-[11px]">Separate cow #{animal.tagId} to prevent aerosol contagion.</div>
                </label>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  defaultChecked={animal.status === 'critical'}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  id="chk-swab-clean"
                />
                <label htmlFor="chk-swab-clean" className="cursor-pointer">
                  <div className="font-bold text-slate-800">2. Targeted Diagnostic Swab & Auscultation</div>
                  <div className="text-slate-500 text-[11px]">Perform thoracic lung exam before severe clinical respiratory distress.</div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-2.5">
            <button
              onClick={() => onOpenReportModal(animal)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-xs"
            >
              Assign Vet Check & Diagnostic PDF
            </button>
            <button
              onClick={handleIsolationClick}
              className="w-full py-3 bg-white text-red-600 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors"
            >
              {animal.isIsolated ? `Release Tag #${animal.tagId}` : `Quarantine Tag #${animal.tagId}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

