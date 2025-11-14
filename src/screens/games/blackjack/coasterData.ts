/**
 * Higher or Lower - Coaster Database
 * 40+ real coasters with accurate stats for gameplay
 */

import { CoasterData } from './types';

/**
 * Complete coaster database with all stats
 * Stats are real values from actual roller coasters
 */
export const COASTER_DATABASE: CoasterData[] = [
  // Tallest & Fastest
  { id: 'kingda-ka', name: 'Kingda Ka', height: 456, speed: 128, inversions: 0, year: 2005, park: 'Six Flags Great Adventure', country: 'USA' },
  { id: 'top-thrill-2', name: 'Top Thrill 2', height: 420, speed: 120, inversions: 3, year: 2024, park: 'Cedar Point', country: 'USA' },
  { id: 'red-force', name: 'Red Force', height: 367, speed: 112, inversions: 0, year: 2017, park: 'FerrariLand', country: 'Spain' },
  { id: 'fury-325', name: 'Fury 325', height: 325, speed: 95, inversions: 0, year: 2015, park: 'Carowinds', country: 'USA' },
  { id: 'formula-rossa', name: 'Formula Rossa', height: 171, speed: 149, inversions: 0, year: 2010, park: 'Ferrari World', country: 'UAE' },

  // Giga & Strata Coasters
  { id: 'millennium-force', name: 'Millennium Force', height: 310, speed: 93, inversions: 0, year: 2000, park: 'Cedar Point', country: 'USA' },
  { id: 'intimidator-305', name: 'Intimidator 305', height: 305, speed: 90, inversions: 0, year: 2010, park: 'Kings Dominion', country: 'USA' },
  { id: 'leviathan', name: 'Leviathan', height: 306, speed: 92, inversions: 0, year: 2012, park: 'Canada\'s Wonderland', country: 'Canada' },
  { id: 'orion', name: 'Orion', height: 287, speed: 91, inversions: 0, year: 2020, park: 'Kings Island', country: 'USA' },
  { id: 'red-hot-steel', name: 'Steel Dragon 2000', height: 318, speed: 95, inversions: 0, year: 2000, park: 'Nagashima Spa Land', country: 'Japan' },

  // Hyper Coasters
  { id: 'nitro', name: 'Nitro', height: 230, speed: 80, inversions: 0, year: 2001, park: 'Six Flags Great Adventure', country: 'USA' },
  { id: 'mako', name: 'Mako', height: 200, speed: 73, inversions: 0, year: 2016, park: 'SeaWorld Orlando', country: 'USA' },
  { id: 'diamondback', name: 'Diamondback', height: 230, speed: 80, inversions: 0, year: 2009, park: 'Kings Island', country: 'USA' },
  { id: 'goliath-sfmm', name: 'Goliath', height: 255, speed: 85, inversions: 0, year: 2000, park: 'Six Flags Magic Mountain', country: 'USA' },
  { id: 'behemoth', name: 'Behemoth', height: 230, speed: 77, inversions: 0, year: 2008, park: 'Canada\'s Wonderland', country: 'Canada' },

  // Hybrid Coasters (RMC)
  { id: 'steel-vengeance', name: 'Steel Vengeance', height: 205, speed: 74, inversions: 4, year: 2018, park: 'Cedar Point', country: 'USA' },
  { id: 'iron-gwazi', name: 'Iron Gwazi', height: 206, speed: 76, inversions: 3, year: 2022, park: 'Busch Gardens Tampa', country: 'USA' },
  { id: 'twisted-colossus', name: 'Twisted Colossus', height: 121, speed: 57, inversions: 2, year: 2015, park: 'Six Flags Magic Mountain', country: 'USA' },
  { id: 'hakugei', name: 'Hakugei', height: 177, speed: 62, inversions: 3, year: 2019, park: 'Nagashima Spa Land', country: 'Japan' },
  { id: 'zadra', name: 'Zadra', height: 203, speed: 75, inversions: 3, year: 2019, park: 'Energylandia', country: 'Poland' },

  // Intense Inverted Coasters
  { id: 'montu', name: 'Montu', height: 150, speed: 60, inversions: 7, year: 1996, park: 'Busch Gardens Tampa', country: 'USA' },
  { id: 'alpengeist', name: 'Alpengeist', height: 195, speed: 67, inversions: 6, year: 1997, park: 'Busch Gardens Williamsburg', country: 'USA' },
  { id: 'banshee', name: 'Banshee', height: 167, speed: 68, inversions: 7, year: 2014, park: 'Kings Island', country: 'USA' },
  { id: 'raptor', name: 'Raptor', height: 137, speed: 57, inversions: 6, year: 1994, park: 'Cedar Point', country: 'USA' },
  { id: 'batman-sfga', name: 'Batman The Ride', height: 100, speed: 50, inversions: 5, year: 1992, park: 'Six Flags Great America', country: 'USA' },

  // Modern Launches
  { id: 'velocicoaster', name: 'VelociCoaster', height: 155, speed: 70, inversions: 4, year: 2021, park: 'Universal Orlando', country: 'USA' },
  { id: 'maverick', name: 'Maverick', height: 105, speed: 70, inversions: 2, year: 2007, park: 'Cedar Point', country: 'USA' },
  { id: 'copperhead-strike', name: 'Copperhead Strike', height: 82, speed: 42, inversions: 5, year: 2019, park: 'Carowinds', country: 'USA' },
  { id: 'taron', name: 'Taron', height: 98, speed: 73, inversions: 0, year: 2016, park: 'Phantasialand', country: 'Germany' },
  { id: 'lightning-rod', name: 'Lightning Rod', height: 206, speed: 73, inversions: 0, year: 2016, park: 'Dollywood', country: 'USA' },

  // Classic Woodies
  { id: 'phoenix', name: 'Phoenix', height: 78, speed: 45, inversions: 0, year: 1985, park: 'Knoebels', country: 'USA' },
  { id: 'voyage', name: 'The Voyage', height: 163, speed: 67, inversions: 0, year: 2006, park: 'Holiday World', country: 'USA' },
  { id: 'beast', name: 'The Beast', height: 110, speed: 65, inversions: 0, year: 1979, park: 'Kings Island', country: 'USA' },
  { id: 'el-toro', name: 'El Toro', height: 181, speed: 70, inversions: 0, year: 2006, park: 'Six Flags Great Adventure', country: 'USA' },
  { id: 'thunderbolt', name: 'Thunderbolt', height: 95, speed: 55, inversions: 0, year: 1968, park: 'Kennywood', country: 'USA' },

  // Family/Theme Park Coasters
  { id: 'big-thunder', name: 'Big Thunder Mountain', height: 104, speed: 36, inversions: 0, year: 1979, park: 'Disneyland', country: 'USA' },
  { id: 'space-mountain', name: 'Space Mountain', height: 90, speed: 28, inversions: 0, year: 1975, park: 'Magic Kingdom', country: 'USA' },
  { id: 'seven-dwarfs', name: 'Seven Dwarfs Mine Train', height: 46, speed: 34, inversions: 0, year: 2014, park: 'Magic Kingdom', country: 'USA' },
  { id: 'slinky-dog', name: 'Slinky Dog Dash', height: 50, speed: 40, inversions: 0, year: 2018, park: 'Disney Hollywood Studios', country: 'USA' },
  { id: 'hagrid', name: 'Hagrid\'s Motorbike Adventure', height: 65, speed: 50, inversions: 0, year: 2019, park: 'Universal Orlando', country: 'USA' },

  // Unique & Record Breakers
  { id: 'smiler', name: 'The Smiler', height: 98, speed: 53, inversions: 14, year: 2013, park: 'Alton Towers', country: 'UK' },
  { id: 'takabisha', name: 'Takabisha', height: 141, speed: 62, inversions: 7, year: 2011, park: 'Fuji-Q Highland', country: 'Japan' },
  { id: 'eejanaika', name: 'Eejanaika', height: 249, speed: 78, inversions: 14, year: 2006, park: 'Fuji-Q Highland', country: 'Japan' },
];

/**
 * Get random coaster from database, excluding recent picks
 */
export function getRandomCoaster(excludeIds: string[]): CoasterData {
  // Filter out recently used coasters
  const availableCoasters = COASTER_DATABASE.filter(
    coaster => !excludeIds.includes(coaster.id)
  );

  // If we've used too many, reset and only exclude the last few
  const coastersToUse = availableCoasters.length > 0
    ? availableCoasters
    : COASTER_DATABASE.filter(coaster => !excludeIds.slice(-5).includes(coaster.id));

  // Get random coaster
  const randomIndex = Math.floor(Math.random() * coastersToUse.length);
  return coastersToUse[randomIndex];
}
