import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Volume2,
  Play,
  Check,
  Lock,
  Star,
  ChevronRight,
  GraduationCap,
  Puzzle,
  Flame,
  Award,
} from 'lucide-react';
import { ASSETS } from '../../assets/images';
import { QUEST_NODES } from '../../data/mockData';
import { sound } from '../../utils/audio';

interface QuestsTabProps {
  onStartQuest: () => void;
  onOpenNode: (nodeId: string) => void;
  onPlayQuickGame: (gameName: string) => void;
}

export const QuestsTab: React.FC<QuestsTabProps> = ({
  onStartQuest,
  onOpenNode,
  onPlayQuickGame,
}) => {
  const handleReadMission = () => {
    sound.speak(
      "Mission of the day: Cosmic Math Journey! Chapter 3. Blast through planet numbers and help Orbit the rocket unlock new cosmic constellations!"
    );
  };

  return (
    <div className="space-y-5 pb-6">
      {/* MISSION OF THE DAY */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🚀</span>
            <span className="text-xs font-black tracking-wider text-amber-700 uppercase font-heading">
              Mission of the Day
            </span>
          </div>
          <button
            onClick={handleReadMission}
            className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full text-xs font-bold transition-colors border border-blue-200/60"
            id="read-mission-btn"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Read to me</span>
          </button>
        </div>

        <h2 className="text-2xl font-black text-slate-900 font-heading tracking-tight">
          Cosmic Math Journey
        </h2>

        {/* Chapter 3 Banner Card */}
        <div className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-md shadow-amber-500/5 relative overflow-hidden">
          <div className="flex gap-3">
            {/* Mission Image Thumbnail */}
            <div className="relative w-20 h-20 rounded-2xl bg-blue-100 overflow-hidden shrink-0 border border-blue-200 flex items-center justify-center">
              <img
                src={ASSETS.logo}
                alt="Orbit Rocket"
                className="w-14 h-14 object-contain animate-pulse"
              />
              <span className="absolute bottom-1 right-1 px-1 py-0.2 bg-amber-400 text-slate-950 font-black text-[9px] rounded-full">
                ✨x2
              </span>
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-md uppercase tracking-wider">
                  Chapter 3
                </span>
                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded-md flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                  +50 Star Gems
                </span>
              </div>
              <p className="text-xs font-bold text-slate-800 truncate">
                Blast through planet numb...
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                Help Orbit the Rocket unloc...
              </p>

              {/* Progress bar */}
              <div className="pt-1">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                  <span>Mission Progress</span>
                  <span className="text-amber-600">3 of 5 Done</span>
                </div>
                <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
                  <div className="w-3/5 h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playChime('fanfare');
              onStartQuest();
            }}
            className="mt-4 w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 tracking-wide uppercase"
            id="start-quest-btn"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Quest</span>
            <Volume2 className="w-4 h-4 text-amber-200" />
          </button>
        </div>
      </section>

      {/* Galaxy Island Route Map */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 font-heading">
              Galaxy Island Route
            </h3>
            <p className="text-xs text-slate-500">Tap a planet node to begin your journey!</p>
          </div>
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full flex items-center gap-1">
            🗺️ Map 1
          </span>
        </div>

        {/* Curving Map Path Container */}
        <div className="relative bg-gradient-to-b from-amber-50/50 via-white to-blue-50/50 rounded-3xl p-5 border border-amber-100 shadow-sm overflow-hidden">
          {/* S-Curving Background Track Line */}
          <div className="absolute left-1/2 top-10 bottom-10 w-2 -translate-x-1/2 border-r-2 border-dashed border-slate-300 pointer-events-none -z-0" />

          <div className="space-y-4 relative z-10">
            {/* Node 1: Alien Counting */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                sound.playChime('star');
                onOpenNode('node-1');
              }}
              className="bg-white rounded-3xl p-3.5 border border-emerald-200 shadow-sm flex items-center gap-3.5 cursor-pointer max-w-[85%] mr-auto"
            >
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-3xl shadow-inner border border-emerald-300">
                  👽
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900 font-heading">
                  Alien Counting
                </h4>
                <div className="flex items-center gap-1 text-amber-500 my-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 tracking-wider uppercase">
                  Mastered!
                </span>
              </div>
            </motion.div>

            {/* Node 2: Space Shapes */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                sound.playChime('star');
                onOpenNode('node-2');
              }}
              className="bg-white rounded-3xl p-3.5 border border-emerald-200 shadow-sm flex items-center justify-end gap-3.5 cursor-pointer max-w-[85%] ml-auto text-right"
            >
              <div>
                <h4 className="text-sm font-black text-slate-900 font-heading">
                  Space Shapes
                </h4>
                <div className="flex items-center justify-end gap-1 text-amber-500 my-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-[10px] font-black text-emerald-600 tracking-wider uppercase">
                  Mastered!
                </span>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-emerald-600 shadow-inner border border-purple-300">
                  <Puzzle className="w-8 h-8 text-emerald-600" />
                </div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
              </div>
            </motion.div>

            {/* Node 3: Ready to Play Pill + Starlight Addition */}
            <div className="pt-1">
              <div className="flex justify-center mb-1.5">
                <span className="px-3 py-1 bg-amber-400 text-slate-950 text-[11px] font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1 animate-bounce">
                  👇 Ready to play!
                </span>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  sound.playChime('correct');
                  onStartQuest();
                }}
                className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl p-4 border-2 border-amber-400 shadow-md flex items-center gap-4 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-md border-2 border-amber-300">
                    <Star className="w-9 h-9 fill-white text-white drop-shadow" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow">
                    <Play className="w-3 h-3 fill-white ml-0.5" />
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                    Node 3
                  </span>
                  <h4 className="text-base font-black text-slate-900 font-heading">
                    Starlight Additi...
                  </h4>
                  <p className="text-xs text-slate-600">Combine stars to make 10!</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      3 Min
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      +20 <Star className="w-2.5 h-2.5 fill-amber-500" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Node 4: Meteor Subtraction (Locked) */}
            <div className="opacity-60 max-w-[85%] mx-auto">
              <div className="bg-slate-100/90 rounded-3xl p-3.5 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-600">
                    Meteor Subtraction
                  </h4>
                  <p className="text-[10px] text-slate-400">Finish Node 3 first</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Mystery Boss Level */}
            <div className="pt-2">
              <div className="flex justify-center mb-1.5">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow">
                  Mystery Boss Level
                </span>
              </div>

              <div className="bg-white/90 rounded-3xl p-4 border border-indigo-200 shadow-sm text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl mb-2">
                  👑
                </div>
                <h4 className="text-base font-black text-slate-900 font-heading">
                  Solar Riddle Chest
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  Solve the Sun mystery to claim the Cosmic Crown!
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-400 flex items-center justify-center gap-1">
                  <Lock className="w-3 h-3" /> Unlocks at Stage 5
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Play Lab */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 font-heading">
              Quick Play Lab
            </h3>
            <p className="text-xs text-slate-500">Bite-sized games for curious minds</p>
          </div>
          <button
            onClick={() => onPlayQuickGame('All')}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Play Horizontal Scroll / Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Game 1: Phonics Safari */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-28 rounded-2xl overflow-hidden mb-2.5">
                <img
                  src={ASSETS.games.phonics}
                  alt="Phonics Safari"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-slate-900 text-[10px] font-black rounded-full backdrop-blur-sm">
                  Ages 6-8
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider block">
                🦁 Reading & Words
              </span>
              <h4 className="text-sm font-black text-slate-900 font-heading mt-0.5">
                Phonics Safari
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Roar with jungle sounds and build wild words!
              </p>
            </div>

            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayQuickGame('Phonics Safari');
              }}
              className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Play Safari</span>
            </button>
          </div>

          {/* Game 2: Dino Clock Race */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-28 rounded-2xl overflow-hidden mb-2.5">
                <img
                  src={ASSETS.games.dino}
                  alt="Dino Clock Race"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 text-slate-900 text-[10px] font-black rounded-full backdrop-blur-sm">
                  Ages 5-7
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase text-emerald-700 tracking-wider block">
                🦖 Time & Puzzles
              </span>
              <h4 className="text-sm font-black text-slate-900 font-heading mt-0.5">
                Dino Clock Race
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                Help Rex jump clock hands on time!
              </p>
            </div>

            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayQuickGame('Dino Clock Race');
              }}
              className="mt-3 w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Race Dino</span>
            </button>
          </div>
        </div>
      </section>

      {/* Weekly Focus Banner */}
      <section className="bg-amber-50 rounded-3xl p-4 border border-amber-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-200/80 flex items-center justify-center text-amber-900 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 font-heading">
              Great Job! 18 Quests Done This Week
            </h4>
            <p className="text-[11px] text-slate-600">
              Recommended focus: <strong>2-digit Subtraction</strong>
            </p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm shrink-0">
          <ChevronRight className="w-4 h-4" />
        </div>
      </section>
    </div>
  );
};
