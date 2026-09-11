import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Volume2,
  Mic,
  Moon,
  Sparkles,
  Heart,
  Play,
  Pause,
  CloudRain,
  Waves,
  Wind,
  CheckCircle,
  Radio,
} from 'lucide-react';
import { ASSETS } from '../assets/images';
import { sound } from '../utils/audio';

interface SeniorSanctuaryProps {
  onBack: () => void;
  onOpenVoice: () => void;
}

export const SeniorSanctuary: React.FC<SeniorSanctuaryProps> = ({
  onBack,
  onOpenVoice,
}) => {
  const [isPlayingStory, setIsPlayingStory] = useState(false);
  const [activeSoundscape, setActiveSoundscape] = useState<string | null>(null);
  const [recordedMemory, setRecordedMemory] = useState(false);

  const handlePlayStory = () => {
    if (!isPlayingStory) {
      sound.speak(
        "Welcome to the Starlit Sailor folklore tale. Long ago, on the calm northern waters, sailors used the constellation Ursa Major to chart voyages home safely. Grandpa Arthur, let the gentle breeze guide your evening thoughts."
      );
      setIsPlayingStory(true);
    } else {
      sound.stopSpeaking();
      setIsPlayingStory(false);
    }
  };

  const handleSoundscape = (name: string) => {
    sound.playChime('pop');
    if (activeSoundscape === name) {
      setActiveSoundscape(null);
    } else {
      setActiveSoundscape(name);
      sound.speak(`${name} soundscape activated`);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 pb-20 max-w-md mx-auto relative shadow-2xl overflow-hidden font-sans">
      {/* High Contrast Header */}
      <header className="px-5 pt-4 pb-3 flex items-center justify-between bg-white/95 backdrop-blur-md sticky top-0 z-30 border-b border-amber-200">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playChime('click');
              onBack();
            }}
            className="w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center text-amber-900 transition-colors"
            title="Return to Family Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-black text-amber-950 font-heading">
              Senior Sanctuary
            </h1>
            <p className="text-xs text-amber-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Voice-First Active
            </p>
          </div>
        </div>

        <img
          src={ASSETS.avatars.grandpa}
          alt="Grandpa"
          className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-sm"
        />
      </header>

      <main className="px-5 pt-4 space-y-4">
        {/* Warm Welcome Greeting */}
        <div className="bg-amber-50 rounded-3xl p-5 border border-amber-200 shadow-sm">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Comfort & Calm
          </span>
          <h2 className="text-2xl font-black text-amber-950 font-heading mt-1">
            Good afternoon, Grandpa Arthur!
          </h2>
          <p className="text-sm text-slate-700 mt-1 leading-relaxed">
            Relax with bedtime folklore, calming nature soundscapes, or record a story for Leo and Maya.
          </p>
        </div>

        {/* Featured Folklore Audio */}
        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1">
              <Radio className="w-3.5 h-3.5" />
              Folklore & Classics
            </span>
            <span className="text-xs text-slate-500 font-bold">18 min</span>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900 font-heading">
              The Starlit Sailor & The Great Bear
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              A peaceful audio journey recounting old maritime lore, guiding navigators across tranquil seas with the Big Dipper.
            </p>
          </div>

          <button
            onClick={handlePlayStory}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isPlayingStory ? (
              <>
                <Pause className="w-5 h-5 fill-white" /> Pause Tale
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" /> Listen with Large Audio
              </>
            )}
          </button>
        </div>

        {/* Calm Nature Soundscapes */}
        <div className="bg-white rounded-3xl p-5 border border-amber-200 shadow-sm space-y-3">
          <h3 className="text-base font-black text-slate-900 font-heading flex items-center gap-2">
            <Moon className="w-4 h-4 text-amber-600" />
            Calm Nature Soundscapes
          </h3>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'rain', name: 'Pine Forest Rain', icon: CloudRain },
              { id: 'waves', name: 'Ocean Shore', icon: Waves },
              { id: 'wind', name: 'Gentle Breeze', icon: Wind },
            ].map((snd) => {
              const Icon = snd.icon;
              const isActive = activeSoundscape === snd.name;
              return (
                <button
                  key={snd.id}
                  onClick={() => handleSoundscape(snd.name)}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${
                    isActive
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md'
                      : 'bg-amber-50/70 border-amber-200 text-slate-800 hover:bg-amber-100'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs font-bold leading-tight">{snd.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Family Connection: Leave a Voice Memory for Kids */}
        <div className="bg-emerald-50 rounded-3xl p-5 border border-emerald-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-emerald-800">
            <Heart className="w-5 h-5 fill-emerald-500 text-emerald-500" />
            <h3 className="text-base font-black font-heading">
              Family Connection
            </h3>
          </div>

          <p className="text-xs text-emerald-950 leading-relaxed">
            Leo solved the Ursa Major constellation quest today! Record a quick 1-minute memory telling him about your favorite childhood stargazing memory.
          </p>

          <button
            onClick={() => {
              sound.playChime('star');
              setRecordedMemory(true);
              sound.speak("Voice story recorded and saved to Leo's bedtime queue!");
            }}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            {recordedMemory ? (
              <>
                <CheckCircle className="w-4 h-4" /> Story Shared with Leo & Maya!
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" /> Record 1-Min Story for Leo
              </>
            )}
          </button>
        </div>

        {/* Big Voice Assistant Trigger */}
        <button
          onClick={onOpenVoice}
          className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-base rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-colors"
        >
          <Mic className="w-5 h-5" />
          <span>Tap to Speak with WonderVoice</span>
        </button>
      </main>
    </div>
  );
};
