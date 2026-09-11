import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Sparkles, Gift, ShieldCheck, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ChestRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  maxStars: number;
  onUnlock?: () => void;
}

export const ChestRewardModal: React.FC<ChestRewardModalProps> = ({
  isOpen,
  onClose,
  stars,
  maxStars,
  onUnlock,
}) => {
  if (!isOpen) return null;

  const isUnlocked = stars >= maxStars;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-white to-amber-50 rounded-3xl p-6 shadow-2xl border-4 border-amber-300 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Chest visual */}
          <div className="relative my-2 inline-flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-100 flex items-center justify-center shadow-lg border-2 border-amber-400">
              <Gift className="w-14 h-14 text-amber-900 animate-pulse" />
            </div>
            <Sparkles className="w-6 h-6 text-amber-500 absolute -top-2 -right-2 animate-bounce" />
          </div>

          <h3 className="text-xl font-black text-slate-900 mt-3 font-heading">
            Super Cosmic Chest
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Legendary Level 8 Starlight Ranger Trophy
          </p>

          {/* Star Progress */}
          <div className="my-4 bg-white p-3.5 rounded-2xl border border-amber-200 shadow-sm">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
              <span>Star Fuel</span>
              <span className="text-amber-600 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {stars} / {maxStars}
              </span>
            </div>
            <div className="w-full h-3 bg-amber-100 rounded-full overflow-hidden p-0.5 border border-amber-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (stars / maxStars) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-amber-800 font-semibold mt-2">
              {isUnlocked
                ? '⭐ Requirement met! Chest ready to open!'
                : `⚡ Only ${maxStars - stars} more stars to open! Ask parent to approve chore stars!`}
            </p>
          </div>

          {/* Contents Preview */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 mb-5 text-left">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Inside This Vault:
            </span>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span><strong>Galactic Solar Cape</strong> (Rare cosmetic)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span><strong>+100 Bonus Starlight XP</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span><strong>Cosmic Starlight Ranger Crown</strong></span>
              </div>
            </div>
          </div>

          {/* Action button */}
          {isUnlocked ? (
            <button
              onClick={() => {
                sound.playChime('fanfare');
                if (onUnlock) onUnlock();
                onClose();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Open Chest Now!
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playChime('click');
                onClose();
              }}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-2xl shadow-md transition-all"
            >
              Keep Exploring Quests
            </button>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
