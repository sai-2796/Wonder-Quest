import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AppView, KidTab, Badge } from './types';
import { FamilyHub } from './components/FamilyHub';
import { KidWorld } from './components/KidWorld';
import { ParentCommandCenter } from './components/parent/ParentCommandCenter';
import { SeniorSanctuary } from './components/SeniorSanctuary';
import { ParentZoneGateModal } from './components/parent/ParentZoneGateModal';
import { QuestGameModal } from './components/modals/QuestGameModal';
import { ConstellationSkyModal } from './components/modals/ConstellationSkyModal';
import { RecipeActivityModal } from './components/modals/RecipeActivityModal';
import { ChestRewardModal } from './components/modals/ChestRewardModal';
import { BadgeDetailModal } from './components/modals/BadgeDetailModal';
import { VoiceAssistModal } from './components/modals/VoiceAssistModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('hub');
  const [kidTab, setKidTab] = useState<KidTab>('quests');
  const [isParentGateOpen, setIsParentGateOpen] = useState(false);
  const [isQuestGameOpen, setIsQuestGameOpen] = useState(false);
  const [isConstellationOpen, setIsConstellationOpen] = useState(false);
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);
  const [isChestOpen, setIsChestOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Gamification state
  const [stars, setStars] = useState(450);
  const [streak, setStreak] = useState(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleQuestComplete = (starsEarned: number) => {
    setStars((prev) => prev + starsEarned);
    showToast(`🌟 +${starsEarned} Star Gems Earned! Quest Mastered!`);
  };

  const handleAddStars = (amount: number) => {
    setStars((prev) => prev + amount);
    showToast(`⭐ +${amount} Chore Stars Added to Leo's Bank!`);
  };

  const handleApproveChest = () => {
    if (stars < 500) {
      setStars(500);
    }
    showToast('🎉 Super Cosmic Chest Approved by Parents!');
  };

  const handleUnlockChestRewards = () => {
    showToast('👑 Unlocked Galactic Solar Cape & Starlight Ranger Crown!');
  };

  const handleVoiceNavigate = (
    view: 'hub' | 'kid' | 'parent_gate' | 'grandpa',
    tab?: KidTab
  ) => {
    if (view === 'parent_gate') {
      setIsParentGateOpen(true);
    } else {
      setCurrentView(view as AppView);
      if (tab) setKidTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 md:py-8 flex flex-col items-center justify-center selection:bg-amber-200">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 z-50 px-4 py-2.5 bg-slate-900/95 text-white font-bold text-xs rounded-2xl shadow-2xl border border-amber-400 flex items-center gap-2 backdrop-blur-md"
          >
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container - Mobile Frame on Desktop */}
      <div className="w-full max-w-md bg-[#FAF7F2] min-h-screen md:min-h-[844px] md:max-h-[920px] md:rounded-[40px] md:shadow-2xl md:border-[8px] md:border-slate-800 overflow-y-auto no-scrollbar relative">
        <AnimatePresence mode="wait">
          {currentView === 'hub' && (
            <motion.div
              key="hub"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <FamilyHub
                onEnterKidWorld={(tab) => {
                  if (tab) setKidTab(tab);
                  setCurrentView('kid');
                }}
                onOpenParentGate={() => setIsParentGateOpen(true)}
                onOpenGrandpa={() => setCurrentView('grandpa')}
                onOpenRecipe={() => setIsRecipeOpen(true)}
                onOpenVoice={() => setIsVoiceOpen(true)}
              />
            </motion.div>
          )}

          {currentView === 'kid' && (
            <motion.div
              key="kid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <KidWorld
                activeTab={kidTab}
                onTabChange={setKidTab}
                stars={stars}
                streak={streak}
                onReturnToHub={() => setCurrentView('hub')}
                onStartQuest={() => setIsQuestGameOpen(true)}
                onOpenNode={(id) => {
                  if (id === 'node-3') setIsQuestGameOpen(true);
                  else if (id === 'node-1' || id === 'node-2') {
                    showToast('⭐ Node Mastered! You earned 3 stars here.');
                  }
                }}
                onPlayQuickGame={(name) => {
                  showToast(`🎮 Launching ${name}!`);
                  setIsQuestGameOpen(true);
                }}
                onOpenConstellation={() => setIsConstellationOpen(true)}
                onOpenChest={() => setIsChestOpen(true)}
                onSelectBadge={(b) => setSelectedBadge(b)}
              />
            </motion.div>
          )}

          {currentView === 'parent' && (
            <motion.div
              key="parent"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <ParentCommandCenter
                onBack={() => setCurrentView('hub')}
                onEnterKidWorld={() => setCurrentView('kid')}
                stars={stars}
                onAddStars={handleAddStars}
                onApproveChest={handleApproveChest}
              />
            </motion.div>
          )}

          {currentView === 'grandpa' && (
            <motion.div
              key="grandpa"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <SeniorSanctuary
                onBack={() => setCurrentView('hub')}
                onOpenVoice={() => setIsVoiceOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modals */}
      <ParentZoneGateModal
        isOpen={isParentGateOpen}
        onClose={() => setIsParentGateOpen(false)}
        onSuccess={() => {
          setIsParentGateOpen(false);
          setCurrentView('parent');
        }}
        onLockApp={() => {
          showToast('🔒 Screen limit pause activated for tonight!');
        }}
      />

      <QuestGameModal
        isOpen={isQuestGameOpen}
        onClose={() => setIsQuestGameOpen(false)}
        onComplete={handleQuestComplete}
      />

      <ConstellationSkyModal
        isOpen={isConstellationOpen}
        onClose={() => setIsConstellationOpen(false)}
      />

      <RecipeActivityModal
        isOpen={isRecipeOpen}
        onClose={() => setIsRecipeOpen(false)}
      />

      <ChestRewardModal
        isOpen={isChestOpen}
        onClose={() => setIsChestOpen(false)}
        stars={stars}
        maxStars={500}
        onUnlock={handleUnlockChestRewards}
      />

      <BadgeDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />

      <VoiceAssistModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onNavigate={handleVoiceNavigate}
      />
    </div>
  );
}
