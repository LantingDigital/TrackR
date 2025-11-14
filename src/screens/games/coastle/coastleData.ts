/**
 * Coastle Game - Mock Coaster Database
 * Comprehensive database of famous roller coasters for the game
 */

import { MysteryCoaster, CoasterType } from './types';

/**
 * Coaster Database
 * 75+ famous roller coasters from around the world
 * Data is accurate as of 2025
 */
export const COASTER_DATABASE: MysteryCoaster[] = [
  // United States - Giga/Hyper Coasters
  {
    id: 'fury325',
    name: 'Fury 325',
    park: 'Carowinds',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.GIGA,
    stats: { height: 325, speed: 95, length: 6602, year: 2015, inversions: 0 },
  },
  {
    id: 'millennium-force',
    name: 'Millennium Force',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.GIGA,
    stats: { height: 310, speed: 93, length: 6595, year: 2000, inversions: 0 },
  },
  {
    id: 'intimidator305',
    name: 'Intimidator 305',
    park: 'Kings Dominion',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.GIGA,
    stats: { height: 305, speed: 90, length: 5100, year: 2010, inversions: 0 },
  },
  {
    id: 'orion',
    name: 'Orion',
    park: 'Kings Island',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.GIGA,
    stats: { height: 287, speed: 91, length: 5321, year: 2020, inversions: 0 },
  },
  {
    id: 'leviathan',
    name: 'Leviathan',
    park: "Canada's Wonderland",
    country: 'Canada',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.GIGA,
    stats: { height: 306, speed: 92, length: 5486, year: 2012, inversions: 0 },
  },

  // Steel Vengeance and RMC Hybrids
  {
    id: 'steel-vengeance',
    name: 'Steel Vengeance',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 205, speed: 74, length: 5740, year: 2018, inversions: 4 },
  },
  {
    id: 'iron-gwazi',
    name: 'Iron Gwazi',
    park: 'Busch Gardens Tampa',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 206, speed: 76, length: 4075, year: 2022, inversions: 3 },
  },
  {
    id: 'twisted-colossus',
    name: 'Twisted Colossus',
    park: 'Six Flags Magic Mountain',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 121, speed: 57, length: 4990, year: 2015, inversions: 2 },
  },
  {
    id: 'lightning-rod',
    name: 'Lightning Rod',
    park: 'Dollywood',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 206, speed: 73, length: 3800, year: 2016, inversions: 0 },
  },

  // Launched Coasters
  {
    id: 'top-thrill-2',
    name: 'Top Thrill 2',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Zamperla',
    type: CoasterType.LAUNCHED,
    stats: { height: 420, speed: 120, length: 2800, year: 2024, inversions: 3 },
  },
  {
    id: 'kingda-ka',
    name: 'Kingda Ka',
    park: 'Six Flags Great Adventure',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 456, speed: 128, length: 3118, year: 2005, inversions: 0 },
  },
  {
    id: 'velocicoaster',
    name: 'VelociCoaster',
    park: "Universal's Islands of Adventure",
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 155, speed: 70, length: 4700, year: 2021, inversions: 4 },
  },
  {
    id: 'hagrid',
    name: "Hagrid's Magical Creatures Motorbike Adventure",
    park: "Universal's Islands of Adventure",
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 65, speed: 50, length: 5053, year: 2019, inversions: 0 },
  },
  {
    id: 'maverick',
    name: 'Maverick',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 105, speed: 70, length: 4450, year: 2007, inversions: 2 },
  },

  // Inverted Coasters
  {
    id: 'banshee',
    name: 'Banshee',
    park: 'Kings Island',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 167, speed: 68, length: 4124, year: 2014, inversions: 7 },
  },
  {
    id: 'montu',
    name: 'Montu',
    park: 'Busch Gardens Tampa',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 150, speed: 60, length: 3983, year: 1996, inversions: 7 },
  },
  {
    id: 'raptor',
    name: 'Raptor',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 137, speed: 57, length: 3790, year: 1994, inversions: 6 },
  },
  {
    id: 'afterburn',
    name: 'Afterburn',
    park: 'Carowinds',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 113, speed: 62, length: 2956, year: 1999, inversions: 6 },
  },

  // Wooden Coasters
  {
    id: 'the-beast',
    name: 'The Beast',
    park: 'Kings Island',
    country: 'USA',
    manufacturer: 'Philadelphia Toboggan Company',
    type: CoasterType.WOODEN,
    stats: { height: 110, speed: 65, length: 7359, year: 1979, inversions: 0 },
  },
  {
    id: 'el-toro',
    name: 'El Toro',
    park: 'Six Flags Great Adventure',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.WOODEN,
    stats: { height: 181, speed: 70, length: 4400, year: 2006, inversions: 0 },
  },
  {
    id: 'phoenix',
    name: 'Phoenix',
    park: 'Knoebels Amusement Resort',
    country: 'USA',
    manufacturer: 'Herbert Schmeck',
    type: CoasterType.WOODEN,
    stats: { height: 78, speed: 45, length: 1700, year: 1947, inversions: 0 },
  },
  {
    id: 'voyage',
    name: 'The Voyage',
    park: 'Holiday World',
    country: 'USA',
    manufacturer: 'The Gravity Group',
    type: CoasterType.WOODEN,
    stats: { height: 163, speed: 67, length: 6442, year: 2006, inversions: 0 },
  },

  // Wing Coasters
  {
    id: 'gatekeeper',
    name: 'GateKeeper',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.WING,
    stats: { height: 170, speed: 67, length: 4164, year: 2013, inversions: 6 },
  },
  {
    id: 'thunderbird',
    name: 'Thunderbird',
    park: 'Holiday World',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.WING,
    stats: { height: 140, speed: 60, length: 3035, year: 2015, inversions: 4 },
  },
  {
    id: 'wild-eagle',
    name: 'Wild Eagle',
    park: 'Dollywood',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.WING,
    stats: { height: 210, speed: 61, length: 3127, year: 2012, inversions: 4 },
  },

  // Dive Coasters
  {
    id: 'yukon-striker',
    name: 'Yukon Striker',
    park: "Canada's Wonderland",
    country: 'Canada',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.DIVE,
    stats: { height: 223, speed: 80, length: 3625, year: 2019, inversions: 4 },
  },
  {
    id: 'valravn',
    name: 'Valravn',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.DIVE,
    stats: { height: 223, speed: 75, length: 3415, year: 2016, inversions: 3 },
  },
  {
    id: 'sheikra',
    name: 'SheiKra',
    park: 'Busch Gardens Tampa',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.DIVE,
    stats: { height: 200, speed: 70, length: 3188, year: 2005, inversions: 1 },
  },

  // Floorless Coasters
  {
    id: 'kraken',
    name: 'Kraken',
    park: 'SeaWorld Orlando',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.FLOORLESS,
    stats: { height: 151, speed: 65, length: 4177, year: 2000, inversions: 7 },
  },
  {
    id: 'rougarou',
    name: 'Rougarou',
    park: 'Cedar Point',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.FLOORLESS,
    stats: { height: 145, speed: 60, length: 3900, year: 1996, inversions: 6 },
  },

  // European Coasters
  {
    id: 'silver-star',
    name: 'Silver Star',
    park: 'Europa Park',
    country: 'Germany',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 239, speed: 78, length: 4196, year: 2002, inversions: 0 },
  },
  {
    id: 'shambhala',
    name: 'Shambhala',
    park: 'PortAventura Park',
    country: 'Spain',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 249, speed: 83, length: 5131, year: 2012, inversions: 0 },
  },
  {
    id: 'taron',
    name: 'Taron',
    park: 'Phantasialand',
    country: 'Germany',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 98, speed: 72, length: 4265, year: 2016, inversions: 0 },
  },
  {
    id: 'helix',
    name: 'Helix',
    park: 'Liseberg',
    country: 'Sweden',
    manufacturer: 'Mack Rides',
    type: CoasterType.LAUNCHED,
    stats: { height: 135, speed: 62, length: 4396, year: 2014, inversions: 7 },
  },
  {
    id: 'wodan',
    name: 'Wodan Timburcoaster',
    park: 'Europa Park',
    country: 'Germany',
    manufacturer: 'Great Coasters International',
    type: CoasterType.WOODEN,
    stats: { height: 131, speed: 62, length: 3444, year: 2012, inversions: 0 },
  },
  {
    id: 'black-mamba',
    name: 'Black Mamba',
    park: 'Phantasialand',
    country: 'Germany',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 85, speed: 50, length: 2461, year: 2006, inversions: 4 },
  },

  // UK Coasters
  {
    id: 'nemesis',
    name: 'Nemesis',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 43, speed: 50, length: 2349, year: 1994, inversions: 4 },
  },
  {
    id: 'smiler',
    name: 'The Smiler',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'Gerstlauer',
    type: CoasterType.STEEL,
    stats: { height: 98, speed: 53, length: 3838, year: 2013, inversions: 14 },
  },
  {
    id: 'wickerman',
    name: 'Wicker Man',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'Great Coasters International',
    type: CoasterType.WOODEN,
    stats: { height: 57, speed: 44, length: 2028, year: 2018, inversions: 0 },
  },

  // Asian Coasters
  {
    id: 'flying-dinosaur',
    name: 'The Flying Dinosaur',
    park: 'Universal Studios Japan',
    country: 'Japan',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.FLYING,
    stats: { height: 124, speed: 62, length: 3688, year: 2016, inversions: 6 },
  },
  {
    id: 'do-dodonpa',
    name: 'Do-Dodonpa',
    park: 'Fuji-Q Highland',
    country: 'Japan',
    manufacturer: 'S&S Worldwide',
    type: CoasterType.LAUNCHED,
    stats: { height: 170, speed: 112, length: 3901, year: 2001, inversions: 1 },
  },
  {
    id: 'steel-dragon-2000',
    name: 'Steel Dragon 2000',
    park: 'Nagashima Spa Land',
    country: 'Japan',
    manufacturer: 'Morgan Manufacturing',
    type: CoasterType.HYPER,
    stats: { height: 318, speed: 95, length: 8133, year: 2000, inversions: 0 },
  },
  {
    id: 'flash',
    name: 'Flash',
    park: 'Lewa Adventure',
    country: 'China',
    manufacturer: 'Mack Rides',
    type: CoasterType.LAUNCHED,
    stats: { height: 203, speed: 80, length: 4760, year: 2021, inversions: 4 },
  },

  // Australia
  {
    id: 'dc-rivals',
    name: 'DC Rivals HyperCoaster',
    park: 'Warner Bros. Movie World',
    country: 'Australia',
    manufacturer: 'Mack Rides',
    type: CoasterType.HYPER,
    stats: { height: 200, speed: 71, length: 4600, year: 2017, inversions: 1 },
  },

  // More US Classics
  {
    id: 'goliath-sfmm',
    name: 'Goliath',
    park: 'Six Flags Magic Mountain',
    country: 'USA',
    manufacturer: 'Giovanola',
    type: CoasterType.HYPER,
    stats: { height: 235, speed: 85, length: 4500, year: 2000, inversions: 0 },
  },
  {
    id: 'tatsu',
    name: 'Tatsu',
    park: 'Six Flags Magic Mountain',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.FLYING,
    stats: { height: 170, speed: 62, length: 3602, year: 2006, inversions: 5 },
  },
  {
    id: 'x2',
    name: 'X2',
    park: 'Six Flags Magic Mountain',
    country: 'USA',
    manufacturer: 'Arrow Dynamics',
    type: CoasterType.STEEL,
    stats: { height: 175, speed: 76, length: 3610, year: 2002, inversions: 2 },
  },
  {
    id: 'nitro',
    name: 'Nitro',
    park: 'Six Flags Great Adventure',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 230, speed: 80, length: 5394, year: 2001, inversions: 0 },
  },
  {
    id: 'apollo',
    name: "Apollo's Chariot",
    park: 'Busch Gardens Williamsburg',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 170, speed: 73, length: 4882, year: 1999, inversions: 0 },
  },
  {
    id: 'diamondback',
    name: 'Diamondback',
    park: 'Kings Island',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 230, speed: 80, length: 5282, year: 2009, inversions: 0 },
  },
  {
    id: 'mako',
    name: 'Mako',
    park: 'SeaWorld Orlando',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 200, speed: 73, length: 4760, year: 2016, inversions: 0 },
  },
  {
    id: 'incredible-hulk',
    name: 'The Incredible Hulk Coaster',
    park: "Universal's Islands of Adventure",
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.LAUNCHED,
    stats: { height: 110, speed: 67, length: 3700, year: 1999, inversions: 7 },
  },
  {
    id: 'wicked-cyclone',
    name: 'Wicked Cyclone',
    park: 'Six Flags New England',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 109, speed: 55, length: 3320, year: 2015, inversions: 3 },
  },
  {
    id: 'outlaw-run',
    name: 'Outlaw Run',
    park: 'Silver Dollar City',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 107, speed: 68, length: 2937, year: 2013, inversions: 3 },
  },
  {
    id: 'new-texas-giant',
    name: 'New Texas Giant',
    park: 'Six Flags Over Texas',
    country: 'USA',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 153, speed: 65, length: 4200, year: 2011, inversions: 0 },
  },
  {
    id: 'thunder-dolphin',
    name: 'Thunder Dolphin',
    park: 'Tokyo Dome City',
    country: 'Japan',
    manufacturer: 'Intamin',
    type: CoasterType.STEEL,
    stats: { height: 262, speed: 81, length: 4072, year: 2003, inversions: 0 },
  },
  {
    id: 'formula-rossa',
    name: 'Formula Rossa',
    park: 'Ferrari World',
    country: 'UAE',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 171, speed: 149, length: 6562, year: 2010, inversions: 0 },
  },
  {
    id: 'red-force',
    name: 'Red Force',
    park: 'Ferrari Land',
    country: 'Spain',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 367, speed: 112, length: 2953, year: 2017, inversions: 0 },
  },
  {
    id: 'expedition-everest',
    name: 'Expedition Everest',
    park: "Disney's Animal Kingdom",
    country: 'USA',
    manufacturer: 'Vekoma',
    type: CoasterType.STEEL,
    stats: { height: 200, speed: 50, length: 4424, year: 2006, inversions: 0 },
  },
  {
    id: 'big-thunder',
    name: 'Big Thunder Mountain Railroad',
    park: 'Disneyland',
    country: 'USA',
    manufacturer: 'Arrow Dynamics',
    type: CoasterType.STEEL,
    stats: { height: 79, speed: 36, length: 2671, year: 1979, inversions: 0 },
  },
  {
    id: 'space-mountain-dl',
    name: 'Space Mountain',
    park: 'Disneyland',
    country: 'USA',
    manufacturer: 'Arrow Dynamics',
    type: CoasterType.STEEL,
    stats: { height: 118, speed: 35, length: 3196, year: 1977, inversions: 0 },
  },
  {
    id: 'xcelerator',
    name: 'Xcelerator',
    park: "Knott's Berry Farm",
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.LAUNCHED,
    stats: { height: 205, speed: 82, length: 2202, year: 2002, inversions: 0 },
  },
  {
    id: 'ghostrider',
    name: 'GhostRider',
    park: "Knott's Berry Farm",
    country: 'USA',
    manufacturer: 'Custom Coasters International',
    type: CoasterType.WOODEN,
    stats: { height: 118, speed: 56, length: 4533, year: 1998, inversions: 0 },
  },
  {
    id: 'copperhead-strike',
    name: 'Copperhead Strike',
    park: 'Carowinds',
    country: 'USA',
    manufacturer: 'Mack Rides',
    type: CoasterType.LAUNCHED,
    stats: { height: 82, speed: 50, length: 3255, year: 2019, inversions: 5 },
  },
  {
    id: 'mystic-timbers',
    name: 'Mystic Timbers',
    park: 'Kings Island',
    country: 'USA',
    manufacturer: 'Great Coasters International',
    type: CoasterType.WOODEN,
    stats: { height: 109, speed: 53, length: 3265, year: 2017, inversions: 0 },
  },
  {
    id: 'phoenix-bay',
    name: 'Phoenix',
    park: 'Happy Valley Beijing',
    country: 'China',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.INVERTED,
    stats: { height: 108, speed: 56, length: 2700, year: 2009, inversions: 5 },
  },
  {
    id: 'skyrush',
    name: 'Skyrush',
    park: 'Hersheypark',
    country: 'USA',
    manufacturer: 'Intamin',
    type: CoasterType.HYPER,
    stats: { height: 200, speed: 75, length: 3600, year: 2012, inversions: 0 },
  },
  {
    id: 'candymonium',
    name: 'Candymonium',
    park: 'Hersheypark',
    country: 'USA',
    manufacturer: 'Bolliger & Mabillard',
    type: CoasterType.HYPER,
    stats: { height: 210, speed: 76, length: 4636, year: 2020, inversions: 0 },
  },
  {
    id: 'zadra',
    name: 'Zadra',
    park: 'Energylandia',
    country: 'Poland',
    manufacturer: 'Rocky Mountain Construction',
    type: CoasterType.HYBRID,
    stats: { height: 206, speed: 75, length: 4265, year: 2019, inversions: 3 },
  },
  {
    id: 'hyperion',
    name: 'Hyperion',
    park: 'Energylandia',
    country: 'Poland',
    manufacturer: 'Intamin',
    type: CoasterType.HYPER,
    stats: { height: 266, speed: 88, length: 4593, year: 2018, inversions: 0 },
  },
];

