import { Animal, AlertNotification, FarmMetrics, TelemetryDataPoint } from '../types';

// Helper to generate 7-day (every 4 hours = 42 points) realistic telemetry for cow #8492
const generateTelemetryFor8492 = (): TelemetryDataPoint[] => {
  const points: TelemetryDataPoint[] = [];
  const days = ['Day 1 (Mon)', 'Day 2 (Tue)', 'Day 3 (Wed)', 'Day 4 (Thu)', 'Day 5 (Fri)', 'Day 6 (Sat)', 'Day 7 (Today)'];
  const hours = [0, 4, 8, 12, 16, 20];

  days.forEach((day, dayIndex) => {
    hours.forEach((hour) => {
      // Normal diurnal rhythm: slightly cooler at night (38.4 - 38.6), warmer in afternoon (38.8 - 39.0)
      const diurnalOffset = Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 0.25;
      const baseTemp = 38.65 + diurnalOffset;
      const baseTempMin = 38.2;
      const baseTempMax = 39.1;

      // Normal activity: lower at night (15-25), peak morning/evening (65-80)
      const baseActivity = hour >= 6 && hour <= 18 ? 72 : 28;
      const baseActivityMin = hour >= 6 && hour <= 18 ? 55 : 15;
      const baseActivityMax = hour >= 6 && hour <= 18 ? 90 : 40;

      // Base rumination: 40-55 mins/hr during rest periods
      const baseRumination = hour < 6 || hour > 20 ? 50 : 25;

      let actualTemp = baseTemp + (Math.random() * 0.15 - 0.075);
      let actualActivity = baseActivity + (Math.random() * 8 - 4);
      let actualRumination = baseRumination + (Math.random() * 6 - 3);
      let isAnomaly = false;
      let anomalyScore = 0;
      let notes = '';

      // Starting Day 5 afternoon (Day index 4, hour >= 12), subtle anomaly begins (3.5 days before clinical fever)
      if (dayIndex === 4 && hour >= 12) {
        actualTemp += 0.45; // early subclinical hyperthermia
        actualActivity *= 0.82; // slight lethargy
        actualRumination *= 0.80;
        isAnomaly = true;
        anomalyScore = 62;
        notes = 'Early subtle temperature deviation detected by ML model';
      } else if (dayIndex === 5) {
        actualTemp += 0.85; // reaching ~39.6°C
        actualActivity *= 0.60; // actigraphy drops noticeably
        actualRumination *= 0.65;
        isAnomaly = true;
        anomalyScore = 84;
        notes = 'Persistent core temperature divergence + 40% reduced motility';
      } else if (dayIndex === 6) {
        actualTemp += 1.35; // reaching ~40.2°C - 40.4°C acute fever threshold
        actualActivity *= 0.42; // severe lethargy / prolonged lying
        actualRumination *= 0.48; // acute rumination arrest
        isAnomaly = true;
        anomalyScore = 95;
        notes = 'Critical physiological deviation: BRD onset predicted in 3-5 days lead-window';
      }

      points.push({
        timestamp: `${day.split(' ')[0]} ${String(hour).padStart(2, '0')}:00`,
        day,
        hour,
        coreTemp: Number(actualTemp.toFixed(2)),
        tempBaseline: Number(baseTemp.toFixed(2)),
        tempBaselineMin: Number(baseTempMin.toFixed(2)),
        tempBaselineMax: Number(baseTempMax.toFixed(2)),
        activityIndex: Math.max(5, Math.round(actualActivity)),
        activityBaseline: Math.round(baseActivity),
        activityBaselineMin: Math.round(baseActivityMin),
        activityBaselineMax: Math.round(baseActivityMax),
        ruminationMinutes: Math.max(4, Math.round(actualRumination)),
        ruminationBaseline: Math.round(baseRumination),
        waterIntake: hour === 12 || hour === 16 ? (dayIndex >= 5 ? 4.2 : 9.5) : 0,
        isAnomaly,
        anomalyScore,
        notes,
      });
    });
  });

  return points;
};

