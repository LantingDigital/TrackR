/**
 * Trivia Question Database
 * 50+ roller coaster questions across all difficulty levels
 */

import { TriviaQuestion } from './types';

/**
 * EASY QUESTIONS (20 questions)
 * Focus: Basic coaster knowledge, famous attractions, general facts
 */
const easyQuestions: TriviaQuestion[] = [
  {
    id: 'easy_001',
    question: 'What is the tallest roller coaster in the world?',
    options: ['Kingda Ka', 'Formula Rossa', 'Steel Dragon 2000', 'Fury 325'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'records',
    explanation: 'Kingda Ka at Six Flags Great Adventure stands 456 feet tall!',
  },
  {
    id: 'easy_002',
    question: 'Which manufacturer is known for "Giga Coasters"?',
    options: ['Intamin', 'Bolliger & Mabillard', 'RMC', 'Vekoma'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'manufacturers',
    explanation: 'Intamin pioneered the Giga Coaster category (300-399 ft tall).',
  },
  {
    id: 'easy_003',
    question: 'What does RMC stand for?',
    options: [
      'Rocky Mountain Construction',
      'Roller Manufacturer Corp',
      'Rapid Motion Coasters',
      'RMC Manufacturing',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'manufacturers',
    explanation: 'RMC revolutionized the industry with hybrid coaster conversions.',
  },
  {
    id: 'easy_004',
    question: 'Which park has the most roller coasters in the world?',
    options: [
      'Six Flags Magic Mountain',
      'Cedar Point',
      'Canada\'s Wonderland',
      'Kings Island',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'parks',
    explanation: 'Six Flags Magic Mountain has 20 roller coasters!',
  },
  {
    id: 'easy_005',
    question: 'What is the fastest roller coaster in the world?',
    options: [
      'Formula Rossa',
      'Kingda Ka',
      'Top Thrill 2',
      'Red Force',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'records',
    explanation: 'Formula Rossa at Ferrari World reaches 149.1 mph!',
  },
  {
    id: 'easy_006',
    question: 'What type of coaster is known for inversions and smooth rides?',
    options: ['B&M', 'Wooden', 'Wild Mouse', 'Kiddie Coaster'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'manufacturers',
    explanation: 'Bolliger & Mabillard (B&M) coasters are famous for smooth inversions.',
  },
  {
    id: 'easy_007',
    question: 'Where is Cedar Point located?',
    options: ['Ohio', 'California', 'Florida', 'Texas'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'parks',
    explanation: 'Cedar Point is in Sandusky, Ohio - "Roller Coaster Capital of the World"',
  },
  {
    id: 'easy_008',
    question: 'What is a "launch coaster"?',
    options: [
      'A coaster that uses motors to accelerate',
      'A coaster built in a rocket shape',
      'A coaster that only goes up',
      'A coaster that was recently opened',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'Launch coasters use LSM, hydraulic, or pneumatic systems to accelerate.',
  },
  {
    id: 'easy_009',
    question: 'Which coaster was the first to break 200 feet?',
    options: ['Magnum XL-200', 'Millennium Force', 'Steel Force', 'Goliath'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'history',
    explanation: 'Magnum XL-200 at Cedar Point (1989) was the first hypercoaster!',
  },
  {
    id: 'easy_010',
    question: 'What is a "dive coaster"?',
    options: [
      'A coaster with a vertical drop and holding brake',
      'A coaster that goes underwater',
      'A coaster at a diving center',
      'A coaster with diving loops',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'Dive coasters feature a dramatic pause at the top before a 90-degree drop.',
  },
  {
    id: 'easy_011',
    question: 'Which Six Flags park has the most coasters?',
    options: [
      'Six Flags Magic Mountain',
      'Six Flags Great Adventure',
      'Six Flags Over Texas',
      'Six Flags Great America',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'parks',
    explanation: 'Magic Mountain has 20 coasters, tied for most in the world!',
  },
  {
    id: 'easy_012',
    question: 'What is an "inversion"?',
    options: [
      'When riders go upside down',
      'When a coaster goes backwards',
      'When a coaster stops',
      'When a coaster spins',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'An inversion is any element where riders are turned upside down.',
  },
  {
    id: 'easy_013',
    question: 'Which Disney park has Space Mountain?',
    options: [
      'All of them',
      'Magic Kingdom only',
      'Disneyland only',
      'Tokyo Disneyland only',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'parks',
    explanation: 'Space Mountain exists at all Disney castle parks worldwide!',
  },
  {
    id: 'easy_014',
    question: 'What is the oldest continuously operating roller coaster?',
    options: [
      'Leap-The-Dips',
      'Jack Rabbit',
      'Scenic Railway',
      'Rutschebanen',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'history',
    explanation: 'Leap-The-Dips (1902) at Lakemont Park is the oldest operating coaster.',
  },
  {
    id: 'easy_015',
    question: 'What is a "hybrid coaster"?',
    options: [
      'Steel track on wooden structure',
      'Half wooden, half steel',
      'Two coasters combined',
      'A coaster with both loops and drops',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'Hybrid coasters feature steel I-Box track on wooden support structures.',
  },
  {
    id: 'easy_016',
    question: 'Which coaster manufacturer uses the tagline "Steel. Real."?',
    options: ['RMC', 'Intamin', 'B&M', 'Gerstlauer'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'manufacturers',
    explanation: 'RMC uses "Steel. Real." to market their hybrid steel track technology.',
  },
  {
    id: 'easy_017',
    question: 'What is Expedition Everest known for?',
    options: [
      'Going backwards through the mountain',
      'Having the most inversions',
      'Being the fastest',
      'Having the longest queue',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'parks',
    explanation: 'Expedition Everest features a thrilling backwards section in the dark!',
  },
  {
    id: 'easy_018',
    question: 'What is a "beyond vertical" drop?',
    options: [
      'A drop with an angle over 90 degrees',
      'A drop that goes underground',
      'A drop from over 200 feet',
      'A drop with a twist',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'Beyond vertical drops exceed 90 degrees, creating an overhanging sensation.',
  },
  {
    id: 'easy_019',
    question: 'Which country has the most roller coasters?',
    options: ['United States', 'China', 'Japan', 'Germany'],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'records',
    explanation: 'The US has over 800 operating roller coasters!',
  },
  {
    id: 'easy_020',
    question: 'What is a "boomerang coaster"?',
    options: [
      'A coaster that goes forwards then backwards',
      'A coaster shaped like a boomerang',
      'A coaster in Australia',
      'A coaster with curved track',
    ],
    correctIndex: 0,
    difficulty: 'easy',
    category: 'general',
    explanation: 'Boomerang coasters traverse the same track forwards and backwards.',
  },
];

/**
 * MEDIUM QUESTIONS (20 questions)
 * Focus: Specific dates, technical details, manufacturer models
 */
const mediumQuestions: TriviaQuestion[] = [
  {
    id: 'medium_001',
    question: 'What year did the first RMC hybrid coaster open?',
    options: ['2011', '2013', '2015', '2017'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'history',
    explanation: 'New Texas Giant at Six Flags Over Texas opened in 2011 as the first RMC hybrid.',
  },
  {
    id: 'medium_002',
    question: 'What is the longest roller coaster in the world?',
    options: [
      'Steel Dragon 2000',
      'The Ultimate',
      'Fury 325',
      'Millennium Force',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'Steel Dragon 2000 in Japan is 8,133 feet long!',
  },
  {
    id: 'medium_003',
    question: 'Which B&M model is known for its "flying" position?',
    options: ['Flying Coaster', 'Wing Coaster', 'Inverted', 'Floorless'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'manufacturers',
    explanation: 'B&M Flying Coasters put riders in a prone, Superman-style position.',
  },
  {
    id: 'medium_004',
    question: 'What year did Millennium Force open?',
    options: ['2000', '1999', '2001', '2002'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'history',
    explanation: 'Millennium Force opened on May 13, 2000, ushering in the new millennium.',
  },
  {
    id: 'medium_005',
    question: 'Which park opened Fury 325?',
    options: [
      'Carowinds',
      'Cedar Point',
      'Kings Island',
      'Kings Dominion',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'parks',
    explanation: 'Fury 325 opened at Carowinds in 2015 as the world\'s tallest giga coaster.',
  },
  {
    id: 'medium_006',
    question: 'What was the first Wing Coaster?',
    options: ['Raptor (Gardaland)', 'GateKeeper', 'X-Flight', 'Wild Eagle'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'history',
    explanation: 'Raptor at Gardaland in Italy (2011) was the first B&M Wing Coaster.',
  },
  {
    id: 'medium_007',
    question: 'How many inversions does Smiler have?',
    options: ['14', '12', '13', '15'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'The Smiler at Alton Towers holds the world record with 14 inversions!',
  },
  {
    id: 'medium_008',
    question: 'Which Intamin coaster uses a "top hat" element?',
    options: ['Kingda Ka', 'Millennium Force', 'I305', 'Xcelerator'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'general',
    explanation: 'Kingda Ka features a 456-foot tall top hat element.',
  },
  {
    id: 'medium_009',
    question: 'What is the steepest roller coaster drop?',
    options: [
      'TMNT Shellraiser (121.5°)',
      'Takabisha (121°)',
      'Cannibal (116°)',
      'Mumbo Jumbo (112°)',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'TMNT Shellraiser has a 121.5-degree beyond vertical drop!',
  },
  {
    id: 'medium_010',
    question: 'Which coaster type features seats on both sides of the track?',
    options: ['Wing Coaster', 'Flying Coaster', '4D Coaster', 'Inverted'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'manufacturers',
    explanation: 'Wing Coasters have seats extending to both sides with nothing above or below.',
  },
  {
    id: 'medium_011',
    question: 'What was the first 4D coaster?',
    options: ['X (later X2)', 'Eejanaika', 'Dinoconda', 'SkyScream'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'history',
    explanation: 'X opened at Six Flags Magic Mountain in 2002, later renovated to X2.',
  },
  {
    id: 'medium_012',
    question: 'Which park is home to Iron Gwazi?',
    options: [
      'Busch Gardens Tampa',
      'Busch Gardens Williamsburg',
      'SeaWorld Orlando',
      'SeaWorld San Diego',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'parks',
    explanation: 'Iron Gwazi, North America\'s tallest hybrid, is at Busch Gardens Tampa.',
  },
  {
    id: 'medium_013',
    question: 'What year did Steel Vengeance open?',
    options: ['2018', '2017', '2019', '2016'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'history',
    explanation: 'Steel Vengeance opened in 2018 as an RMC conversion of Mean Streak.',
  },
  {
    id: 'medium_014',
    question: 'Which manufacturer created the "Infinity Coaster" model?',
    options: ['Gerstlauer', 'Intamin', 'Mack Rides', 'Vekoma'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'manufacturers',
    explanation: 'Gerstlauer\'s Infinity Coaster features beyond-vertical drops and hangtime.',
  },
  {
    id: 'medium_015',
    question: 'How tall is Top Thrill 2 (formerly Dragster)?',
    options: ['420 feet', '456 feet', '400 feet', '415 feet'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'Top Thrill 2 stands 420 feet tall with new swing launch system.',
  },
  {
    id: 'medium_016',
    question: 'Which coaster has the most airtime?',
    options: [
      'Steel Vengeance',
      'Fury 325',
      'Voyage',
      'Skyrush',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'Steel Vengeance features approximately 27.2 seconds of airtime!',
  },
  {
    id: 'medium_017',
    question: 'What is Velocicoaster\'s top speed?',
    options: ['70 mph', '65 mph', '75 mph', '68 mph'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'Velocicoaster at Universal\'s Islands of Adventure reaches 70 mph.',
  },
  {
    id: 'medium_018',
    question: 'Which park has both Twisted Colossus and X2?',
    options: [
      'Six Flags Magic Mountain',
      'Six Flags Great Adventure',
      'Cedar Point',
      'Kings Island',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'parks',
    explanation: 'Both iconic coasters are at Six Flags Magic Mountain in California.',
  },
  {
    id: 'medium_019',
    question: 'What type of launch does VelociCoaster use?',
    options: ['LSM', 'Hydraulic', 'Pneumatic', 'Flywheel'],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'general',
    explanation: 'VelociCoaster uses Linear Synchronous Motor (LSM) technology.',
  },
  {
    id: 'medium_020',
    question: 'Which wooden coaster is the tallest in the world?',
    options: [
      'T Express',
      'Son of Beast',
      'The Voyage',
      'El Toro',
    ],
    correctIndex: 0,
    difficulty: 'medium',
    category: 'records',
    explanation: 'T Express in South Korea stands at 183.8 feet tall!',
  },
];

/**
 * HARD QUESTIONS (15 questions)
 * Focus: Obscure facts, precise specifications, deep knowledge
 */
const hardQuestions: TriviaQuestion[] = [
  {
    id: 'hard_001',
    question: 'What is the longest wooden roller coaster ever built?',
    options: [
      'The Beast',
      'Son of Beast',
      'The Voyage',
      'American Eagle',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'records',
    explanation: 'The Beast at Kings Island is 7,359 feet long and still operating since 1979!',
  },
  {
    id: 'hard_002',
    question: 'Which coaster was the first to use a cable lift hill?',
    options: [
      'Millennium Force',
      'Expedition GeForce',
      'Goliath (SFMM)',
      'Steel Dragon 2000',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'history',
    explanation: 'Millennium Force pioneered the cable lift system in 2000.',
  },
  {
    id: 'hard_003',
    question: 'How many RMC Raptors (single-rail) exist worldwide?',
    options: ['4', '3', '5', '6'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'manufacturers',
    explanation: 'As of 2024: Wonder Woman (TX & NJ), Railblazer, and Jersey Devil.',
  },
  {
    id: 'hard_004',
    question: 'What was Intimidator 305 originally called in development?',
    options: [
      'Intimidator',
      'Project 305',
      'Dale\'s Revenge',
      'The Intimidator',
    ],
    correctIndex: 1,
    difficulty: 'hard',
    category: 'history',
    explanation: 'Kings Dominion referred to I305 as "Project 305" during construction.',
  },
  {
    id: 'hard_005',
    question: 'Which park removed the most roller coasters in one year?',
    options: [
      'Six Flags Great Adventure',
      'Cedar Point',
      'Six Flags Magic Mountain',
      'Geauga Lake',
    ],
    correctIndex: 3,
    difficulty: 'hard',
    category: 'parks',
    explanation: 'Geauga Lake closed in 2007, removing 7 coasters in one season.',
  },
  {
    id: 'hard_006',
    question: 'What is the vertical G-force on Intimidator 305\'s first turn?',
    options: ['5.0 Gs', '4.5 Gs', '5.5 Gs', '4.0 Gs'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'records',
    explanation: 'I305\'s first turn pulls approximately 5.0 Gs - intense for a coaster!',
  },
  {
    id: 'hard_007',
    question: 'Which manufacturer built Son of Beast?',
    options: [
      'Roller Coaster Corporation of America',
      'Great Coasters International',
      'Custom Coasters International',
      'Premier Rides',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'manufacturers',
    explanation: 'RCCA built Son of Beast, which operated from 2000-2012.',
  },
  {
    id: 'hard_008',
    question: 'What year was the original Top Thrill Dragster first modified?',
    options: ['2004', '2003', '2005', '2006'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'history',
    explanation: 'TTD received modifications in 2004 to improve reliability after its 2003 debut.',
  },
  {
    id: 'hard_009',
    question: 'Which coaster has the longest single drop?',
    options: [
      'Fury 325',
      'Millennium Force',
      'Steel Dragon 2000',
      'Kingda Ka',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'records',
    explanation: 'Fury 325\'s first drop is 325 feet long at an 81-degree angle.',
  },
  {
    id: 'hard_010',
    question: 'What was the first B&M Dive Coaster?',
    options: [
      'Oblivion',
      'SheiKra',
      'Griffon',
      'Valravn',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'history',
    explanation: 'Oblivion at Alton Towers opened in 1998 as the world\'s first dive coaster.',
  },
  {
    id: 'hard_011',
    question: 'How many trains can Steel Vengeance run at once?',
    options: ['3', '2', '4', '5'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'general',
    explanation: 'Steel Vengeance can operate 3 trains for maximum capacity.',
  },
  {
    id: 'hard_012',
    question: 'Which country manufactured the first modern looping coaster?',
    options: ['Germany', 'United States', 'Netherlands', 'Switzerland'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'history',
    explanation: 'Germany\'s Anton Schwarzkopf designed the first modern looping coasters in 1975.',
  },
  {
    id: 'hard_013',
    question: 'What is the maximum g-force rating on Formula Rossa?',
    options: ['4.8 Gs', '5.2 Gs', '4.5 Gs', '5.0 Gs'],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'records',
    explanation: 'Formula Rossa pulls up to 4.8 Gs during its high-speed elements.',
  },
  {
    id: 'hard_014',
    question: 'Which defunct coaster had the most inversions?',
    options: [
      'Son of Beast (with loop)',
      'Colossus (Thorpe Park)',
      'Dragon Khan',
      'Vortex (Kings Island)',
    ],
    correctIndex: 1,
    difficulty: 'hard',
    category: 'history',
    explanation: 'Colossus had 10 inversions before being converted to The Walking Dead: The Ride.',
  },
  {
    id: 'hard_015',
    question: 'What material is RMC\'s I-Box track made from?',
    options: [
      'Steel with a topper',
      'Pure steel',
      'Steel and wood composite',
      'Reinforced iron',
    ],
    correctIndex: 0,
    difficulty: 'hard',
    category: 'manufacturers',
    explanation: 'RMC I-Box uses steel I-beam track with a steel top layer.',
  },
];

/**
 * Combined question pool
 */
export const ALL_QUESTIONS: TriviaQuestion[] = [
  ...easyQuestions,
  ...mediumQuestions,
  ...hardQuestions,
];

/**
 * Get questions by difficulty
 */
export function getQuestionsByDifficulty(
  difficulty: 'easy' | 'medium' | 'hard'
): TriviaQuestion[] {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty);
}

/**
 * Get random question by difficulty (excluding already used IDs)
 */
export function getRandomQuestion(
  difficulty: 'easy' | 'medium' | 'hard',
  excludeIds: string[] = []
): TriviaQuestion {
  const availableQuestions = getQuestionsByDifficulty(difficulty).filter(
    (q) => !excludeIds.includes(q.id)
  );

  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}
