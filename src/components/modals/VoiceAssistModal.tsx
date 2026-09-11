import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mic, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

interface VoiceAssistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'hub' | 'kid' | 'parent_gate' | 'grandpa', kidTab?: 'quests' | 'learn' | 'audio' | 'rewards') => void;
}

export const VoiceAssistModal: React.FC<VoiceAssistModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('Listening for family command...');

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setTranscript('Listening for family command...');
      sound.playChime('pop');
    }
  }, [isOpen]);

  const handleCommand = (text: string, action: () => void) => {
    setTranscript(`"${text}"`);
    setIsListening(false);
    sound.speak(`Sure! Opening ${text}`);
    setTimeout(() => {
      action();
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                WonderVoice Assist
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Visualizer */}
          <div className="my-6 text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Mic className="w-9 h-9 text-white animate-pulse" />
              </div>
              {isListening && (
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping" />
              )}
            </div>

            {/* Simulated Animated Waves */}
            <div className="flex items-center justify-center gap-1.5 mt-5 h-8">
              {[18, 32, 14, 28, 40, 22, 36, 16, 26, 34].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isListening ? [h * 0.4, h, h * 0.3] : 8,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (i % 4) * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 bg-gradient-to-t from-cyan-500 to-amber-300 rounded-full"
                />
              ))}
            </div>

            <p className="text-sm font-semibold text-slate-200 mt-4 px-2">
              {transcript}
            </p>
          </div>

          {/* Quick Voice Shortcuts */}
          <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Tap or say aloud:
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleCommand('Leo Kid World', () => onNavigate('kid', 'quests'))}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left text-xs text-cyan-200 transition-colors"
              >
                <span>🚀 "Enter Leo's Kid World"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleCommand('Bedtime Audio Stories', () => onNavigate('kid', 'audio'))}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left text-xs text-amber-200 transition-colors"
              >
                <span>🌙 "Play Bedtime Story (Little Dragon)"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleCommand('Grandpa Sanctuary', () => onNavigate('grandpa'))}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left text-xs text-emerald-200 transition-colors"
              >
                <span>👴 "Switch to Grandpa's Sanctuary"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => handleCommand('Parent Command Center', () => onNavigate('parent_gate'))}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-left text-xs text-violet-200 transition-colors"
              >
                <span>🔒 "Open Parent Command Center"</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
