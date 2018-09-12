import { Race } from "./race";

const Dwarf = { 
  name: 'dwarf', 
  isClanBased: true, 
  keys: ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'] 
} as Race;

const Gnome = { 
  name: 'gnome', 
  isClanBased: true, 
  keys: ['g', 'gnome', 'gnomish'] 
} as Race;

const Halfling = { 
  name: 'halfling', 
  isClanBased: true, 
  keys: ['h', 'halfling', 'hobbit', 'kender'] 
} as Race;

const Dragonborn = { 
  name: 'dragonborn', 
  isClanBased: true, 
  keys: ['dragon', 'dragonborn', 'dragonborne', 'dragonfolk', 'drag', 'drgn'] 
} as Race;

const Orc = { 
  name: 'orc', 
  isClanBased: true, 
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
  name: 'Tiefling', 
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

export class RaceFactory {

  getRace(key: string): Race {
    const selected = RaceArray.find((r: Race) => r.keys.includes(key));
    if(!selected)
      throw 'race not found, oh dear this shouldn\'t happen';
    return selected;
  }
}


export { Races, RaceArray, RaceKeys };