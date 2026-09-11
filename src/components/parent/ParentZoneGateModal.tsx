import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Check,
  Delete,
  Shield,
  Smile,
  AlertTriangle,
  Smartphone,
} from 'lucide-react';
import { ASSETS } from '../../assets/images';
import { sound } from '../../utils/audio';

interface ParentZoneGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onLockApp?: () => void;
}

export const ParentZoneGateModal: React.FC<ParentZoneGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onLockApp,
}) => {
  const [pin, setPin] = useState<string>('');
  const [selectedExplorer, setSelectedExplorer] = useState<'leo' | 'maya'>('leo');
  const [errorShake, setErrorShake] = useState(false);

  const handleDigit = (digit: string) => {
    if (pin.length >= 4) return;
    sound.playChime('click');
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === '1234') {
        sound.playChime('fanfare');
        setTimeout(() => {
          setPin('');
          onSuccess();
        }, 300);
      } else {
        sound.playChime('pop');
        setErrorShake(true);
        setTimeout(() => {
          setErrorShake(false);
          setPin('');
        }, 600);
      }
    }
  };

  const handleDelete = () => {
    sound.playChime('click');
    setPin((prev) => prev.slice(0, -1));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          animate={errorShake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-purple-200 text-center"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
            id="close-parent-gate-btn"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon & Title */}
          <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 mb-2 border border-purple-200 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <h3 className="text-xl font-black text-slate-900 font-heading">
            Parental Check
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter PIN to access parent command center
          </p>

          {/* Explorer Profile Switcher */}
          <div className="grid grid-cols-2 gap-2.5 my-4">
            <div
              onClick={() => setSelectedExplorer('leo')}
              className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                selectedExplorer === 'leo'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-200 bg-white opacity-70'
              }`}
            >
              <img
                src={ASSETS.avatars.leo}
                alt="Leo"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-slate-900">Leo</span>
                  {selectedExplorer === 'leo' && (
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500">Grade 2 • 7 yrs</p>
              </div>
            </div>

            <div
              onClick={() => setSelectedExplorer('maya')}
              className={`p-2.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-2.5 ${
                selectedExplorer === 'maya'
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-slate-200 bg-white opacity-70'
              }`}
            >
              <img
                src={ASSETS.avatars.maya}
                alt="Maya"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-slate-900">Maya</span>
                  {selectedExplorer === 'maya' && (
                    <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  )}
                </div>
                <p className="text-[10px] text-slate-500">Kinder • 5 yrs</p>
              </div>
            </div>
          </div>

          {/* PIN Dots */}
          <div className="flex justify-center gap-3 my-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  pin.length > i
                    ? 'bg-purple-600 border-purple-600 scale-110'
                    : 'bg-white border-slate-300'
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] text-purple-700 font-bold bg-purple-50 py-1 px-2.5 rounded-full inline-block mb-3">
            💡 Default PIN: 1 2 3 4
          </p>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleDigit(num.toString())}
                className="h-12 rounded-2xl bg-slate-50 hover:bg-purple-50 active:bg-purple-100 border border-slate-200 font-black text-lg text-slate-800 transition-colors"
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => sound.playChime('pop')}
              className="h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-amber-500 border border-slate-200 hover:bg-slate-100"
            >
              <Smile className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleDigit('0')}
              className="h-12 rounded-2xl bg-slate-50 hover:bg-purple-50 active:bg-purple-100 border border-slate-200 font-black text-lg text-slate-800 transition-colors"
            >
              0
            </button>

            <button
              onClick={handleDelete}
              className="h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 border border-slate-200 hover:bg-slate-100 active:bg-slate-200"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>

          {/* Instant Screen Lock Emergency Button */}
          <button
            onClick={() => {
              sound.playChime('pop');
              if (onLockApp) onLockApp();
              onClose();
            }}
            className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200/80 transition-colors flex items-center justify-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Instant Screen Pause / Bedtime Lock</span>
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
