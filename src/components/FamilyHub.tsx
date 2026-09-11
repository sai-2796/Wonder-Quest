import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Compass,
  Mic,
  Lock,
  Sparkles,
  Award,
  ChevronRight,
  Shield,
  BookOpen,
  Volume2,
  Settings,
  Gamepad2,
  Trophy,
  CheckCircle2,
  Flame,
  Star,
} from 'lucide-react';
import { ASSETS } from '../assets/images';
import { sound } from '../utils/audio';

interface FamilyHubProps {
  onEnterKidWorld: (tab?: 'quests' | 'learn' | 'audio' | 'rewards') => void;
  onOpenParentGate: () => void;
  onOpenGrandpa: () => void;
  onOpenRecipe: () => void;
  onOpenVoice: () => void;
}

export const FamilyHub: React.FC<FamilyHubProps> = ({
  onEnterKidWorld,
  onOpenParentGate,
  onOpenGrandpa,
  onOpenRecipe,
  onOpenVoice,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 pb-24 max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-amber-100">
        <div className="flex items-center gap-2.5">
          <img
            src={ASSETS.logo}
            alt="WonderQuest"
            className="w-9 h-9 rounded-full shadow-sm object-cover border border-amber-300"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold text-slate-900 font-heading">
                Family Hub
              </h1>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
              Family Connected: 4 Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenParentGate}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors relative"
            title="Parent Settings"
          >
            <Settings className="w-4 h-4" />
            <Lock className="w-2.5 h-2.5 absolute top-1.5 right-1.5 text-amber-600 fill-amber-500" />
          </button>
          <button
            onClick={onOpenParentGate}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-300 ring-2 ring-amber-100 transition-transform hover:scale-105"
            title="Mom & Dad Profile"
          >
            <img
              src={ASSETS.avatars.mom}
              alt="Mom & Dad"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-4 space-y-4">
        {/* Friendly Family Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/70 border border-amber-200/80 rounded-full text-xs font-bold text-amber-900">
            <span>👋 Good afternoon, Mitchell Family!</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading leading-tight pt-1">
            Who is exploring today?
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tap your space or use voice assist to jump right in
          </p>
        </motion.div>

        {/* Profile Card 1: Leo */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-3xl p-4 border border-blue-100/80 shadow-md shadow-blue-500/5 relative overflow-hidden"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={ASSETS.avatars.leo}
                alt="Leo"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400 shadow-sm"
              />
              <span className="absolute -bottom-1.5 -right-1 px-1.5 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full border border-white shadow">
                ★ Lv 8
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Leo
                </h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Age 7 • Playful & Safe
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600">Kids Learn & Play</p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                <Compass className="w-3 h-3 text-blue-500 shrink-0" />
                Dino Island • 42m explored...
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playChime('fanfare');
              onEnterKidWorld('quests');
            }}
            className="mt-3.5 w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
            id="enter-kid-world-btn"
          >
            <span>Enter Kid World</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Profile Card 2: Mom & Dad */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white rounded-3xl p-4 border border-purple-100/80 shadow-md shadow-purple-500/5 relative"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={ASSETS.avatars.mom}
                alt="Mom & Dad"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-300 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-purple-600 text-white rounded-full border border-white">
                <Shield className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Mom & Dad
                </h3>
                <Lock className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-xs font-bold text-amber-700">Parent Command</p>
              <p className="text-[11px] text-slate-500 truncate">
                Screen Time & Approvals: 1 Pending Chest
              </p>
            </div>
          </div>

          {/* Mini Health Status Badges */}
          <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
            <div className="bg-emerald-50/80 border border-emerald-200/60 rounded-xl p-2 flex items-center gap-1.5 text-emerald-800 font-semibold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Screen Time: <strong>Healthy</strong></span>
            </div>
            <div className="bg-blue-50/80 border border-blue-200/60 rounded-xl p-2 flex items-center gap-1.5 text-blue-800 font-semibold text-[11px]">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Curriculum: <strong>88% Mastery</strong></span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playChime('pop');
              onOpenParentGate();
            }}
            className="mt-3 w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            id="open-parent-command-btn"
          >
            <Lock className="w-3 h-3 text-amber-600" />
            <span>Open Command Center</span>
            <span className="text-[10px] text-slate-500 font-medium">(PIN Required)</span>
          </button>
        </motion.div>

        {/* Profile Card 3: Grandpa */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-amber-50/90 rounded-3xl p-4 border border-amber-200 shadow-md shadow-amber-500/5 relative"
        >
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={ASSETS.avatars.grandpa}
                alt="Grandpa"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400 shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-amber-600 text-white rounded-full border border-white">
                <Mic className="w-2.5 h-2.5" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 font-heading">
                  Grandpa
                </h3>
                <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 text-[10px] font-bold rounded-full">
                  Voice-first ready
                </span>
              </div>
              <p className="text-xs font-bold text-amber-800">Senior Sanctuary</p>
              <p className="text-[11px] text-slate-600 truncate">
                Audio Stories, Trivia & Calm Nature Sounds
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playChime('star');
              onOpenGrandpa();
            }}
            className="mt-3.5 w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            id="launch-grandpa-sanctuary-btn"
          >
            <Users className="w-4 h-4" />
            <span>Launch Senior Sanctuary</span>
          </button>
        </motion.div>

        {/* Shared Family Sparkle Card */}
        <div className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <h3 className="text-sm font-black text-slate-900 font-heading">
                Shared Family Sparkle
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Sync: 100%
            </span>
          </div>

          <div className="bg-amber-50/70 p-3 rounded-2xl border border-amber-200/60">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                Family Movie Match & Recipe
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Tonight 7:00 PM</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 font-heading">
              Cosmic Constellation S'mores & Stargazing Night
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Blended tailored picks from Leo's astronomy quest alongside Grandpa's favorite classic bedtime constellation folklore.
            </p>
            <button
              onClick={onOpenRecipe}
              className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View Recipe & Activity Guide</span>
            </button>
          </div>
        </div>

        {/* Family Goal & Trophy Progress */}
        <div className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-700">Family Goal & Trophy Progress</h4>
                <p className="text-xs text-slate-500">
                  Unlock the "Family Weekend Campout" quest badge!
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-amber-600 flex items-center gap-0.5">
                850 / 1,000 <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              </span>
            </div>
          </div>

          <div className="w-full h-2.5 bg-amber-100 rounded-full overflow-hidden mt-3 p-0.5">
            <div className="w-[85%] h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
            <div className="flex -space-x-1.5 overflow-hidden">
              <img src={ASSETS.avatars.leo} className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
              <img src={ASSETS.avatars.maya} className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
              <img src={ASSETS.avatars.mom} className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
              <img src={ASSETS.avatars.grandpa} className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
              ⚡ All 4 family members contributed today!
            </span>
          </div>
        </div>

        {/* Voice Assistant Pill Bar */}
        <div
          onClick={onOpenVoice}
          className="bg-slate-900 text-white rounded-2xl p-3 shadow-lg flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-pulse" />
              <span className="w-1.5 h-6 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
              <span className="w-1.5 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-100">
                Say: "Switch to Grandpa" or "Open Leo"
              </p>
              <p className="text-[10px] text-slate-400">High-contrast voice assist active</p>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-md">
            <Mic className="w-4 h-4" />
          </div>
        </div>
      </main>

      {/* Persistent Bottom Bar for Hub */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 flex items-center justify-between z-40">
        <button
          onClick={() => {}}
          className="flex flex-col items-center gap-1 text-blue-600 font-bold"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Hub</span>
        </button>

        <button
          onClick={() => onEnterKidWorld('quests')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Quests</span>
        </button>

        {/* Center Floating Mic Button */}
        <button
          onClick={onOpenVoice}
          className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 border-4 border-white transition-transform active:scale-95"
        >
          <Mic className="w-6 h-6" />
        </button>

        <button
          onClick={() => onEnterKidWorld('learn')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
        >
          <Gamepad2 className="w-5 h-5" />
          <span className="text-[10px]">Play</span>
        </button>

        <button
          onClick={() => onEnterKidWorld('rewards')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600"
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Rewards</span>
        </button>
      </nav>
    </div>
  );
};