// Helper for generating healthy animal telemetry
const generateHealthyTelemetry = (baseT = 38.6, baseA = 70): TelemetryDataPoint[] => {
  const points: TelemetryDataPoint[] = [];
  const days = ['Day 1 (Mon)', 'Day 2 (Tue)', 'Day 3 (Wed)', 'Day 4 (Thu)', 'Day 5 (Fri)', 'Day 6 (Sat)', 'Day 7 (Today)'];
  const hours = [0, 4, 8, 12, 16, 20];

  days.forEach((day) => {
    hours.forEach((hour) => {
      const diurnalOffset = Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 0.2;
      const baseTemp = baseT + diurnalOffset;
      const baseActivity = hour >= 6 && hour <= 18 ? baseA : 25;
      const baseRumination = hour < 6 || hour > 20 ? 48 : 22;

      points.push({
        timestamp: `${day.split(' ')[0]} ${String(hour).padStart(2, '0')}:00`,
        day,
        hour,
        coreTemp: Number((baseTemp + (Math.random() * 0.12 - 0.06)).toFixed(2)),
        tempBaseline: Number(baseTemp.toFixed(2)),
        tempBaselineMin: 38.2,
        tempBaselineMax: 39.1,
        activityIndex: Math.round(baseActivity + (Math.random() * 6 - 3)),
        activityBaseline: Math.round(baseActivity),
        activityBaselineMin: Math.round(baseActivity * 0.8),
        activityBaselineMax: Math.round(baseActivity * 1.2),
        ruminationMinutes: Math.round(baseRumination + (Math.random() * 4 - 2)),
        ruminationBaseline: Math.round(baseRumination),
        waterIntake: hour === 12 ? 10.5 : hour === 16 ? 8.2 : 0,
        isAnomaly: false,
      });
    });
  });

  return points;
};

