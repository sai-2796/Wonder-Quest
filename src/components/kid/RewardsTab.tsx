import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Award,
  Star,
  Shield,
  Lock,
  Gift,
  Eye,
  Check,
  Flame,
  ArrowRight,
  Sun,
  Zap,
  Compass,
  BookOpen,
  HelpCircle,
} from 'lucide-react';
import { BADGES, AVATAR_GEAR } from '../../data/mockData';
import { Badge, AvatarGear } from '../../types';
import { sound } from '../../utils/audio';

interface RewardsTabProps {
  stars: number;
  onOpenChest: () => void;
  onSelectBadge: (badge: Badge) => void;
  onStartQuest: () => void;
}

export const RewardsTab: React.FC<RewardsTabProps> = ({
  stars,
  onOpenChest,
  onSelectBadge,
  onStartQuest,
}) => {
  const [gearList, setGearList] = useState<AvatarGear[]>(AVATAR_GEAR);

  const handleEquipGear = (gearId: string) => {
    sound.playChime('star');
    setGearList((prev) =>
      prev.map((g) => {
        if (g.id === gearId) return { ...g, status: 'equipped' };
        if (g.status === 'equipped') return { ...g, status: 'available' };
        return g;
      })
    );
  };

  const getBadgeIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-purple-500" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-500" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-slate-400" />;
      default:
        return <Lock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Profile Header Box */}
      <section className="bg-white rounded-3xl p-4 border border-amber-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner border border-amber-300">
            🤠
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 font-heading">
              Leo the Starlight Ranger
            </h3>
            <p className="text-xs text-amber-700 font-bold">Level 8 Explorer</p>
            <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-600" />
              14/25 collected • 5-Day Shield Active
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/60 inline-flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            {stars}
          </span>
        </div>
      </section>

      {/* Super Cosmic Chest Banner */}
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 rounded-3xl p-4.5 border-2 border-amber-400 shadow-md shadow-amber-500/15 relative overflow-hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-2xl bg-white/90 shadow-md flex items-center justify-center text-amber-800 shrink-0 border border-amber-300">
            <Gift className="w-9 h-9 animate-bounce text-amber-700" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider">
                Super Cosmic Chest
              </span>
              <span className="text-xs font-black text-amber-950">
                {stars} / 500 ⭐
              </span>
            </div>

            <div className="w-full h-2.5 bg-amber-500/20 rounded-full overflow-hidden my-1.5 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-700 rounded-full"
                style={{ width: `${Math.min(100, (stars / 500) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-amber-950 font-bold leading-tight">
              {stars >= 500
                ? '🎉 Congratulations! Chest is ready to unlock!'
                : `Almost there! Only ${500 - stars} stars left to unlock the Cosmic Crown & 100 Bonus XP!`}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playChime('pop');
            onOpenChest();
          }}
          className="mt-3 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
          id="peek-chest-btn"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{stars >= 500 ? 'Open Super Chest Now!' : 'Peek Inside 👀'}</span>
        </button>
      </section>

      {/* Badge Trophy Wall */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 font-heading">
              Badge Trophy Wall
            </h3>
            <p className="text-xs text-slate-500">14 of 25 Badges Collected</p>
          </div>
          <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
            🏆 Hall of Fame
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {BADGES.map((badge) => {
            const isUnlocked = badge.status === 'unlocked';
            return (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  sound.playChime(isUnlocked ? 'star' : 'pop');
                  onSelectBadge(badge);
                }}
                className={`p-3 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-between min-h-[105px] ${
                  isUnlocked
                    ? 'bg-white border-amber-200/90 shadow-sm hover:border-amber-400'
                    : 'bg-slate-50 border-slate-200/60 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${
                    isUnlocked
                      ? 'bg-amber-100/80 text-amber-700'
                      : 'bg-slate-200/70 text-slate-400'
                  }`}
                >
                  {getBadgeIcon(badge.iconName)}
                </div>

                <h4 className="text-[11px] font-bold text-slate-800 leading-tight">
                  {badge.name}
                </h4>

                <span className="text-[9px] font-extrabold mt-1 text-slate-500">
                  {badge.progressText || (isUnlocked ? '★ Unlocked' : 'Locked')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Avatar Gear Closet */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 font-heading">
            Avatar Gear Closet
          </h3>
          <span className="text-xs font-bold text-blue-600">3 Items</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {gearList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-sm text-center flex flex-col justify-between"
            >
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 flex items-center justify-center text-xl mb-1.5">
                {item.id === 'sky-goggles' && '🥽'}
                {item.id === 'alien-shades' && '🕶️'}
                {item.id === 'solar-cape' && '🦸'}
              </div>

              <h4 className="text-xs font-bold text-slate-800 leading-tight mb-2">
                {item.name}
              </h4>

              {item.status === 'equipped' ? (
                <span className="w-full py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-lg flex items-center justify-center gap-0.5">
                  <Check className="w-3 h-3" /> Equipped
                </span>
              ) : item.status === 'available' ? (
                <button
                  onClick={() => handleEquipGear(item.id)}
                  className="w-full py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  Wear Now
                </button>
              ) : (
                <span className="w-full py-1 bg-slate-100 text-slate-400 text-[10px] font-bold rounded-lg flex items-center justify-center gap-0.5">
                  <Lock className="w-3 h-3" /> Lv. 10
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA: Start Next Star Quest */}
      <section className="pt-2">
        <button
          onClick={() => {
            sound.playChime('correct');
            onStartQuest();
          }}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <span>Start Next Star Quest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
