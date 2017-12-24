// race consts
const Dwarf = { name: 'dwarf', isClanBased: true, keys: ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'] };
const Gnome = { name: 'gnome', isClanBased: true, keys: ['g', 'gnome', 'gnomish'] };
const Halfling = { name: 'halfling', isClanBased: true, keys: ['h', 'halfling', 'hobbit', 'kender'] };
const Dragonborn = { name: 'dragonborn', isClanBased: true, keys: ['dragon', 'dragonborn', 'dragonborne', 'dragonfolk', 'drag', 'drgn'] };
const Orc = { name: 'orc', isClanBased: true, keys: ['o', 'orc', 'ork', 'orcish', 'orkish'] };
const Elf = { name: 'elf', keys: ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'] };
const Human = { name: 'human', keys: ['human', 'person', 's', 'standard', 'n', 'normal'] };
const Tiefling = { name: 'tiefling', lacksSurname: true, keys: ['t', 'tiefling', 'fiend', 'abyssal', 'demon', 'daemon', 'devil'] };
const Virtue = { name: 'virtue', lacksSurname: true, isGenderless: true, keys: ['virtue', 'v', 'virtuous', 'sin'] };

// Races exists as its own object to make adding new races easy
// adding a new race just requires adding it to this object and the constants above
// the factory and keyList below will handle the heavy lifting to remove redundant code
const Races = {
  Dwarf,
  Gnome,
  Halfling,
  Dragonborn,
  Human,
  Tiefling,
  Virtue,
  Elf,
  Orc,
  // other races, if any
};

const RaceKeys = (() => {
  let keys = [];
  Object.keys(Races).forEach((r) => {
    keys = keys.concat(Races[r].keys);
  });
  return keys;
})();

function RaceFactory(newRaceKey) {
  const raceKey = Object.keys(Races).find(r => Races[r].keys.includes(newRaceKey)) || "Human"; // What they were looking for wasn't found, just return human.
  return Races[raceKey];
}

module.exports = {
  Races,
  RaceKeys,
  RaceFactory,
};
