import React, { useState } from 'react';
import { SystemSettings } from '../types';
import { 
  Settings, 
  Save, 
  Sliders, 
  Bell, 
  ShieldCheck, 
  Radio, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  Thermometer,
  Activity,
  HeartPulse
} from 'lucide-react';
import { INITIAL_SETTINGS } from '../data/mockLivestockData';

interface SettingsViewProps {
  settings: SystemSettings;
  onSaveSettings: (newSettings: SystemSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
}) => {
  const [formData, setFormData] = useState<SystemSettings>(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (key: keyof SystemSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setFormData(INITIAL_SETTINGS);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-100 text-slate-800">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                System & Machine Learning Threshold Settings
              </h2>
              <p className="text-xs text-slate-500">
                Calibrate biometric sensitivity, anomaly detection margins, and automated veterinary dispatch rules.
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Defaults
          </button>
        </div>

        {isSaved && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Settings saved successfully. Anomaly detection models updated across active sensor fleet.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="mt-6 space-y-6">
          {/* Section 1: ML Anomaly Thresholds */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Machine Learning Baseline Sensitivity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Temp Delta */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    Core Temperature Delta Trigger
                  </label>
                  <span className="font-mono font-bold text-xs text-red-600">
                    +{formData.tempAnomalyThresholdC}°C above baseline
                  </span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.0"
                  step="0.1"
                  value={formData.tempAnomalyThresholdC}
                  onChange={(e) => handleChange('tempAnomalyThresholdC', parseFloat(e.target.value))}
                  className="w-full accent-red-600"
                />
                <p className="text-[11px] text-slate-500">
                  Thermal divergence required before flagging an early subclinical fever window.
                </p>
              </div>

              {/* Actigraphy Motility Drop */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-indigo-600" />
                    Actigraphy Movement Drop
                  </label>
                  <span className="font-mono font-bold text-xs text-indigo-600">
                    -{formData.activityAnomalyDropThresholdPct}% from baseline
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={formData.activityAnomalyDropThresholdPct}
                  onChange={(e) => handleChange('activityAnomalyDropThresholdPct', parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-[11px] text-slate-500">
                  Percentage drop in daily 3D accelerometer activity index indicating pre-symptomatic lethargy.
                </p>
              </div>

              {/* Rumination Drop */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-teal-600" />
                    Rumination Suppression Threshold
                  </label>
                  <span className="font-mono font-bold text-xs text-teal-600">
                    -{formData.ruminationAnomalyDropThresholdPct}% motility
                  </span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={formData.ruminationAnomalyDropThresholdPct}
                  onChange={(e) => handleChange('ruminationAnomalyDropThresholdPct', parseInt(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <p className="text-[11px] text-slate-500">
                  Critical indicator for early digestive arrest, Acidosis (SARA), and systemic infections.
                </p>
              </div>

              {/* ML Confidence */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    ML Model Confidence Floor
                  </label>
                  <span className="font-mono font-bold text-xs text-emerald-600">
                    {formData.mlConfidenceThresholdPct}% confidence
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={formData.mlConfidenceThresholdPct}
                  onChange={(e) => handleChange('mlConfidenceThresholdPct', parseInt(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <p className="text-[11px] text-slate-500">
                  Confidence score threshold before promoting telemetry warning to "Critical Isolation".
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: IoT Telemetry Fleet & Notification Preferences */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <Radio className="w-4 h-4 text-slate-500" />
              Telemetry Fleet & Automated Alerts
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 block">
                  IoT Sensor Gateway Polling Frequency
                </label>
                <select
                  value={formData.telemetryIntervalMinutes}
                  onChange={(e) => handleChange('telemetryIntervalMinutes', parseInt(e.target.value))}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800"
                >
                  <option value={5}>Every 5 minutes (Ultra High Precision - Higher Battery Drain)</option>
                  <option value={15}>Every 15 minutes (Recommended Standard)</option>
                  <option value={30}>Every 30 minutes (Balanced)</option>
                  <option value={60}>Every 1 hour (Extended Battery Life)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-800 block">
                  Automated Isolation Recommendation
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto-quarantine"
                    checked={formData.autoQuarantineSuggestion}
                    onChange={(e) => handleChange('autoQuarantineSuggestion', e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="auto-quarantine" className="text-xs text-slate-700 cursor-pointer">
                    Auto-recommend Quarantine Bay assignment upon critical BRD detection
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

