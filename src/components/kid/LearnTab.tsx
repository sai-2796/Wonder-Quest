import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  Clock,
  Sparkles,
  Play,
  CheckCircle,
  Eye,
  ChevronRight,
  GraduationCap,
  Calculator,
  BookOpen,
  FlaskConical,
  Compass,
} from 'lucide-react';
import { ASSETS } from '../../assets/images';
import { sound } from '../../utils/audio';

interface LearnTabProps {
  onOpenConstellationModal: () => void;
  onPlayGame: (gameName: string) => void;
}

export const LearnTab: React.FC<LearnTabProps> = ({
  onOpenConstellationModal,
  onPlayGame,
}) => {
  const [selectedTopic, setSelectedTopic] = useState('Math Fun');
  const [isPlayingWord, setIsPlayingWord] = useState(false);

  const topics = [
    { id: 'math', name: 'Math Fun', icon: '1234' },
    { id: 'words', name: 'Word Magic', icon: 'abc' },
    { id: 'science', name: 'Science Lab', icon: '🧪' },
    { id: 'space', name: 'Space Stars', icon: '✨' },
  ];

  const handleListenWord = () => {
    setIsPlayingWord(true);
    sound.speak(
      "Constellation. Pronounced: kahn-stuh-LAY-shun. A playful cluster of twinkling stars that draw friendly pictures in the night sky!",
      () => setIsPlayingWord(false)
    );
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Weekly Explorer Goal */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-800 font-heading">
                Weekly Explorer Goal
              </h3>
              <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600" />
                Parent & Educator Certified
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-blue-600">45</span>
            <span className="text-xs font-bold text-slate-400">/60m</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
          <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 via-teal-400 to-emerald-500 rounded-full" />
        </div>

        <p className="text-[11px] text-slate-600">
          Just 15 more minutes to win this week's Cosmic Rocket trophy! 🚀
        </p>
      </section>

      {/* Explore Topics */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 font-heading">
            Explore Topics
          </h3>
          <span className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
            All 14
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {topics.map((topic) => {
            const isSelected = selectedTopic === topic.name;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  sound.playChime('click');
                  setSelectedTopic(topic.name);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-mono font-bold">{topic.icon}</span>
                <span>{topic.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* WORD OF THE DAY Card */}
      <section className="bg-gradient-to-b from-blue-600 to-indigo-700 rounded-3xl p-5 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <span className="inline-block px-2.5 py-1 bg-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-wider backdrop-blur-sm">
            ☆ Word of the Day
          </span>

          <div>
            <h3 className="text-2xl font-black font-heading tracking-wide">
              Constellation
            </h3>
            <p className="text-xs text-blue-200 font-mono mt-0.5">
              / kahn-stuh-LAY-shun /
            </p>
          </div>

          <p className="text-xs text-blue-100 leading-relaxed max-w-xs">
            A playful cluster of twinkling stars that draw friendly pictures in the night sky! ✨
          </p>

          {/* Big Listen Button */}
          <div className="pt-1 flex justify-center">
            <button
              onClick={handleListenWord}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/40 border-4 border-white/20 transition-transform active:scale-95"
              id="listen-word-btn"
            >
              <Volume2 className="w-6 h-6 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-wider mt-0.5">
                {isPlayingWord ? 'Playing' : 'Listen'}
              </span>
            </button>
          </div>

          {/* Fun Fact Strip */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between bg-white/10 p-2.5 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2.5">
              <img
                src={ASSETS.logo}
                alt="Ursa Major"
                className="w-9 h-9 rounded-xl bg-blue-900 p-1 object-contain border border-blue-400/40"
              />
              <div>
                <p className="text-xs font-bold text-white">Fun Fact: Ursa Major</p>
                <p className="text-[10px] text-blue-200 truncate">Look up tonight to spot...</p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playChime('star');
                onOpenConstellationModal();
              }}
              className="px-3 py-1.5 bg-white text-indigo-950 font-black text-xs rounded-xl shadow hover:bg-amber-100 transition-colors"
              id="view-sky-btn"
            >
              View Sky
            </button>
          </div>
        </div>
      </section>

      {/* Daily Quests & Games Grid */}
      <section className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 font-heading">
              Daily Quests & Games
            </h3>
            <p className="text-xs text-slate-500">Bite-sized modules tailored for young champions</p>
          </div>
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
            Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Item 1: Dino Math Island */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-24 rounded-2xl overflow-hidden mb-2">
                <img
                  src={ASSETS.games.dino}
                  alt="Dino Math Island"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-slate-900/80 text-white text-[9px] font-bold rounded-full">
                  Grade 1-2
                </span>
                <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-white/90 text-emerald-800 text-[9px] font-black rounded-md">
                  ☆ 95%
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Dino Math Island
              </h4>
              <p className="text-[11px] text-slate-500">12 fun interactive levels</p>
            </div>
            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayGame('Dino Math Island');
              }}
              className="mt-3 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Continue</span>
            </button>
          </div>

          {/* Item 2: Phonics Coaster */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-24 rounded-2xl overflow-hidden mb-2">
                <img
                  src={ASSETS.games.coaster}
                  alt="Phonics Coaster"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-blue-700 text-white text-[9px] font-bold rounded-full">
                  Level 4
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Phonics Coaster
              </h4>
              <p className="text-[11px] text-slate-500">Sound blend adventure</p>
            </div>
            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayGame('Phonics Coaster');
              }}
              className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-white" />
              <span>Play Now</span>
            </button>
          </div>

          {/* Item 3: Microscope Lab */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-24 rounded-2xl overflow-hidden mb-2">
                <img
                  src={ASSETS.games.microscope}
                  alt="Microscope Lab"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-amber-400 text-slate-950 text-[9px] font-bold rounded-full">
                  New!
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Microscope Lab
              </h4>
              <p className="text-[11px] text-slate-500">Nature & bugs explorer</p>
            </div>
            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayGame('Microscope Lab');
              }}
              className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" />
              <span>Inspect</span>
            </button>
          </div>

          {/* Item 4: Spelling Racer */}
          <div className="bg-white rounded-3xl p-3 border border-amber-200/80 shadow-sm flex flex-col justify-between">
            <div>
              <div className="relative h-24 rounded-2xl overflow-hidden mb-2">
                <img
                  src={ASSETS.games.spelling}
                  alt="Spelling Racer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-teal-600 text-white text-[9px] font-bold rounded-full">
                  Speed Rush
                </span>
              </div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Spelling Racer
              </h4>
              <p className="text-[11px] text-slate-500">Fast-paced word builder</p>
            </div>
            <button
              onClick={() => {
                sound.playChime('pop');
                onPlayGame('Spelling Racer');
              }}
              className="mt-3 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <span>⚡ Race</span>
            </button>
          </div>
        </div>
      </section>

      {/* Custom Learning Roadmap Banner */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 font-heading">
              Custom Learning Roadmap
            </h4>
            <p className="text-[11px] text-slate-500">
              Adjust age settings and review...
            </p>
          </div>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
          <ChevronRight className="w-4 h-4" />
        </div>
      </section>
    </div>
  );
};
