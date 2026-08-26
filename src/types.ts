export type HealthStatus = 'healthy' | 'at-risk' | 'critical';

export interface TelemetryDataPoint {
  timestamp: string; // e.g. "Mon 00:00" or ISO
  day: string; // e.g. "Day 1", "Day 2", ...
  hour: number;
  // Core Temperature (°C)
  coreTemp: number;
  tempBaseline: number;
  tempBaselineMin: number;
  tempBaselineMax: number;
  // Behavioral Actigraphy / Movement (Index 0-100 or steps/hr)
  activityIndex: number;
  activityBaseline: number;
  activityBaselineMin: number;
  activityBaselineMax: number;
  // Rumination (minutes / hour or total hrs/day)
  ruminationMinutes: number;
  ruminationBaseline: number;
  // Water intake (Liters / 4h)
  waterIntake: number;
  // Flags
  isAnomaly: boolean;
  anomalyScore?: number; // 0 - 100
  notes?: string;
}

export interface AnomalyWindow {
  startDay: string;
  endDay: string;
  anomalyType: 'Temperature Spike' | 'Hypo-Activity' | 'Rumination Drop' | 'Combined Physiological Stress';
  leadTimeHours: number; // e.g., 72 hours (3 days) lead time before clinical symptoms
  confidence: number; // 0-100%
  predictedCondition: string; // e.g., "Bovine Respiratory Disease (BRD)", "Acute Mastitis", "Subacute Ruminal Acidosis"
  recommendedAction: string;
}

export interface Animal {
  id: string; // e.g. "8492"
  tagId: string; // e.g. "#8492"
  rfidTag: string; // "RFID-982-1008492"
  name: string; // "Bella"
  breed: string; // "Holstein Friesian"
  ageMonths: number;
  lactationNumber: number;
  penLocation: string; // "Pen 4B - North Barn"
  pastureGroup: string; // "High Yield Group A"
  weightKg: number;
  photoUrl: string;
  status: HealthStatus;
  
  // Hardware sensors
  bolusSensorId: string; // "BL-9842"
  bolusBattery: number; // %
  earTagSensorId: string; // "ET-8492"
  earTagBattery: number; // %
  lastSyncTimestamp: string;
  signalStrengthDbm: number; // e.g. -68 dBm

  // Current Live Vitals
  currentCoreTemp: number; // °C
  currentTempDelta: number; // e.g. +1.4°C vs ML Baseline
  currentActivityIndex: number; // 0-100
  currentActivityDelta: number; // -42% vs ML Baseline
  currentRuminationMinDay: number; // min/day
  currentRuminationDelta: number; // -35%
  waterVisits24h: number;

  // ML Prediction Insights
  riskProbability: number; // 0 - 100%
  predictedIllness: string;
  symptomLeadTimeDays: number; // 3-5 days
  isolationRecommended: boolean;
  isIsolated: boolean;
  isolationDate?: string;
  quarantinePen?: string;

  // Telemetry 7-day historical dataset
  telemetryHistory: TelemetryDataPoint[];
  anomalyWindows: AnomalyWindow[];

  // Clinical Notes & History
  veterinaryNotes: Array<{
    id: string;
    date: string;
    author: string;
    text: string;
    actionTaken?: string;
  }>;
}

export interface AlertNotification {
  id: string;
  animalId: string;
  tagId: string;
  animalName: string;
  penLocation: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  predictedCondition: string;
  leadTimeDays: number;
  timestamp: string;
  acknowledged: boolean;
  actionTaken?: 'isolated' | 'vet_dispatched' | 'monitoring' | 'dismissed';
}

export interface FarmMetrics {
  totalMonitored: number;
  healthyCount: number;
  atRiskCount: number;
  criticalCount: number;
  activeAlerts: number;
  isolatedCount: number;
  estimatedAntibioticDosesSaved: number;
  averageEarlyDetectionLeadDays: number;
  sensorHealthPercentage: number;
}

export interface SystemSettings {
  tempAnomalyThresholdC: number; // e.g. +0.8°C above ML baseline
  activityAnomalyDropThresholdPct: number; // e.g. 25% drop
  ruminationAnomalyDropThresholdPct: number; // e.g. 30% drop
  mlConfidenceThresholdPct: number; // e.g. 75%
  telemetryIntervalMinutes: number; // e.g. 15
  autoQuarantineSuggestion: boolean;
  enableSmsAlerts: boolean;
  enableEmailAlerts: boolean;
  temperatureUnit: 'C' | 'F';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Farm Director' | 'Chief Veterinarian' | 'Herd Operations Lead' | 'Dairy Agronomist';
  farmName: string;
  avatarUrl: string;
  facilityLocation: string;
}