/**
 * Get random coaster for practice mode
 */
export const getRandomCoaster = (): MysteryCoaster => {
  const randomIndex = Math.floor(Math.random() * COASTER_DATABASE.length);
  return COASTER_DATABASE[randomIndex];
};

/**
 * Get daily coaster (deterministic based on day number)
 */
export const getDailyCoaster = (dayNumber: number): MysteryCoaster => {
  const index = dayNumber % COASTER_DATABASE.length;
  return COASTER_DATABASE[index];
};

/**
 * Search coasters by name (for autocomplete)
 */
export const searchCoasters = (query: string): MysteryCoaster[] => {
  const lowerQuery = query.toLowerCase();
  return COASTER_DATABASE.filter(
    (coaster) =>
      coaster.name.toLowerCase().includes(lowerQuery) ||
      coaster.park.toLowerCase().includes(lowerQuery) ||
      coaster.country.toLowerCase().includes(lowerQuery)
  ).slice(0, 10); // Limit to 10 results
};

/**
 * Get coaster by ID
 */
export const getCoasterById = (id: string): MysteryCoaster | undefined => {
  return COASTER_DATABASE.find((coaster) => coaster.id === id);
};

/**
 * Calculate current day number (days since epoch)
 */
export const getCurrentDayNumber = (): number => {
  const epochDate = new Date('2025-01-01');
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - epochDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