export const MOCK_ANIMALS: Animal[] = [
  {
    id: '8492',
    tagId: '#8492',
    rfidTag: 'RFID-982-1008492',
    name: 'Bella (Flagship Case)',
    breed: 'Holstein Friesian',
    ageMonths: 42,
    lactationNumber: 2,
    penLocation: 'Pen 4B - North Barn',
    pastureGroup: 'High Yield Lactation 1',
    weightKg: 645,
    photoUrl: '/images/cow-hero.jpg',
    status: 'critical',
    bolusSensorId: 'BL-9842',
    bolusBattery: 92,
    earTagSensorId: 'ET-8492',
    earTagBattery: 88,
    lastSyncTimestamp: '2 mins ago (Live IoT)',
    signalStrengthDbm: -64,
    currentCoreTemp: 40.35,
    currentTempDelta: 1.45,
    currentActivityIndex: 22,
    currentActivityDelta: -48,
    currentRuminationMinDay: 285,
    currentRuminationDelta: -38,
    waterVisits24h: 3,
    riskProbability: 94,
    predictedIllness: 'Bovine Respiratory Disease (BRD)',
    symptomLeadTimeDays: 3.5,
    isolationRecommended: true,
    isIsolated: false,
    quarantinePen: 'Quarantine Bay Alpha',
    telemetryHistory: generateTelemetryFor8492(),
    anomalyWindows: [
      {
        startDay: 'Day 5 (Fri) 12:00',
        endDay: 'Day 7 (Today)',
        anomalyType: 'Combined Physiological Stress',
        leadTimeHours: 84,
        confidence: 94,
        predictedCondition: 'Bovine Respiratory Disease (BRD) / Pre-clinical Pneumonia',
        recommendedAction: 'Immediate isolation to quarantine pen; administer targeted NSAID & electrolyte supportive therapy. Culture nasal swab before starting systemic antimicrobials.',
      },
    ],
    veterinaryNotes: [
      {
        id: 'vn-1',
        date: '2026-08-24 07:15',
        author: 'Dr. Sarah Jenkins, DVM',
        text: 'Automated ML alert flagged +1.4°C core hyperthermia and 48% actigraphy suppression. Cow shows no open mouth breathing yet; vital lead time window confirmed.',
        actionTaken: 'Flagged for urgent isolation protocol.',
      },
      {
        id: 'vn-2',
        date: '2026-08-23 16:30',
        author: 'Marcus Vance (Farm Tech)',
        text: 'Reticulo-rumen bolus BL-9842 verified calibrated. Battery 92%. Sensor telemetry verified accurate.',
      },
    ],
  },
  {
    id: '7214',
    tagId: '#7214',
    rfidTag: 'RFID-982-1007214',
    name: 'Daisy',
    breed: 'Jersey Cross',
    ageMonths: 36,
    lactationNumber: 2,
    penLocation: 'Pen 2A - West Barn',
    pastureGroup: 'Pasture Field 3',
    weightKg: 490,
    photoUrl: '/images/cow-jersey.jpg',
    status: 'at-risk',
    bolusSensorId: 'BL-7214',
    bolusBattery: 95,
    earTagSensorId: 'ET-7214',
    earTagBattery: 91,
    lastSyncTimestamp: '4 mins ago',
    signalStrengthDbm: -71,
    currentCoreTemp: 39.45,
    currentTempDelta: 0.65,
    currentActivityIndex: 44,
    currentActivityDelta: -28,
    currentRuminationMinDay: 360,
    currentRuminationDelta: -22,
    waterVisits24h: 5,
    riskProbability: 78,
    predictedIllness: 'Subclinical Mastitis',
    symptomLeadTimeDays: 4.2,
    isolationRecommended: true,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.8, 60),
    anomalyWindows: [
      {
        startDay: 'Day 6 (Sat) 08:00',
        endDay: 'Day 7 (Today)',
        anomalyType: 'Temperature Spike',
        leadTimeHours: 96,
        confidence: 78,
        predictedCondition: 'Early Subclinical Mastitis',
        recommendedAction: 'Perform California Mastitis Test (CMT) during next milking. Isolate quarter if SCC > 400,000 cells/ml.',
      },
    ],
    veterinaryNotes: [
      {
        id: 'vn-3',
        date: '2026-08-24 06:40',
        author: 'System Auto-Telemetry',
        text: 'Slight thermal gradient rise (+0.65°C) paired with 28% reduced lying comfort index.',
      },
    ],
  },
  {
    id: '6105',
    tagId: '#6105',
    rfidTag: 'RFID-982-1006105',
    name: 'Buttercup',
    breed: 'Brown Swiss',
    ageMonths: 48,
    lactationNumber: 3,
    penLocation: 'Pen 3C - South Barn',
    pastureGroup: 'High Yield Lactation 2',
    weightKg: 680,
    photoUrl: '/images/cow-brown-swiss.jpg',
    status: 'at-risk',
    bolusSensorId: 'BL-6105',
    bolusBattery: 86,
    earTagSensorId: 'ET-6105',
    earTagBattery: 84,
    lastSyncTimestamp: '1 min ago',
    signalStrengthDbm: -68,
    currentCoreTemp: 39.3,
    currentTempDelta: 0.5,
    currentActivityIndex: 51,
    currentActivityDelta: -20,
    currentRuminationMinDay: 380,
    currentRuminationDelta: -18,
    waterVisits24h: 6,
    riskProbability: 71,
    predictedIllness: 'Subacute Ruminal Acidosis (SARA)',
    symptomLeadTimeDays: 3.8,
    isolationRecommended: false,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.7, 65),
    anomalyWindows: [
      {
        startDay: 'Day 6 (Sat) 16:00',
        endDay: 'Day 7 (Today)',
        anomalyType: 'Rumination Drop',
        leadTimeHours: 64,
        confidence: 71,
        predictedCondition: 'Subacute Ruminal Acidosis (SARA)',
        recommendedAction: 'Inspect total mixed ration (TMR) fiber length. Provide supplemental sodium bicarbonate buffer in mineral trough.',
      },
    ],
    veterinaryNotes: [],
  },
  {
    id: '9180',
    tagId: '#9180',
    rfidTag: 'RFID-982-1009180',
    name: 'Molly',
    breed: 'Holstein Friesian',
    ageMonths: 30,
    lactationNumber: 1,
    penLocation: 'Pen 1A - North Barn',
    pastureGroup: 'Fresh Cow Pen',
    weightKg: 590,
    photoUrl: '/images/cow-portrait.jpg',
    status: 'critical',
    bolusSensorId: 'BL-9180',
    bolusBattery: 90,
    earTagSensorId: 'ET-9180',
    earTagBattery: 89,
    lastSyncTimestamp: 'Just now',
    signalStrengthDbm: -62,
    currentCoreTemp: 40.1,
    currentTempDelta: 1.3,
    currentActivityIndex: 25,
    currentActivityDelta: -45,
    currentRuminationMinDay: 290,
    currentRuminationDelta: -36,
    waterVisits24h: 2,
    riskProbability: 91,
    predictedIllness: 'Acute Postpartum Metritis',
    symptomLeadTimeDays: 4.0,
    isolationRecommended: true,
    isIsolated: true,
    isolationDate: '2026-08-24 06:00',
    quarantinePen: 'Quarantine Bay Beta',
    telemetryHistory: generateHealthyTelemetry(39.1, 40),
    anomalyWindows: [
      {
        startDay: 'Day 5 (Fri) 04:00',
        endDay: 'Day 7 (Today)',
        anomalyType: 'Combined Physiological Stress',
        leadTimeHours: 90,
        confidence: 91,
        predictedCondition: 'Acute Postpartum Metritis',
        recommendedAction: 'Already moved to Quarantine Bay Beta. Vet uterine lavage and anti-inflammatory protocol underway.',
      },
    ],
    veterinaryNotes: [
      {
        id: 'vn-4',
        date: '2026-08-24 06:10',
        author: 'Dr. Sarah Jenkins, DVM',
        text: 'Cow successfully isolated into Quarantine Bay Beta upon IoT threshold breach. Early intervention will prevent systemic sepsis.',
        actionTaken: 'Isolated & Supportive fluids administered.',
      },
    ],
  },
  {
    id: '5033',
    tagId: '#5033',
    rfidTag: 'RFID-982-1005033',
    name: 'Penny',
    breed: 'Guernsey',
    ageMonths: 52,
    lactationNumber: 4,
    penLocation: 'Pen 5A - East Pasture',
    pastureGroup: 'Pasture Grazing Group 2',
    weightKg: 520,
    photoUrl: '/images/cow-guernsey.jpg',
    status: 'healthy',
    bolusSensorId: 'BL-5033',
    bolusBattery: 98,
    earTagSensorId: 'ET-5033',
    earTagBattery: 94,
    lastSyncTimestamp: '3 mins ago',
    signalStrengthDbm: -74,
    currentCoreTemp: 38.6,
    currentTempDelta: 0.05,
    currentActivityIndex: 76,
    currentActivityDelta: +3,
    currentRuminationMinDay: 495,
    currentRuminationDelta: +2,
    waterVisits24h: 9,
    riskProbability: 4,
    predictedIllness: 'None (Optimal Baseline)',
    symptomLeadTimeDays: 0,
    isolationRecommended: false,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.6, 75),
    anomalyWindows: [],
    veterinaryNotes: [],
  },
  {
    id: '4112',
    tagId: '#4112',
    rfidTag: 'RFID-982-1004112',
    name: 'Clover',
    breed: 'Holstein Friesian',
    ageMonths: 28,
    lactationNumber: 1,
    penLocation: 'Pen 4B - North Barn',
    pastureGroup: 'High Yield Lactation 1',
    weightKg: 610,
    photoUrl: '/images/cow-hero.jpg',
    status: 'healthy',
    bolusSensorId: 'BL-4112',
    bolusBattery: 93,
    earTagSensorId: 'ET-4112',
    earTagBattery: 90,
    lastSyncTimestamp: '6 mins ago',
    signalStrengthDbm: -67,
    currentCoreTemp: 38.7,
    currentTempDelta: +0.1,
    currentActivityIndex: 72,
    currentActivityDelta: -1,
    currentRuminationMinDay: 480,
    currentRuminationDelta: +1,
    waterVisits24h: 8,
    riskProbability: 6,
    predictedIllness: 'None (Optimal Baseline)',
    symptomLeadTimeDays: 0,
    isolationRecommended: false,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.65, 72),
    anomalyWindows: [],
    veterinaryNotes: [],
  },
  {
    id: '3398',
    tagId: '#3398',
    rfidTag: 'RFID-982-1003398',
    name: 'Rosie',
    breed: 'Simmental Cross',
    ageMonths: 60,
    lactationNumber: 4,
    penLocation: 'Pen 2C - West Barn',
    pastureGroup: 'High Yield Lactation 2',
    weightKg: 710,
    photoUrl: '/images/cow-pasture.jpg',
    status: 'healthy',
    bolusSensorId: 'BL-3398',
    bolusBattery: 89,
    earTagSensorId: 'ET-3398',
    earTagBattery: 87,
    lastSyncTimestamp: '1 min ago',
    signalStrengthDbm: -65,
    currentCoreTemp: 38.55,
    currentTempDelta: -0.05,
    currentActivityIndex: 70,
    currentActivityDelta: +1,
    currentRuminationMinDay: 510,
    currentRuminationDelta: +5,
    waterVisits24h: 10,
    riskProbability: 3,
    predictedIllness: 'None (Optimal Baseline)',
    symptomLeadTimeDays: 0,
    isolationRecommended: false,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.55, 70),
    anomalyWindows: [],
    veterinaryNotes: [],
  },
  {
    id: '8801',
    tagId: '#8801',
    rfidTag: 'RFID-982-1008801',
    name: 'Ruby',
    breed: 'Ayrshire',
    ageMonths: 34,
    lactationNumber: 2,
    penLocation: 'Pen 3A - South Barn',
    pastureGroup: 'Pasture Grazing Group 1',
    weightKg: 560,
    photoUrl: '/images/farm-animals.jpg',
    status: 'healthy',
    bolusSensorId: 'BL-8801',
    bolusBattery: 96,
    earTagSensorId: 'ET-8801',
    earTagBattery: 95,
    lastSyncTimestamp: '5 mins ago',
    signalStrengthDbm: -72,
    currentCoreTemp: 38.65,
    currentTempDelta: 0.0,
    currentActivityIndex: 74,
    currentActivityDelta: +2,
    currentRuminationMinDay: 490,
    currentRuminationDelta: 0,
    waterVisits24h: 8,
    riskProbability: 5,
    predictedIllness: 'None (Optimal Baseline)',
    symptomLeadTimeDays: 0,
    isolationRecommended: false,
    isIsolated: false,
    telemetryHistory: generateHealthyTelemetry(38.65, 74),
    anomalyWindows: [],
    veterinaryNotes: [],
  },
];

