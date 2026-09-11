import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, Compass } from 'lucide-react';
import { sound } from '../../utils/audio';

interface ConstellationSkyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConstellationSkyModal: React.FC<ConstellationSkyModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const stars = [
    { x: 28, y: 55, name: 'Dubhe (Pointer)' },
    { x: 30, y: 72, name: 'Merak (Pointer)' },
    { x: 44, y: 76, name: 'Phecda' },
    { x: 46, y: 60, name: 'Megrez' },
    { x: 62, y: 52, name: 'Alioth' },
    { x: 74, y: 44, name: 'Mizar' },
    { x: 86, y: 40, name: 'Alkaid' },
    { x: 28, y: 18, name: 'Polaris (North Star)', isNorth: true },
  ];

  const handleReadStory = () => {
    sound.speak(
      "Ursa Major, the Great Bear! Look at the two outer stars of the bowl: Merak and Dubhe. If you draw a straight line through them and keep going, they point directly to Polaris, the North Star! Explorers have used this secret for thousands of years."
    );
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 text-white shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/20 text-indigo-300 rounded-xl">
                <Compass className="w-5 h-5 text-cyan-400" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 font-heading">
                  Ursa Major & The North Star
                </h3>
                <p className="text-xs text-slate-400">Interactive Night Sky Viewer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Starlight Sky Canvas / SVG */}
          <div className="relative my-4 h-64 bg-radial from-slate-800 via-slate-900 to-indigo-950 rounded-2xl border border-indigo-900/60 overflow-hidden flex items-center justify-center">
            {/* Background tiny stars */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
                style={{
                  top: `${(i * 37) % 95}%`,
                  left: `${(i * 53) % 95}%`,
                  animationDuration: `${1.5 + (i % 3)}s`,
                }}
              />
            ))}

            {/* SVG Connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Bowl */}
              <line x1="28%" y1="55%" x2="30%" y2="72%" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="30%" y1="72%" x2="44%" y2="76%" stroke="#38bdf8" strokeWidth="2" />
              <line x1="44%" y1="76%" x2="46%" y2="60%" stroke="#38bdf8" strokeWidth="2" />
              <line x1="46%" y1="60%" x2="28%" y2="55%" stroke="#38bdf8" strokeWidth="2" />
              {/* Handle */}
              <line x1="46%" y1="60%" x2="62%" y2="52%" stroke="#38bdf8" strokeWidth="2" />
              <line x1="62%" y1="52%" x2="74%" y2="44%" stroke="#38bdf8" strokeWidth="2" />
              <line x1="74%" y1="44%" x2="86%" y2="40%" stroke="#38bdf8" strokeWidth="2" />
              {/* Pointer line to Polaris */}
              <line x1="30%" y1="72%" x2="28%" y2="18%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            </svg>

            {/* Stars */}
            {stars.map((s, idx) => (
              <div
                key={idx}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                onClick={() => sound.playChime('star')}
              >
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    s.isNorth
                      ? 'bg-amber-400 ring-4 ring-amber-400/40 animate-pulse'
                      : 'bg-cyan-300 ring-2 ring-cyan-400/30'
                  }`}
                >
                  <Sparkles className={`w-2.5 h-2.5 ${s.isNorth ? 'text-amber-950' : 'text-indigo-950'}`} />
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 top-4 whitespace-nowrap text-[10px] bg-slate-900/90 text-cyan-200 px-1.5 py-0.5 rounded shadow opacity-80 group-hover:opacity-100 font-mono">
                  {s.name}
                </span>
              </div>
            ))}

            <div className="absolute bottom-2 left-3 text-[11px] text-amber-300/80 bg-slate-950/60 px-2 py-1 rounded-md border border-amber-500/20">
              Yellow dotted beam points to Polaris
            </div>
          </div>

          {/* Description & Action */}
          <div className="bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 mb-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">Astronomer's Secret:</strong> Follow the two pointer stars on the outer edge of the Big Dipper's bowl. They point straight upwards to the North Star (Polaris), which never moves in the northern sky!
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReadStory}
              className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <Volume2 className="w-4 h-4" /> Listen to Tale
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
