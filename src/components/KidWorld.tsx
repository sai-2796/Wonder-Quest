import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  Lightbulb,
  Headphones,
  Trophy,
  Flame,
  Star,
  ArrowLeft,
  Users,
} from 'lucide-react';
import { ASSETS } from '../assets/images';
import { KidTab, Badge } from '../types';
import { QuestsTab } from './kid/QuestsTab';
import { LearnTab } from './kid/LearnTab';
import { AudioTab } from './kid/AudioTab';
import { RewardsTab } from './kid/RewardsTab';
import { sound } from '../utils/audio';

interface KidWorldProps {
  activeTab: KidTab;
  onTabChange: (tab: KidTab) => void;
  stars: number;
  streak: number;
  onReturnToHub: () => void;
  onStartQuest: () => void;
  onOpenNode: (nodeId: string) => void;
  onPlayQuickGame: (gameName: string) => void;
  onOpenConstellation: () => void;
  onOpenChest: () => void;
  onSelectBadge: (badge: Badge) => void;
}

export const KidWorld: React.FC<KidWorldProps> = ({
  activeTab,
  onTabChange,
  stars,
  streak,
  onReturnToHub,
  onStartQuest,
  onOpenNode,
  onPlayQuickGame,
  onOpenConstellation,
  onOpenChest,
  onSelectBadge,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'quests':
        return 'Quests';
      case 'learn':
        return 'Learn';
      case 'audio':
        return 'Audiobooks';
      case 'rewards':
        return 'Rewards';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 pb-24 max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      {/* Top Header Bar */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between bg-white/85 backdrop-blur-md sticky top-0 z-30 border-b border-amber-100">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playChime('click');
              onReturnToHub();
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors mr-0.5"
            title="Return to Family Hub"
            id="kid-return-hub-btn"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <img
            src={ASSETS.logo}
            alt="WonderQuest"
            className="w-8 h-8 rounded-full shadow-sm object-cover border border-amber-300"
          />
          <div>
            <h1 className="text-base font-black text-slate-900 font-heading">
              {getTabTitle()}
            </h1>
            <p className="text-[10px] text-blue-600 font-bold">
              Leo • Level 8 Starlight Ranger
            </p>
          </div>
        </div>

        {/* Right Stats & Avatar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-xl">
            <Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span className="text-xs font-black text-slate-800">{streak}</span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2 py-1 rounded-xl">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="text-xs font-black text-amber-800">{stars}</span>
          </div>

          <button
            onClick={() => {
              sound.playChime('click');
              onReturnToHub();
            }}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-400 ring-2 ring-blue-100 hover:scale-105 transition-transform"
            title="Switch Explorer / Family Hub"
          >
            <img
              src={ASSETS.avatars.leo}
              alt="Leo"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="px-5 pt-4">
        {activeTab === 'quests' && (
          <QuestsTab
            onStartQuest={onStartQuest}
            onOpenNode={onOpenNode}
            onPlayQuickGame={onPlayQuickGame}
          />
        )}

        {activeTab === 'learn' && (
          <LearnTab
            onOpenConstellationModal={onOpenConstellation}
            onPlayGame={onPlayQuickGame}
          />
        )}

        {activeTab === 'audio' && <AudioTab />}

        {activeTab === 'rewards' && (
          <RewardsTab
            stars={stars}
            onOpenChest={onOpenChest}
            onSelectBadge={onSelectBadge}
            onStartQuest={onStartQuest}
          />
        )}
      </main>

      {/* Bottom Kid Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2.5 flex items-center justify-between z-40">
        <button
          onClick={() => {
            sound.playChime('click');
            onTabChange('quests');
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'quests'
              ? 'text-blue-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-quests-btn"
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Quests</span>
        </button>

        <button
          onClick={() => {
            sound.playChime('click');
            onTabChange('learn');
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'learn'
              ? 'text-blue-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-learn-btn"
        >
          <Lightbulb className="w-5 h-5" />
          <span className="text-[10px]">Learn</span>
        </button>

        <button
          onClick={() => {
            sound.playChime('click');
            onTabChange('audio');
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'audio'
              ? 'text-blue-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-audio-btn"
        >
          <Headphones className="w-5 h-5" />
          <span className="text-[10px]">Audio</span>
        </button>

        <button
          onClick={() => {
            sound.playChime('click');
            onTabChange('rewards');
          }}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'rewards'
              ? 'text-blue-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
          id="tab-rewards-btn"
        >
          <Trophy className="w-5 h-5" />
          <span className="text-[10px]">Rewards</span>
        </button>
      </nav>
    </div>
  );
};
