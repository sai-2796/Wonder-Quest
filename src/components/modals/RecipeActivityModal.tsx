import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Utensils, Moon, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

interface RecipeActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeActivityModal: React.FC<RecipeActivityModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-amber-200 overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                  Family Night Special • 7:00 PM
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Cosmic S'mores & Stargazing
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4 space-y-4">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80">
              <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Intergenerational Activity
              </h4>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                Blends tailored picks from <strong>Leo's astronomy quest</strong> alongside <strong>Grandpa's favorite bedtime constellation folklore</strong> and mom & dad's evening wind-down routine.
              </p>
            </div>

            {/* Ingredients & Prep */}
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-2 font-heading">Ingredients for 4 Explorers:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Graham cracker squares
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Giant fluffy marshmallows
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Dark & milk chocolate bars
                </div>
                <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Edible star sugar sprinkles
                </div>
              </div>
            </div>

            {/* Steps */}
            <div>
              <h4 className="text-sm font-bold text-slate-800 mb-2 font-heading">3 Family Steps:</h4>
              <ol className="space-y-2.5 text-xs text-slate-700">
                <li className="flex gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <span><strong>Build Constellation Crackers:</strong> Use toothpick dipping in honey to connect star sprinkles into the shape of Ursa Major!</span>
                </li>
                <li className="flex gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <span><strong>Toast to Perfection:</strong> Melt the marshmallows and assemble with chocolate under parent guidance.</span>
                </li>
                <li className="flex gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <span><strong>Backyard Stargazing:</strong> Step out onto the patio, look north, and let Leo point out the North Star using the bowl pointers!</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => {
                sound.playChime('correct');
                onClose();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Moon className="w-4 h-4" /> Save to Family Calendar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
