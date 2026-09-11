import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Sparkles, Star } from 'lucide-react';
import { Badge } from '../../types';
import { sound } from '../../utils/audio';

interface BadgeDetailModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({
  badge,
  onClose,
}) => {
  if (!badge) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className="relative w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl border-2 border-amber-200 text-center"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center shadow-md my-2 border-4 border-white">
            <Award className="w-10 h-10 text-amber-900" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mt-2 font-heading">{badge.name}</h3>
          <span
            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mt-1 ${
              badge.status === 'unlocked'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {badge.status === 'unlocked' ? 'Badge Unlocked ⭐' : 'Locked Mystery'}
          </span>

          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 my-4 text-xs text-slate-700 leading-relaxed text-left">
            <strong className="text-amber-900 block mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Superpower:
            </strong>
            {badge.superpower}
          </div>

          <button
            onClick={() => {
              sound.playChime('star');
              onClose();
            }}
            className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition-colors"
          >
            Awesome!
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
