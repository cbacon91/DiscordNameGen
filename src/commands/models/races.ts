import { Race } from "./race";

const Dwarf = { 
  name: 'dwarf', 
  keys: ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'] 
} as Race;

const Gnome = { 
  name: 'gnome', 
  keys: ['g', 'gnome', 'gnomish'] 
} as Race;

const Halfling = { 
  name: 'halfling', 
  keys: ['h', 'halfling', 'hobbit', 'kender'] 
} as Race;

const Dragonborn = { 
  name: 'dragonborn', 
  keys: ['dragon', 'dragonborn', 'dragonborne', 'dragonfolk', 'drag', 'drgn'] 
} as Race;

const Orc = { 
  name: 'orc', 
  keys: ['o', 'orc', 'ork', 'orcish', 'orkish'] 
} as Race;

const Elf = { 
  name: 'elf', 
  keys: ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'] 
} as Race;

// TODO: Different "races", see xanathar's guide
const Human = { 
  name: 'human', 
  keys: ['human', 'person', 's', 'standard', 'n', 'normal'] 
} as Race;

const Tiefling = { 
  name: 'tiefling', 
  lacksSurname: true, 
  keys: ['t', 'tiefling', 'fiend', 'abyssal', 'demon', 'daemon', 'devil'] 
} as Race;

const Virtue = { 
  name: 'virtue', 
  lacksSurname: true, 
  isGenderless: true, 
  keys: ['virtue', 'v', 'virtuous', 'sin'] 
} as Race;

const Races = { Dwarf, Gnome, Halfling, Dragonborn, Orc, Elf, Human, Tiefling, Virtue };
const RaceArray = [Dwarf, Gnome, Halfling, Dragonborn, Orc, Elf, Human, Tiefling, Virtue];
let RaceKeys: string[] = [];
RaceArray.forEach((r: Race) => RaceKeys = RaceKeys.concat(r.keys));

export { Races, RaceArray, RaceKeys };