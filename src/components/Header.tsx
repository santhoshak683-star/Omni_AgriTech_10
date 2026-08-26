import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Bell, 
  Search, 
  Radio, 
  RefreshCw, 
  Sparkles, 
  Thermometer, 
  ShieldAlert,
  Calendar,
  Clock,
  LogIn,
  User,
  LayoutDashboard,
  Compass
} from 'lucide-react';
import { Animal, UserProfile } from '../types';
import { AnimatedCowIcon } from './AnimatedCowIcon';
import { CowAvatar } from './CowIllustrations';

interface HeaderProps {
  activeAlertsCount: number;
  temperatureUnit: 'C' | 'F';
  onToggleTempUnit: () => void;
  onNavigateToAlerts: () => void;
  animals: Animal[];
  onSelectAnimal: (animal: Animal) => void;
  onSimulateTelemetry: () => void;
  isSimulating: boolean;
  currentUser: UserProfile | null;
  onOpenLoginModal: () => void;
  onToggleView: () => void;
  currentView: 'dashboard' | 'landing';
}

export const Header: React.FC<HeaderProps> = ({
  activeAlertsCount,
  temperatureUnit,
  onToggleTempUnit,
  onNavigateToAlerts,
  animals,
  onSelectAnimal,
  onSimulateTelemetry,
  isSimulating,
  currentUser,
  onOpenLoginModal,
  onToggleView,
  currentView,
}) => {
  const [currentDateTime, setCurrentDateTime] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Animal[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (q.trim().length > 0) {
      const filtered = animals.filter(
        (a) =>
          a.tagId.toLowerCase().includes(q.toLowerCase()) ||
          a.name.toLowerCase().includes(q.toLowerCase()) ||
          a.rfidTag.toLowerCase().includes(q.toLowerCase()) ||
          a.breed.toLowerCase().includes(q.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleSelectSearchedAnimal = (animal: Animal) => {
    onSelectAnimal(animal);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-4 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-5 flex-1 min-w-0">
        {/* Title and Animated Cow Mascot */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onToggleView}>
          <AnimatedCowIcon size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight leading-tight">
                Biometric Health Predictor
              </h1>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                IoT Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Reno Farm Estate • North Pasture Facility • ML v3.2
            </p>
          </div>
        </div>

        {/* View Switcher Pill: Reno Farm Portal vs Telemetry Dashboard */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={onToggleView}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentView === 'landing'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Farm Portal</span>
          </button>
          <button
            onClick={onToggleView}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              currentView === 'dashboard'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Telemetry Live</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-xs md:max-w-sm hidden lg:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Tag (e.g. #8492), Breed, Pen..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.trim() && setIsSearchOpen(true)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 max-h-60 overflow-y-auto z-50">
              <div className="p-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                Matching Livestock ({searchResults.length})
              </div>
              {searchResults.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => handleSelectSearchedAnimal(animal)}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                      <CowAvatar
                        src={animal.photoUrl || '/images/cow-hero.jpg'}
                        alt={animal.name}
                        tagId={animal.tagId}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{animal.tagId}</span>
                        <span className="text-xs text-slate-600">{animal.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{animal.penLocation} • {animal.breed}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      animal.status === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : animal.status === 'at-risk'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {animal.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Date/Time, Unit, Simulation & Alerts Badge */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* User Session Profile Pill or Login Button */}
        {currentUser ? (
          <div className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer" onClick={onOpenLoginModal}>
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-xl object-cover border border-slate-300"
            />
            <div className="hidden sm:block text-left pr-2">
              <div className="text-[11px] font-bold text-slate-800 leading-tight">{currentUser.name}</div>
              <div className="text-[9px] text-sky-600 font-extrabold">{currentUser.role}</div>
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-sky-400" />
            <span>Staff Login</span>
          </button>
        )}

        {/* Temperature Unit Toggle */}
        <button
          onClick={onToggleTempUnit}
          title="Toggle Temperature Unit"
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
          <span>°{temperatureUnit}</span>
        </button>

        {/* Simulate IoT Ping */}
        <button
          onClick={onSimulateTelemetry}
          disabled={isSimulating}
          title="Simulate IoT sensor batch"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isSimulating ? 'animate-spin' : ''}`} />
          <span>Simulate IoT</span>
        </button>

        {/* Alert Pill with Pulse */}
        <button
          onClick={onNavigateToAlerts}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 rounded-full text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
        >
          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
          <span>{activeAlertsCount} Alerts</span>
        </button>
      </div>
    </header>
  );
};
