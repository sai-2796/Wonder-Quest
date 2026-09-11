import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Moon,
  Plane,
  Download,
  CheckCircle,
  BookOpen,
  Volume2,
  Sparkles,
} from 'lucide-react';
import { AUDIO_STORIES } from '../../data/mockData';
import { AudioStory } from '../../types';
import { sound } from '../../utils/audio';

export const AudioTab: React.FC = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [activeStory, setActiveStory] = useState<AudioStory>(AUDIO_STORIES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(222); // 3m 42s
  const [selectedWorld, setSelectedWorld] = useState('Bedtime Tales');
  const [sleepTimer, setSleepTimer] = useState<number | 'end'>(30);
  const [readAlongOpen, setReadAlongOpen] = useState(false);

  const worlds = [
    { id: 'bedtime', name: 'Bedtime Tales', icon: '🌙' },
    { id: 'space', name: 'Space Adventures', icon: '🚀' },
    { id: 'laughs', name: 'Laughs & Fun', icon: '🎭' },
    { id: 'calm', name: 'Calm & Cozy', icon: '🌿' },
  ];

  const handlePlayToggle = () => {
    if (!isPlaying) {
      sound.playChime('star');
      sound.speak(`Now reading: ${activeStory.title}. Read by ${activeStory.reader}.`);
      setIsPlaying(true);
    } else {
      sound.stopSpeaking();
      setIsPlaying(false);
    }
  };

  const handleSelectStory = (story: AudioStory) => {
    setActiveStory(story);
    setProgress(0);
    setIsPlaying(true);
    sound.speak(`Now reading: ${story.title}. Read by ${story.reader}.`);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Offline Mode Banner Toggle */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Plane className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-800 font-heading">
              Offline Mode Ready
            </h3>
            <p className="text-[11px] text-slate-500">
              5 downloaded stories ready for road trips & flights
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playChime('pop');
            setOfflineMode(!offlineMode);
          }}
          className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
            offlineMode ? 'bg-emerald-500' : 'bg-slate-200'
          }`}
          id="toggle-offline-mode"
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              offlineMode ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </section>

      {/* Featured / Now Playing Player Card */}
      <section className="bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-5 text-white shadow-xl shadow-indigo-950/20 border border-indigo-900/60 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-[10px] font-bold rounded-full border border-amber-400/30 flex items-center gap-1">
              <Moon className="w-3 h-3 text-amber-300" />
              Bedtime Audio Player
            </span>
            <span className="text-xs text-indigo-200 font-medium">
              Read by {activeStory.reader}
            </span>
          </div>

          <div className="flex gap-4 items-center">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/40 shadow-lg">
              <img
                src={activeStory.coverUrl}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-4 bg-amber-400 rounded-full animate-pulse" />
                    <span className="w-1 h-6 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-1 h-3 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                {activeStory.category} • {activeStory.durationText}
              </span>
              <h3 className="text-base font-black text-white font-heading leading-tight line-clamp-2">
                {activeStory.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {activeStory.description}
              </p>
            </div>
          </div>

          {/* Timeline & Slider */}
          <div className="space-y-1.5 pt-2">
            <div className="relative w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                style={{
                  width: `${(progress / activeStory.durationSeconds) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{formatTime(progress)}</span>
              <span>-{formatTime(Math.max(0, activeStory.durationSeconds - progress))}</span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                sound.playChime('click');
                setProgress((p) => Math.max(0, p - 15));
              }}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Rewind 15s"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/30 transition-transform active:scale-95 border-2 border-white/20"
              id="main-audio-play-toggle"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-slate-950" />
              ) : (
                <Play className="w-6 h-6 fill-slate-950 ml-0.5" />
              )}
            </button>

            <button
              onClick={() => {
                sound.playChime('click');
                setProgress((p) => Math.min(activeStory.durationSeconds, p + 30));
              }}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Fast Forward 30s"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Read Along Text Toggle */}
          <div className="pt-1">
            <button
              onClick={() => setReadAlongOpen(!readAlongOpen)}
              className="w-full py-2 bg-indigo-900/60 hover:bg-indigo-800/60 text-xs font-bold text-amber-200 rounded-xl border border-indigo-700/60 flex items-center justify-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{readAlongOpen ? 'Hide Read-Along Text' : 'Open Read-Along Storybook'}</span>
            </button>

            {readAlongOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-2.5 p-3 bg-indigo-950/90 rounded-xl border border-indigo-800/80 text-xs text-indigo-100 leading-relaxed font-sans"
              >
                <p>
                  "Once upon a fluffy silver starlight cloud, little Barnaby the dragon sneezed so hard his last glowing spark danced away across the Milky Way! 'Do not worry, little one,' cooed Mama Owl from the pine canopy, 'your heart always remembers the way to warmth...' "
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Explore Worlds Categories */}
      <section className="space-y-2.5">
        <h3 className="text-base font-black text-slate-900 font-heading">
          Explore Worlds
        </h3>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {worlds.map((w) => {
            const isSelected = selectedWorld === w.name;
            return (
              <button
                key={w.id}
                onClick={() => {
                  sound.playChime('click');
                  setSelectedWorld(w.name);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white border border-slate-200/80 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{w.icon}</span>
                <span>{w.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stories List */}
      <section className="space-y-3">
        {AUDIO_STORIES.map((story) => {
          const isCurrent = activeStory.id === story.id;
          return (
            <div
              key={story.id}
              onClick={() => handleSelectStory(story)}
              className={`bg-white rounded-3xl p-3.5 border transition-all cursor-pointer flex items-center justify-between ${
                isCurrent
                  ? 'border-amber-400 shadow-md ring-2 ring-amber-200'
                  : 'border-slate-200/80 hover:border-amber-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={story.coverUrl}
                  alt={story.title}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
                    {story.category} • {story.durationText}
                  </span>
                  <h4 className="text-sm font-black text-slate-900 font-heading">
                    {story.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Read by {story.reader}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {story.downloaded ? (
                  <span className="p-1 rounded-full text-emerald-600 bg-emerald-50">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="p-1 rounded-full text-slate-400 bg-slate-50">
                    <Download className="w-4 h-4" />
                  </span>
                )}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm ${
                    isCurrent && isPlaying
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-100 text-slate-700 hover:bg-amber-100'
                  }`}
                >
                  {isCurrent && isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Auto-Sleep Timer */}
      <section className="bg-amber-50/80 rounded-3xl p-4 border border-amber-200 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-900">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900 font-heading">
                Auto-Sleep Timer
              </h4>
              <p className="text-[11px] text-slate-600">
                Music fades gently into white noise lullaby
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-1">
          {[15, 30, 45, 'end'].map((t) => {
            const isSelected = sleepTimer === t;
            return (
              <button
                key={t}
                onClick={() => {
                  sound.playChime('click');
                  setSleepTimer(t as number | 'end');
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-amber-200/60 hover:bg-amber-100'
                }`}
              >
                {t === 'end' ? 'End' : `${t}m`}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
