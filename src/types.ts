export type AppView = 'hub' | 'kid' | 'parent_gate' | 'parent' | 'grandpa';
export type KidTab = 'quests' | 'learn' | 'audio' | 'rewards';
export type ParentTab = 'overview' | 'limits' | 'curriculum' | 'settings';

export interface Explorer {
  id: string;
  name: string;
  age: number;
  grade: string;
  title: string;
  level: number;
  xp: number;
  stars: number;
  streak: number;
  avatarUrl: string;
  dailyTimeUsedMinutes: number;
  dailyTimeLimitMinutes: number;
  activeTopic: string;
  badgesWon: number;
  totalBadges: number;
  shields: number;
}

export interface QuestNode {
  id: string;
  nodeNumber: number;
  title: string;
  subtitle: string;
  type: 'counting' | 'shapes' | 'addition' | 'subtraction' | 'boss';
  durationMinutes: number;
  starsReward: number;
  status: 'mastered' | 'ready' | 'locked';
  starsEarned?: number;
}

export interface AudioStory {
  id: string;
  title: string;
  category: string;
  durationText: string;
  durationSeconds: number;
  reader: string;
  coverUrl: string;
  description: string;
  readAlongAvailable: boolean;
  downloaded: boolean;
}

export interface Badge {
  id: string;
  name: string;
  iconName: string;
  status: 'unlocked' | 'locked' | 'secret';
  superpower: string;
  progressText?: string;
}

export interface AvatarGear {
  id: string;
  name: string;
  status: 'equipped' | 'available' | 'locked';
  icon: string;
  unlockLevel?: number;
}

export interface ParentAnalytics {
  dailyAverageMins: number;
  remainingTodayMins: number;
  totalWeekHours: string;
  isBedtimeLockActive: boolean;
  isPaused: boolean;
  mathLogicMastery: number;
  readingPhonicsMastery: number;
  emotionalCalmStreak: number;
  chestPending: boolean;
}
