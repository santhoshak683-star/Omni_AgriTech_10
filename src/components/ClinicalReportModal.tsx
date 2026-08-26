import React from 'react';
import { 
  Animal 
} from '../types';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  ShieldAlert, 
  Thermometer, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Building2 
} from 'lucide-react';
import { formatTemperature } from '../utils/formatters';
import { CowAvatar } from './CowIllustrations';

interface ClinicalReportModalProps {
  animal: Animal | null;
  onClose: () => void;
  temperatureUnit: 'C' | 'F';
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({
  animal,
  onClose,
  temperatureUnit,
}) => {
  if (!animal) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">
              Veterinary Telemetry Diagnostic Dossier
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Printable Dossier */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs">
          {/* Header Metadata */}
          <div className="flex items-start justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Biometric Livestock Health Predictor
              </h2>
              <p className="text-slate-500">Techhorizon IoT Telemetry System • Pine Valley Dairy Operations</p>
              <p className="text-slate-400 font-mono text-[11px] mt-0.5">
                Report Generated: 2026-08-24 07:58 UTC | Supervised Veterinarian: Dr. Sarah Jenkins, DVM
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 font-mono font-bold text-sm text-slate-800">
                DOSSIER #{animal.tagId}-2026
              </span>
            </div>
          </div>

          {/* Animal Profile */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-slate-300 shrink-0 bg-slate-200">
              <CowAvatar
                src={animal.photoUrl || '/images/cow-hero.jpg'}
                alt={animal.name}
                tagId={animal.tagId}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Animal ID</span>
                <span className="font-bold text-slate-800 text-sm">{animal.tagId} ({animal.name})</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Breed & Age</span>
                <span className="font-semibold text-slate-800">{animal.breed}, {animal.ageMonths}m</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Pen / Group</span>
                <span className="font-semibold text-slate-800">{animal.penLocation}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Hardware Sensors</span>
                <span className="font-mono text-slate-800">{animal.bolusSensorId} | {animal.earTagSensorId}</span>
              </div>
            </div>
          </div>

          {/* ML Anomaly Assessment */}
          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-red-900 text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Pre-Symptomatic ML Diagnostic Summary
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                Confidence: {animal.riskProbability}%
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-slate-800">
              <div>
                <strong className="text-slate-700">Condition Predicted:</strong>
                <p className="text-slate-900 font-semibold">{animal.predictedIllness}</p>
              </div>
              <div>
                <strong className="text-slate-700">Pre-Clinical Lead Time:</strong>
                <p className="text-amber-800 font-bold">{animal.symptomLeadTimeDays} Days Before Symptoms</p>
              </div>
              <div>
                <strong className="text-slate-700">Isolation Status:</strong>
                <p className="text-slate-900 font-semibold">
                  {animal.isIsolated ? 'Isolated in Quarantine Bay' : 'Isolation Recommended'}
                </p>
              </div>
            </div>
          </div>

          {/* Quantitative Telemetry Vitals */}
          <div>
            <h4 className="font-bold text-slate-800 mb-2 uppercase text-[11px] tracking-wider">
              Telemetry Vitals vs Trained Baseline
            </h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-slate-500 block text-[10px]">Core Body Temperature</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {formatTemperature(animal.currentCoreTemp, temperatureUnit)}
                </span>
                <span className="text-[10px] block text-red-600 font-bold">
                  +{animal.currentTempDelta}°C vs Baseline
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-slate-500 block text-[10px]">Actigraphy Motility Index</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {animal.currentActivityIndex}/100
                </span>
                <span className="text-[10px] block text-red-600 font-bold">
                  {animal.currentActivityDelta}% suppression
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                <span className="text-slate-500 block text-[10px]">Daily Rumination</span>
                <span className="text-base font-bold text-slate-900 font-mono">
                  {animal.currentRuminationMinDay} mins
                </span>
                <span className="text-[10px] block text-red-600 font-bold">
                  {animal.currentRuminationDelta}% vs normal
                </span>
              </div>
            </div>
          </div>

          {/* Recommended Clinical Protocol */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
            <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Targeted Treatment Protocol (Antimicrobial Stewardship)
            </h4>
            <p className="text-emerald-900 text-xs leading-relaxed">
              Early intervention window prevents full bacterial colonisation. Recommended initial step: single dose non-steroidal anti-inflammatory (NSAID) + oral electrolyte drench. Avoid prophylactic herd antibiotic exposure.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Techhorizon Biometric Health Engine v3.2
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