export const MOCK_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'alert-1',
    animalId: '8492',
    tagId: '#8492',
    animalName: 'Bella',
    penLocation: 'Pen 4B - North Barn',
    severity: 'critical',
    title: 'Critical BRD Telemetry Anomaly Detected',
    message: 'Core temperature spike (+1.45°C) and low rumination (-38%). Machine Learning predicts Bovine Respiratory Disease onset in 3.5 days. Recommend immediate isolation.',
    predictedCondition: 'Bovine Respiratory Disease (BRD)',
    leadTimeDays: 3.5,
    timestamp: '12 minutes ago',
    acknowledged: false,
  },
  {
    id: 'alert-2',
    animalId: '9180',
    tagId: '#9180',
    animalName: 'Molly',
    penLocation: 'Quarantine Bay Beta',
    severity: 'critical',
    title: 'Postpartum Thermal Spike Confirmed',
    message: 'Bolus BL-9180 sustained 40.1°C core hyperthermia with 45% actigraphy drop. Animal already isolated in Quarantine Bay Beta.',
    predictedCondition: 'Acute Postpartum Metritis',
    leadTimeDays: 4.0,
    timestamp: '1 hour ago',
    acknowledged: true,
    actionTaken: 'isolated',
  },
  {
    id: 'alert-3',
    animalId: '7214',
    tagId: '#7214',
    animalName: 'Daisy',
    penLocation: 'Pen 2A - West Barn',
    severity: 'warning',
    title: 'Early Subclinical Mastitis Warning',
    message: 'Core temperature deviation (+0.65°C) and localized restlessness. ML predicts somatic cell count surge within 4.2 days.',
    predictedCondition: 'Subclinical Mastitis',
    leadTimeDays: 4.2,
    timestamp: '2 hours ago',
    acknowledged: false,
  },
  {
    id: 'alert-4',
    animalId: '6105',
    tagId: '#6105',
    animalName: 'Buttercup',
    penLocation: 'Pen 3C - South Barn',
    severity: 'warning',
    title: 'Rumination Motility Disruption Alert',
    message: 'Rumination minutes dropped 18% below individual ML baseline. Potential subacute ruminal acidosis (SARA) detected.',
    predictedCondition: 'Subacute Ruminal Acidosis',
    leadTimeDays: 3.8,
    timestamp: '4 hours ago',
    acknowledged: false,
  },
];

export const INITIAL_FARM_METRICS: FarmMetrics = {
  totalMonitored: 420,
  healthyCount: 389,
  atRiskCount: 23,
  criticalCount: 8,
  activeAlerts: 4,
  isolatedCount: 3,
  estimatedAntibioticDosesSaved: 142,
  averageEarlyDetectionLeadDays: 3.8,
  sensorHealthPercentage: 99.4,
};

export const INITIAL_SETTINGS = {
  tempAnomalyThresholdC: 0.8,
  activityAnomalyDropThresholdPct: 25,
  ruminationAnomalyDropThresholdPct: 30,
  mlConfidenceThresholdPct: 75,
  telemetryIntervalMinutes: 15,
  autoQuarantineSuggestion: true,
  enableSmsAlerts: true,
  enableEmailAlerts: true,
  temperatureUnit: 'C' as const,
};
