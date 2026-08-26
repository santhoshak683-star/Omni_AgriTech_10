import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, NavTab } from './components/Sidebar';
import { MetricsOverview } from './components/MetricsOverview';
import { AnimalDetailView } from './components/AnimalDetailView';
import { AlertsFeed } from './components/AlertsFeed';
import { LivestockDirectory } from './components/LivestockDirectory';
import { SettingsView } from './components/SettingsView';
import { ClinicalReportModal } from './components/ClinicalReportModal';
import { RenoFarmLanding } from './components/RenoFarmLanding';
import { RenoFarmLoginModal } from './components/RenoFarmLoginModal';
import { 
  MOCK_ANIMALS, 
  MOCK_NOTIFICATIONS, 
  INITIAL_FARM_METRICS, 
  INITIAL_SETTINGS 
} from './data/mockLivestockData';
import { DEMO_USERS } from './data/renoFarmData';
import { Animal, AlertNotification, FarmMetrics, SystemSettings, UserProfile } from './types';
import { ShieldAlert, Sparkles, RefreshCw, CheckCircle2, LayoutDashboard, Compass } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'portal' | 'dashboard'>('portal');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(DEMO_USERS[0]); // Default to Martin Saris
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<NavTab>('overview');
  const [animals, setAnimals] = useState<Animal[]>(MOCK_ANIMALS);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal>(MOCK_ANIMALS[0]); // Default to cow #8492
  const [alerts, setAlerts] = useState<AlertNotification[]>(MOCK_NOTIFICATIONS);
  const [metrics, setMetrics] = useState<FarmMetrics>(INITIAL_FARM_METRICS);
  const [settings, setSettings] = useState<SystemSettings>(INITIAL_SETTINGS);
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>('C');
  const [selectedMetricFilter, setSelectedMetricFilter] = useState<'all' | 'healthy' | 'at-risk' | 'critical'>('all');
  const [reportModalAnimal, setReportModalAnimal] = useState<Animal | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Temperature Unit
  const handleToggleTempUnit = () => {
    setTemperatureUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  // Handle Animal Selection
  const handleSelectAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    if (currentTab !== 'overview') {
      setCurrentTab('overview');
    }
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick Select Cow #8492
  const handleQuickSelect8492 = () => {
    const cow8492 = animals.find((a) => a.id === '8492') || animals[0];
    handleSelectAnimal(cow8492);
  };

  // Toggle Isolation Status
  const handleToggleIsolation = (animalId: string) => {
    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id === animalId) {
          const nextIsolated = !a.isIsolated;
          return {
            ...a,
            isIsolated: nextIsolated,
            isolationDate: nextIsolated ? new Date().toISOString() : undefined,
            quarantinePen: nextIsolated ? 'Quarantine Bay Alpha' : undefined,
          };
        }
        return a;
      })
    );

    if (selectedAnimal.id === animalId) {
      setSelectedAnimal((prev) => ({
        ...prev,
        isIsolated: !prev.isIsolated,
        quarantinePen: !prev.isIsolated ? 'Quarantine Bay Alpha' : undefined,
      }));
    }

    setMetrics((prev) => ({
      ...prev,
      isolatedCount: prev.isolatedCount + (selectedAnimal.isIsolated ? -1 : 1),
    }));

    showToast(`Updated isolation protocol for Tag #${animalId}.`);
  };

  // Acknowledge Alert
  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
    setMetrics((prev) => ({
      ...prev,
      activeAlerts: Math.max(0, prev.activeAlerts - 1),
    }));
    showToast('Alert acknowledged by farm manager.');
  };

  // Select Animal By Tag from Alert
  const handleSelectAnimalByTag = (tagId: string) => {
    const found = animals.find((a) => a.tagId === tagId || a.id === tagId.replace('#', ''));
    if (found) {
      handleSelectAnimal(found);
    }
  };

  // Simulate Incoming Real-Time IoT Telemetry Stream
  const handleSimulateTelemetry = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setAnimals((prev) =>
        prev.map((a) => {
          const randomTempJitter = Number((Math.random() * 0.08 - 0.04).toFixed(2));
          const newTemp = Number((a.currentCoreTemp + randomTempJitter).toFixed(2));
          return {
            ...a,
            currentCoreTemp: newTemp,
            lastSyncTimestamp: 'Just now (Live 915MHz LoRa)',
          };
        })
      );
      if (selectedAnimal) {
        setSelectedAnimal((prev) => ({
          ...prev,
          currentCoreTemp: Number((prev.currentCoreTemp + (Math.random() * 0.06 - 0.03)).toFixed(2)),
          lastSyncTimestamp: 'Just now (Live 915MHz LoRa)',
        }));
      }
      setIsSimulating(false);
      showToast('Live IoT telemetry batch synchronized across 420 active sensors.');
    }, 900);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    setViewMode('dashboard');
    showToast(`Authenticated as ${user.name} (${user.role}). Redirecting to IoT Hub...`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Signed out of Reno Farm Terminal.');
  };

  const activeAlertsCount = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Floating View Switcher Quick Pill (Visible at all times for effortless review) */}
      <div className="fixed bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-slate-300 shadow-xl flex items-center gap-1 text-xs font-bold">
        <button
          onClick={() => setViewMode('portal')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all cursor-pointer ${
            viewMode === 'portal'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Reno Farm Portal</span>
        </button>
        <button
          onClick={() => setViewMode('dashboard')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all cursor-pointer ${
            viewMode === 'dashboard'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
          <span>IoT Telemetry</span>
        </button>
      </div>

      {/* VIEW: RENO FARM LANDING / PORTAL (Matching provided Figma design) */}
      {viewMode === 'portal' ? (
        <RenoFarmLanding
          currentUser={currentUser}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onNavigateToDashboard={() => setViewMode('dashboard')}
          onLogout={handleLogout}
        />
      ) : (
        /* VIEW: BIOMETRIC TELEMETRY & LIVESTOCK DASHBOARD */
        <div className="flex flex-col min-h-screen">
          <Header
            activeAlertsCount={activeAlertsCount}
            temperatureUnit={temperatureUnit}
            onToggleTempUnit={handleToggleTempUnit}
            onNavigateToAlerts={() => setCurrentTab('alerts')}
            animals={animals}
            onSelectAnimal={handleSelectAnimal}
            onSimulateTelemetry={handleSimulateTelemetry}
            isSimulating={isSimulating}
            currentUser={currentUser}
            onOpenLoginModal={() => setIsLoginModalOpen(true)}
            onToggleView={() => setViewMode(viewMode === 'dashboard' ? 'portal' : 'dashboard')}
            currentView={viewMode}
          />

          {/* Main Layout Area */}
          <div className="flex-1 flex flex-col lg:flex-row">
            {/* Navigation Sidebar */}
            <Sidebar
              currentTab={currentTab}
              onTabChange={setCurrentTab}
              metrics={metrics}
              onQuickSelect8492={handleQuickSelect8492}
            />

            {/* Dynamic Viewport Container */}
            <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
              {/* Active Operator Banner */}
              {currentUser && (
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-300 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{currentUser.name}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800">
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {currentUser.farmName} • {currentUser.facilityLocation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode('portal')}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Return to Farm Portal
                    </button>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Switch Terminal Role
                    </button>
                  </div>
                </div>
              )}

              {/* VIEW: OVERVIEW */}
              {currentTab === 'overview' && (
                <div className="space-y-6">
                  {/* 1. Top Row: Key Metric Cards */}
                  <MetricsOverview
                    metrics={metrics}
                    selectedFilter={selectedMetricFilter}
                    onFilterChange={(filter) => {
                      setSelectedMetricFilter(filter);
                      if (filter !== 'all') {
                        setCurrentTab('directory');
                      }
                    }}
                  />

                  {/* 2. Individual Animal Detail View (The Flagship Focus) */}
                  <AnimalDetailView
                    animal={selectedAnimal}
                    allAnimals={animals}
                    onSelectAnimal={handleSelectAnimal}
                    temperatureUnit={temperatureUnit}
                    onToggleIsolation={handleToggleIsolation}
                    onOpenReportModal={(a) => setReportModalAnimal(a)}
                  />

                  {/* 3. Recent Alerts Feed Component */}
                  <AlertsFeed
                    alerts={alerts}
                    onSelectAnimalByTag={handleSelectAnimalByTag}
                    onAcknowledgeAlert={handleAcknowledgeAlert}
                    onIsolateAnimal={handleToggleIsolation}
                  />
                </div>
              )}

              {/* VIEW: LIVESTOCK DIRECTORY */}
              {currentTab === 'directory' && (
                <div className="space-y-6">
                  <LivestockDirectory
                    animals={animals}
                    onSelectAnimal={handleSelectAnimal}
                    temperatureUnit={temperatureUnit}
                    onToggleIsolation={handleToggleIsolation}
                  />
                </div>
              )}

              {/* VIEW: ALERTS */}
              {currentTab === 'alerts' && (
                <div className="space-y-6">
                  <AlertsFeed
                    alerts={alerts}
                    onSelectAnimalByTag={handleSelectAnimalByTag}
                    onAcknowledgeAlert={handleAcknowledgeAlert}
                    onIsolateAnimal={handleToggleIsolation}
                  />
                </div>
              )}

              {/* VIEW: SETTINGS */}
              {currentTab === 'settings' && (
                <div className="space-y-6">
                  <SettingsView
                    settings={settings}
                    onSaveSettings={(newSettings) => {
                      setSettings(newSettings);
                      showToast('Machine Learning parameters updated.');
                    }}
                  />
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* Clinical Diagnostic Report / PDF Dossier Modal */}
      {reportModalAnimal && (
        <ClinicalReportModal
          animal={reportModalAnimal}
          onClose={() => setReportModalAnimal(null)}
          temperatureUnit={temperatureUnit}
        />
      )}

      {/* Reno Farm Login / Terminal Authentication Modal */}
      <RenoFarmLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
