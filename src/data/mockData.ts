import { ASSETS } from '../assets/images';
import { Explorer, QuestNode, AudioStory, Badge, AvatarGear, ParentAnalytics } from '../types';

export const INITIAL_EXPLORERS: Record<string, Explorer> = {
  leo: {
    id: 'leo',
    name: 'Leo',
    age: 7,
    grade: 'Grade 2',
    title: 'Level 8 Starlight Ranger',
    level: 8,
    xp: 380,
    stars: 450,
    streak: 5,
    avatarUrl: ASSETS.avatars.leo,
    dailyTimeUsedMinutes: 42,
    dailyTimeLimitMinutes: 60,
    activeTopic: 'Dino Island',
    badgesWon: 14,
    totalBadges: 25,
    shields: 5,
  },
  maya: {
    id: 'maya',
    name: 'Maya',
    age: 5,
    grade: 'Kindergarten',
    title: 'Level 3 Star Scout',
    level: 3,
    xp: 180,
    stars: 220,
    streak: 3,
    avatarUrl: ASSETS.avatars.maya,
    dailyTimeUsedMinutes: 25,
    dailyTimeLimitMinutes: 45,
    activeTopic: 'Phonics Safari',
    badgesWon: 8,
    totalBadges: 25,
    shields: 3,
  }
};

export const QUEST_NODES: QuestNode[] = [
  {
    id: 'node-1',
    nodeNumber: 1,
    title: 'Alien Counting',
    subtitle: 'Count cosmic critters in galaxy gardens',
    type: 'counting',
    durationMinutes: 3,
    starsReward: 15,
    status: 'mastered',
    starsEarned: 3,
  },
  {
    id: 'node-2',
    nodeNumber: 2,
    title: 'Space Shapes',
    subtitle: 'Classify asteroid polygons & geometry',
    type: 'shapes',
    durationMinutes: 4,
    starsReward: 20,
    status: 'mastered',
    starsEarned: 3,
  },
  {
    id: 'node-3',
    nodeNumber: 3,
    title: 'Starlight Addition',
    subtitle: 'Combine stars to make 10!',
    type: 'addition',
    durationMinutes: 3,
    starsReward: 20,
    status: 'ready',
  },
  {
    id: 'node-4',
    nodeNumber: 4,
    title: 'Meteor Subtraction',
    subtitle: 'Finish Node 3 first',
    type: 'subtraction',
    durationMinutes: 4,
    starsReward: 25,
    status: 'locked',
  },
  {
    id: 'node-5',
    nodeNumber: 5,
    title: 'Solar Riddle Chest',
    subtitle: 'Solve the Sun mystery to claim the Cosmic Crown!',
    type: 'boss',
    durationMinutes: 6,
    starsReward: 50,
    status: 'locked',
  }
];

export const AUDIO_STORIES: AudioStory[] = [
  {
    id: 'dragon',
    title: 'The Little Dragon Who Lost His Spark',
    category: 'Bedtime Story',
    durationText: '14 min',
    durationSeconds: 840,
    reader: 'Uncle Barnaby',
    coverUrl: ASSETS.stories.dragon,
    description: 'A soothing tale of a gentle baby dragon who searches for his warmth among the friendly starlight clouds.',
    readAlongAvailable: true,
    downloaded: true,
  },
  {
    id: 'bella',
    title: 'Captain Bella & Starlight',
    category: 'Adventure',
    durationText: '8 min',
    durationSeconds: 480,
    reader: 'Commander Nova',
    coverUrl: ASSETS.stories.bella,
    description: 'Blast off through glittery comet trails to discover the lost constellation of the Celestial Fox.',
    readAlongAvailable: true,
    downloaded: true,
  },
  {
    id: 'squirrel',
    title: 'The Forgetful Squirrel',
    category: 'Laughs & Fun',
    durationText: '12 min',
    durationSeconds: 720,
    reader: 'Professor Acorn',
    coverUrl: ASSETS.stories.squirrel,
    description: 'Barnaby cannot find his golden acorns, but he stumbles upon surprising new forest wonders.',
    readAlongAvailable: true,
    downloaded: false,
  },
  {
    id: 'owl',
    title: "Luna's Night Flight",
    category: 'Calm & Cozy',
    durationText: '10 min',
    durationSeconds: 600,
    reader: 'Mama Owl',
    coverUrl: ASSETS.stories.owl,
    description: 'Follow the gentle woodland sounds as Luna helps a lost cricket sing his way back home.',
    readAlongAvailable: true,
    downloaded: true,
  }
];

