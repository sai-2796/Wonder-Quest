import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Lock,
  Clock,
  Moon,
  Pause,
  Play,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Award,
  BookOpen,
  Shield,
  Gift,
  Plus,
  Flame,
  Star,
  Settings,
  AlertCircle,
} from 'lucide-react';
import { ASSETS } from '../../assets/images';
import { WEEKLY_RHYTHM_DATA, INITIAL_ANALYTICS } from '../../data/mockData';
import { sound } from '../../utils/audio';

interface ParentCommandCenterProps {
  onBack: () => void;
  onEnterKidWorld: () => void;
  stars: number;
  onAddStars: (amount: number) => void;
  onApproveChest: () => void;
}

export const ParentCommandCenter: React.FC<ParentCommandCenterProps> = ({
  onBack,
  onEnterKidWorld,
  stars,
  onAddStars,
  onApproveChest,
}) => {
  const [activeChild, setActiveChild] = useState<'leo' | 'maya'>('leo');
  const [isPaused, setIsPaused] = useState(false);
  const [bedtimeLock, setBedtimeLock] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(60);
  const [approvedState, setApprovedState] = useState(false);

  const handleTogglePause = () => {
    sound.playChime('pop');
    setIsPaused(!isPaused);
  };

  const handleAddChoreStars = () => {
    sound.playChime('star');
    onAddStars(50);
  };

  const handleApprove = () => {
    sound.playChime('fanfare');
    setApprovedState(true);
    onApproveChest();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 pb-24 max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-30 border-b border-purple-100">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playChime('click');
              onBack();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
            id="parent-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black text-slate-900 font-heading">
                Parent Command
              </h1>
              <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                PIN Protected
              </span>
            </div>
            <p className="text-[10px] text-purple-700 font-bold">
              Family Management Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onEnterKidWorld}
            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition-colors border border-blue-200"
          >
            Kid World →
          </button>
          <img
            src={ASSETS.avatars.mom}
            alt="Mom & Dad"
            className="w-8 h-8 rounded-full object-cover border-2 border-purple-300"
          />
        </div>
      </header>

      <main className="px-5 pt-4 space-y-4">
        {/* Child Selector Card */}
        <div className="bg-white rounded-3xl p-4 border border-purple-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeChild === 'leo' ? ASSETS.avatars.leo : ASSETS.avatars.maya}
              alt="Active Child"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 font-heading">
                  {activeChild === 'leo' ? 'Leo' : 'Maya'}
                </h3>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded-full">
                  {activeChild === 'leo' ? 'Grade 2 • Age 7' : 'Kindergarten • Age 5'}
                </span>
              </div>
              <p className="text-xs font-bold text-amber-700">
                {activeChild === 'leo' ? 'Level 8 Starlight Ranger' : 'Level 3 Star Scout'}
              </p>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                {stars} Stars • 🔥 5-Day Streak
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActiveChild(activeChild === 'leo' ? 'maya' : 'leo')}
              className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold rounded-xl border border-purple-200 transition-colors"
            >
              Switch Child
            </button>
          </div>
        </div>

        {/* Screentime Controls & Status */}
        <div className="grid grid-cols-2 gap-3">
          {/* Daily limit status */}
          <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">Active Today</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="my-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900 font-heading">42</span>
                <span className="text-xs font-bold text-slate-400">/ {dailyLimit}m</span>
              </div>
              <p className="text-[10px] text-emerald-600 font-bold">
                18 mins remaining
              </p>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${(42 / dailyLimit) * 100}%` }}
              />
            </div>
          </div>

          {/* Bedtime & Emergency Pause */}
          <div className="bg-white rounded-3xl p-3.5 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">Bedtime Auto-Lock</span>
              <Moon className="w-4 h-4 text-purple-500" />
            </div>

            <div className="my-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">7:30 PM Daily</span>
                <button
                  onClick={() => setBedtimeLock(!bedtimeLock)}
                  className={`w-9 h-5 rounded-full p-0.5 transition-colors ${
                    bedtimeLock ? 'bg-purple-600' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      bedtimeLock ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <button
              onClick={handleTogglePause}
              className={`w-full py-1.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 ${
                isPaused
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 fill-white" /> Resume Screen
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" /> Pause Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Weekly Usage Rhythm (Stacked Bar Chart) */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 font-heading">
                Weekly Usage Rhythm
              </h3>
              <p className="text-[11px] text-slate-500">Total this week: 4h 25m</p>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Quests
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Audio
              </span>
            </div>
          </div>

          {/* Bar Chart Visual */}
          <div className="pt-2 flex items-end justify-between h-28 gap-2 border-b border-slate-100 pb-2">
            {WEEKLY_RHYTHM_DATA.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full max-w-[24px] flex flex-col rounded-t-lg overflow-hidden">
                  <div
                    className="w-full bg-amber-400"
                    style={{ height: `${item.audio * 1.2}px` }}
                  />
                  <div
                    className={`w-full ${item.isToday ? 'bg-blue-600' : 'bg-blue-400'}`}
                    style={{ height: `${item.quests * 1.2}px` }}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold ${
                    item.isToday ? 'text-blue-600' : 'text-slate-400'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200/60 flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Healthy balance: 68% Learning Quests vs 32% Bedtime Calm Audio.</span>
          </div>
        </div>

        {/* Curriculum Growth & Skill Mastery */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 font-heading flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Curriculum Growth & Mastery
            </h3>
            <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
              Grade 2 Standard
            </span>
          </div>

          {/* Math & Logic */}
          <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Math & Logic</span>
              <span className="text-blue-600">88% Mastery (+12% this wk)</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[88%] h-full bg-blue-500 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-600">
              Mastered: <strong>2-digit addition & shapes</strong> • Next: <strong>Regrouping subtraction</strong>
            </p>
          </div>

          {/* Reading & Phonics */}
          <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Reading & Phonics</span>
              <span className="text-emerald-600">92% (Top 5% Benchmark)</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-600">
              Completed 6 Phonics Safari books with 95% pronunciation accuracy
            </p>
          </div>

          {/* Emotional Calm */}
          <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-800">
              <span>Bedtime Calm & Mindfulness</span>
              <span className="text-amber-600">High Calm (5d streak)</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="w-[90%] h-full bg-amber-500 rounded-full" />
            </div>
            <p className="text-[11px] text-slate-600">
              1h 10m mindful bedtime tales with smooth sleep transition
            </p>
          </div>
        </div>

        {/* Weekly Teacher & Dinner Table Sparkle */}
        <div className="bg-gradient-to-tr from-amber-50 via-white to-amber-50 rounded-3xl p-4 border border-amber-200 shadow-sm space-y-2">
          <div className="flex items-center gap-1.5 text-amber-800">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <h3 className="text-xs font-black uppercase tracking-wider font-heading">
              Dinner Table Conversation Starter
            </h3>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed bg-white/80 p-3 rounded-2xl border border-amber-100 shadow-xs">
            "Ask Leo how <strong>Ursa Major</strong> helps navigators find the North Star—he solved that mystery in tonight's Constellation Quest!"
          </p>

          <p className="text-[11px] text-slate-500">
            Teacher Insight: Leo's shape-rotation speed climbed 24% in Dino Island this week.
          </p>
        </div>

        {/* Parent Approvals & Reward Hub */}
        <div className="bg-white rounded-3xl p-4 border border-purple-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 font-heading">
                  Pending Reward Request
                </h4>
                <p className="text-[10px] text-slate-500">Super Cosmic Chest (Requires 500 ⭐)</p>
              </div>
            </div>
            <span className="text-xs font-black text-amber-600">
              {stars} / 500 ⭐
            </span>
          </div>

          <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 flex items-center justify-between">
            <div className="text-xs text-purple-900">
              <span>Grant <strong>+50 Chore Stars</strong> for clean bedroom & reading?</span>
            </div>
            <button
              onClick={handleAddChoreStars}
              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 ml-2"
            >
              +50 Stars
            </button>
          </div>

          <div className="pt-1">
            <button
              onClick={handleApprove}
              disabled={approvedState}
              className={`w-full py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-1.5 ${
                approvedState
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{approvedState ? 'Chest Approved! Leo Can Open It Now!' : 'Approve Super Cosmic Chest'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
