import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Droplets,
  Sprout,
  Layers,
  Sun,
  ShieldCheck,
  Activity,
  Heart,
  Quote,
  CheckCircle2,
  ExternalLink,
  Users,
  Milk,
  Award,
  Calendar,
  Clock,
  Compass,
  ArrowUpRight,
  LogIn
} from 'lucide-react';
import {
  SUSTAINABLE_PRACTICES,
  CLIENT_REVIEWS,
  FARMERS_ROSTER,
  EDUCATIONAL_TOURS,
  SustainablePractice,
  FarmerProfile,
  DEMO_USERS
} from '../data/renoFarmData';
import { UserProfile } from '../types';
import { AnimatedCowIcon } from './AnimatedCowIcon';
import { 
  HeroCowScene, 
  PastureTourScene, 
  PracticesCowScene, 
  HeritageCowScene,
  REAL_COW_PHOTOS
} from './CowIllustrations';

const HERO_COW_OPTIONS = [
  {
    id: 'holstein-1',
    name: 'Bella (#8492)',
    breed: 'Holstein Friesian',
    photo: REAL_COW_PHOTOS.heroHolstein,
    wellness: '98.4%',
    desc: 'Top yield dairy matriarch in North Meadow',
  },
  {
    id: 'pasture-herd',
    name: 'Alpine Pasture Herd',
    breed: 'Holstein & Jersey Cattle',
    photo: REAL_COW_PHOTOS.pastureHerd,
    wellness: '99.1%',
    desc: 'Free-range rotational grazing at Reno Farm',
  },
  {
    id: 'holstein-portrait',
    name: 'Molly (#9180)',
    breed: 'Holstein Friesian',
    photo: REAL_COW_PHOTOS.holsteinPortrait,
    wellness: '96.8%',
    desc: 'Smart bolus & ear-tag telemetry monitored',
  },
  {
    id: 'mother-calf',
    name: 'Luna & Calf',
    breed: 'Heritage Dairy Line',
    photo: REAL_COW_PHOTOS.motherAndCalf,
    wellness: '100%',
    desc: 'Pasture nursery & maternity paddock',
  },
  {
    id: 'brown-swiss',
    name: 'Buttercup (#6105)',
    breed: 'Brown Swiss',
    photo: REAL_COW_PHOTOS.brownSwiss,
    wellness: '97.5%',
    desc: 'High protein cold-filtered milk contributor',
  },
];

interface RenoFarmLandingProps {
  currentUser: UserProfile | null;
  onOpenLoginModal: () => void;
  onNavigateToDashboard: () => void;
  onLogout: () => void;
}