export const BADGES: Badge[] = [
  {
    id: 'math-wizard',
    name: 'Math Wizard',
    iconName: 'Sparkles',
    status: 'unlocked',
    superpower: 'Instantly solves 2-digit sums with mental starlight beams!',
  },
  {
    id: 'story-master',
    name: 'Story Master',
    iconName: 'BookOpen',
    status: 'unlocked',
    superpower: 'Completed 10 audio adventures with 100% bedtime calm.',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    iconName: 'Sun',
    status: 'unlocked',
    superpower: 'Began 3 morning discovery quests before 9:00 AM.',
  },
  {
    id: 'speedy-solver',
    name: 'Speedy Solver',
    iconName: 'Zap',
    status: 'unlocked',
    superpower: 'Answered 5 rapid-fire geometry puzzles under 30 seconds!',
  },
  {
    id: 'space-pioneer',
    name: 'Space Pioneer',
    iconName: 'Compass',
    status: 'unlocked',
    superpower: 'Charted 5 constellations in the WonderQuest night sky.',
  },
  {
    id: '7-day-streak',
    name: '7-Day Streak',
    iconName: 'Flame',
    status: 'unlocked',
    superpower: 'Maintained 5 of 7 days learning rhythm this week.',
    progressText: '5/7 Days',
  },
  {
    id: 'puzzle-champ',
    name: 'Puzzle Champ',
    iconName: 'Lock',
    status: 'locked',
    superpower: 'Unlock by completing all 12 Dino Math Island levels.',
  },
  {
    id: 'deep-sea',
    name: 'Deep Sea',
    iconName: 'Lock',
    status: 'locked',
    superpower: 'Unlock by exploring the upcoming Ocean Trench ecosystem.',
  },
  {
    id: 'level-10-secret',
    name: 'Level 10 Secret',
    iconName: 'HelpCircle',
    status: 'secret',
    superpower: 'Reach Level 10 Starlight Commander to reveal secret relic!',
  }
];

export const AVATAR_GEAR: AvatarGear[] = [
  {
    id: 'sky-goggles',
    name: 'Sky Goggles',
    status: 'equipped',
    icon: 'Glasses',
  },
  {
    id: 'alien-shades',
    name: 'Alien Shades',
    status: 'available',
    icon: 'SunMedium',
  },
  {
    id: 'solar-cape',
    name: 'Solar Cape',
    status: 'locked',
    icon: 'Sparkles',
    unlockLevel: 10,
  }
];

export const INITIAL_ANALYTICS: ParentAnalytics = {
  dailyAverageMins: 38,
  remainingTodayMins: 18,
  totalWeekHours: '4h 25m',
  isBedtimeLockActive: true,
  isPaused: false,
  mathLogicMastery: 88,
  readingPhonicsMastery: 92,
  emotionalCalmStreak: 5,
  chestPending: true,
};

export const WEEKLY_RHYTHM_DATA = [
  { day: 'M', quests: 30, audio: 15, label: 'Mon' },
  { day: 'T', quests: 45, audio: 18, label: 'Tue' },
  { day: 'W', quests: 25, audio: 12, label: 'Wed' },
  { day: 'T', quests: 42, audio: 18, label: 'Thu (Today)', isToday: true },
  { day: 'F', quests: 20, audio: 10, label: 'Fri' },
  { day: 'S', quests: 15, audio: 20, label: 'Sat' },
  { day: 'S', quests: 12, audio: 15, label: 'Sun' },
];