export const RenoFarmLanding: React.FC<RenoFarmLandingProps> = ({
  currentUser,
  onOpenLoginModal,
  onNavigateToDashboard,
  onLogout,
}) => {
  const [selectedPractice, setSelectedPractice] = useState<SustainablePractice>(SUSTAINABLE_PRACTICES[0]);
  const [tourIndex, setTourIndex] = useState(0);
  const [heroCowIndex, setHeroCowIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<'home' | 'practices' | 'heritage' | 'tours' | 'reviews' | 'farmers'>('home');
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerProfile | null>(null);

  const currentHeroCow = HERO_COW_OPTIONS[heroCowIndex];
  const currentTour = EDUCATIONAL_TOURS[tourIndex];

  const handleNextTour = () => {
    setTourIndex((prev) => (prev + 1) % EDUCATIONAL_TOURS.length);
  };

  const handlePrevTour = () => {
    setTourIndex((prev) => (prev - 1 + EDUCATIONAL_TOURS.length) % EDUCATIONAL_TOURS.length);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-sky-500 selection:text-white pb-20">
      {/* Top Reno Farm Brand Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <AnimatedCowIcon size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900">RENO FARM</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-sky-100 text-sky-700 uppercase">
                  Est. 1984
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Sustainable Dairy & Precision IoT Estate</p>
            </div>
          </div>

          {/* Navigation Links (Matching Design in Image) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-slate-600">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('practices')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Practices
            </button>
            <button
              onClick={() => scrollToSection('heritage')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Heritage
            </button>
            <button
              onClick={() => scrollToSection('tours')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Farm Tours
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('farmers')}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              Our Farmers
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToDashboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>Telemetry Dashboard</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-300 shadow-xs"
                  />
                  <div className="hidden lg:block text-left">
                    <div className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</div>
                    <button
                      onClick={onLogout}
                      className="text-[10px] text-slate-400 hover:text-red-600 font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenLoginModal}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5 text-sky-400" />
                  <span>Staff Login</span>
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="hidden sm:flex items-center gap-1 px-3.5 py-2 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>Live IoT Telemetry</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* SECTION 1: HERO SECTION (Faithful to "CULTIVATING NATURE'S BOUNTY...") */}
      <section id="hero" className="relative pt-8 pb-16 lg:py-20 overflow-hidden">
        {/* Soft Organic Curved Blue Accents in background */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-100/60 rounded-br-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-100/40 rounded-l-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-xs font-extrabold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Reno Farm Sustainable Agriculture</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight text-slate-900 uppercase leading-[1.12]">
                Cultivating Nature&apos;s Bounty <br className="hidden sm:block" />
                <span className="text-sky-600">A Sustainable Approach</span> <br className="hidden sm:block" />
                To Farming Excellence
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                Welcome to our serene farm nestled in the heart of the countryside. We take pride in cultivating wholesome, organic produce that nourishes both body and soul. Explore our farm&apos;s story, meet our dedicated team, and discover the essence of sustainable agriculture powered by real-time IoT livestock biometrics.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('practices')}
                  className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
                >
                  <span>Our Services & Practices</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onNavigateToDashboard}
                  className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Open IoT Telemetry Hub</span>
                </button>
              </div>

              {/* 3 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                <div className="space-y-1.5">
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span className="text-sky-600 font-mono">01 —</span>
                    <span>OUR FARM</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Explore the history and legacy of Reno Farm and learn about our journey toward sustainable agriculture.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span className="text-sky-600 font-mono">02 —</span>
                    <span>OUR PRODUCT</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Discover our wide range of organic fruits, herbs, and cold-filtered dairy products nurtured with utmost care.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <span className="text-sky-600 font-mono">03 —</span>
                    <span>OUR COMMUNITY</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Engage with our local community through farmers&apos; markets, educational farm tours, and partnerships.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Graphic: Arched Cow Window with Organic Blue Circles */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Decorative Circular Sky Blue Backdrop Pill */}
              <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-sky-200/70 blur-xs -z-10 transform translate-x-4 translate-y-4" />
              
              <div className="relative w-72 sm:w-88 h-96 sm:h-108 rounded-[140px] overflow-hidden border-8 border-white shadow-2xl bg-linear-to-b from-sky-50 to-slate-900">
                <HeroCowScene 
                  key={currentHeroCow.id}
                  imgSrc={currentHeroCow.photo}
                  alt={`${currentHeroCow.name} - ${currentHeroCow.breed}`}
                />

                {/* Floating Telemetry Status Overlay Tag */}
                <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      ✓
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-black text-slate-900 truncate">
                        {currentHeroCow.name} • {currentHeroCow.wellness}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {currentHeroCow.breed}
                      </div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                </div>
              </div>

              {/* Real Cow Photo Switcher Thumbnails */}
              <div className="mt-4 flex items-center gap-2 bg-white/80 backdrop-blur-xs p-1.5 rounded-full border border-slate-200 shadow-sm z-10">
                {HERO_COW_OPTIONS.map((cow, idx) => {
                  const isActive = heroCowIndex === idx;
                  return (
                    <button
                      key={cow.id}
                      onClick={() => setHeroCowIndex(idx)}
                      title={`${cow.name} (${cow.breed})`}
                      className={`relative w-8 h-8 rounded-full overflow-hidden transition-all cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-sky-500 ring-offset-1 scale-110 shadow-sm'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={cow.photo}
                        alt={cow.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SUSTAINABLE PRACTICES (From Left Side of Image) */}
      <section id="practices" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Practice Accordion & Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                {/* Goat / Livestock Circular Badge in Top Left as in Design */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-300 shadow-sm shrink-0">
                  <PracticesCowScene 
                    imgSrc={REAL_COW_PHOTOS.jerseyCross}
                    alt="Farm Animals"
                  />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
                    Our Sustainable Practices
                  </h2>
                  <p className="text-xs text-slate-500">Eco-conscious dairy management and regenerative agronomy</p>
                </div>
              </div>

              <div className="space-y-3">
                {SUSTAINABLE_PRACTICES.map((practice, index) => {
                  const isSelected = selectedPractice.id === practice.id;
                  return (
                    <div
                      key={practice.id}
                      onClick={() => setSelectedPractice(practice)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50/70 border-sky-300 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-black text-sky-600">
                            0{index + 1}
                          </span>
                          <h3 className="font-bold text-sm text-slate-900">{practice.title}</h3>
                          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-white border border-slate-200 text-slate-600">
                            {practice.badge}
                          </span>
                        </div>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-transform ${
                            isSelected ? 'bg-sky-500 text-white rotate-90' : 'bg-white border border-slate-200 text-slate-600'
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pt-3 border-t border-sky-200/60 text-xs text-slate-600 leading-relaxed"
                        >
                          <p>{practice.description}</p>
                          <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-sky-700">
                            <span>Key Metric:</span>
                            <span className="bg-white px-2 py-0.5 rounded border border-sky-200">
                              {practice.metric}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Dairy Cow in Circular Azure Blue Cutout (As in Design Image) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-72 sm:w-80 h-72 sm:h-80 flex items-center justify-center">
                {/* Azure Blue Solid Circular Backdrop */}
                <div className="absolute inset-0 rounded-full bg-sky-400 shadow-xl -z-10" />
                
                {/* Holstein Cow Image Frame */}
                <div className="w-64 sm:w-72 h-64 sm:h-72 filter drop-shadow-2xl rounded-full border-4 border-white overflow-hidden">
                  <PracticesCowScene 
                    imgSrc={REAL_COW_PHOTOS.holsteinPortrait}
                    alt="Holstein Dairy Cow"
                  />
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                  Pasture Grazing & Ethical Welfare
                </span>
                <span className="text-[11px] text-slate-500">
                  Certified Free-Range & Continuous IoT Biometric Supervised
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: EDUCATIONAL FARM TOURS (From Middle of Image) */}
      <section id="tours" className="py-16 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
                Educational Farm Tours
              </h2>
              <p className="text-xs text-slate-500">Guided agricultural workshops and hands-on farm experiences</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevTour}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Previous tour"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextTour}
                className="w-9 h-9 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs cursor-pointer"
                aria-label="Next tour"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Book Educational Visit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Tour Showcase Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Graphic: Sheep & Goats in Oval Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm h-64 sm:h-72 rounded-[60px] overflow-hidden border-4 border-sky-100 shadow-md">
                <PastureTourScene 
                  imgSrc={REAL_COW_PHOTOS.farmAnimals}
                  alt="Farm Animals in Pasture"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs font-mono font-bold text-xs text-sky-700 shadow-xs z-10">
                  Tour {currentTour.number} of 03
                </div>
              </div>
            </div>

            {/* Right Tour Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-black text-sky-600 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{currentTour.number} — {currentTour.title}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {currentTour.subtitle}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentTour.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {currentTour.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Duration / Capacity Footer */}
              <div className="flex items-center gap-6 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Duration: {currentTour.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  <span>Capacity: {currentTour.groupSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR FARM'S HERITAGE (From Right Middle of Image) */}
      <section id="heritage" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Blue Bubble with Cow and Calf */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-sky-300 flex items-center justify-center p-4 shadow-xl">
                <div className="w-full h-full rounded-full border-4 border-white shadow-md overflow-hidden">
                  <HeritageCowScene 
                    imgSrc={REAL_COW_PHOTOS.motherAndCalf}
                    alt="Reno Farm Cattle & Calf Heritage"
                  />
                </div>
              </div>
            </div>

            {/* Right: Heritage Text & Bottle Milk Icon */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Our Farm&apos;s Heritage — Reno Farm</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
                Rooted in Tradition, Powered by Future Agriculture
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our farm&apos;s heritage is rooted in a rich history of tradition and passion for sustainable farming. Learn about our time-honored techniques, passed down through generations, that infuse each crop with a unique, authentic flavor. Delve into the heritage that shapes our farm&apos;s ethos and practices today.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                By integrating state-of-the-art non-invasive IoT biometric sensors with our classic rotational pastures, Reno Farm bridges heritage farming ethics with modern animal welfare standards.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('farmers')}
                  className="px-5 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Meet Farm Founders & Agronomists
                </button>
                <button
                  onClick={onNavigateToDashboard}
                  className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Herd Telemetry Vitals
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: KEY METRICS BAR (Matching 200+, 1k+, 50+, 1.2k Bar in Image) */}
      <section className="py-12 bg-sky-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {/* Metric 1 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                200+
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Satisfied Clients
              </div>
            </div>

            {/* Metric 2 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-sky-600 font-serif tracking-tight">
                1k+
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Cow & Goat Farm
              </div>
            </div>

            {/* Metric 3 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                50+
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Expert Team Member
              </div>
            </div>

            {/* Metric 4 */}
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-serif tracking-tight">
                1.2k
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Tons of Milk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLIENT REVIEWS (From Left Bottom in Image) */}
      <section id="reviews" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
              What Our Clients Say About Our Organic Foods
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Testimonials from market directors, culinary partners, and farmstead families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CLIENT_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all space-y-4"
              >
                <div className="space-y-2">
                  <span className="font-serif text-3xl font-bold text-sky-500 leading-none block">
                    ““
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 tracking-tight">
                    {review.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-relaxed italic">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-200">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <div className="font-bold text-xs text-slate-800">{review.author}</div>
                    <div className="text-[10px] text-slate-400">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: MEET OUR FARMERS (From Right Bottom in Image) */}
      <section id="farmers" className="py-16 bg-[#FAFAFA] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
              Meet Our Farmers
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              The passionate agrarian specialists, veterinarians, and agronomists behind Reno Farm
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {FARMERS_ROSTER.map((farmer) => (
              <div
                key={farmer.id}
                onClick={() => setSelectedFarmer(farmer)}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-sky-400 hover:shadow-md transition-all text-center flex flex-col items-center cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 group-hover:border-sky-500 mb-3 shadow-xs transition-colors">
                  <img
                    src={farmer.avatar}
                    alt={farmer.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-xs text-slate-800 group-hover:text-sky-600 transition-colors">
                  {farmer.name}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                  {farmer.role}
                </span>
                <span className="text-[9px] text-sky-600 font-semibold bg-sky-50 px-2 py-0.5 rounded-full mt-2">
                  {farmer.experienceYears}y Exp
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Detail Drawer / Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedFarmer.avatar}
                alt={selectedFarmer.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-2xl object-cover border border-slate-300"
              />
              <div>
                <h3 className="font-bold text-base text-slate-900">{selectedFarmer.name}</h3>
                <span className="text-xs text-sky-600 font-bold block">{selectedFarmer.role}</span>
                <span className="text-[11px] text-slate-400">{selectedFarmer.experienceYears} Years at Reno Farm</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Specialty:</span>
              <p>{selectedFarmer.specialty}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedFarmer.bio}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={onOpenLoginModal}
                className="flex-1 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs"
              >
                Login as Staff
              </button>
              <button
                onClick={() => setSelectedFarmer(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-20 bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <AnimatedCowIcon size="sm" showRadar={false} />
            <div>
              <span className="font-bold text-base text-white tracking-tight">RENO FARM DAIRY ESTATE</span>
              <p className="text-[11px] text-slate-400">Precision IoT Biometrics • Sustainable Agronomy</p>
            </div>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            <span>© 2026 Reno Farm Dairy Systems. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
