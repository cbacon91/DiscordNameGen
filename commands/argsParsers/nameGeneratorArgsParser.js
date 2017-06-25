const NEWLINE = require('os').EOL;

const MAX_NAME_COUNT = 50;
const DEFAULT_GENDER = 'male';
const DEFAULT_RACE = 'human';

const dwarfKeys = ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'];
const elfKeys = ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'];
const hobbitsesKeys = ['h', 'halfling', 'hobbit', 'kender', 'half'];
const orcKeys = ['o', 'orc', 'ork', 'orcish', 'orkish'];
const gnomeKeys = ['g', 'gnome', 'gnomish'];
const humanKeys = ['human', 'person', 's', 'n'];
const raceKeys = dwarfKeys.concat(elfKeys, hobbitsesKeys, orcKeys, gnomeKeys, humanKeys);

const maleKeys = ['m', 'male', 'man', 'boy'];
const femaleKeys = ['f', 'female', 'w', 'woman', 'girl'];
const genderKeys = maleKeys.concat(femaleKeys);

class NameGeneratorArgsParser {
  // todo with the parsing..
  // 5) building on 4), allow "half-elf" and "half-X", assume the other half is human
  // 6) These lists should probably be mapped to a config, external json, or database-like file -
  //    hardcoding them feels dirty.
  // 7) finally, right now the default is 'human male'. Should it be human male, or should it be
  //    random? Maybe it could be a config setting? human male is good because human names should be
  //    applicable to other races (they're generic) and male characters are generally more common
  //    than females (at least in the games I've played.. ), but there's a point to be made for a
  //    randomization (even if it's something like 85% human 75% male or something .. tbd)

  parseArgs(inArgs) {
    const args = inArgs.trim().split(' ').filter(arg => arg);
    const parsedArgs = {
      races: [],
      genders: [],
      nameCount: 1,
      error: '',
      message: '',
    };

    try {
      args.forEach((arg) => {
        if (this.isGender(arg))
          parsedArgs.genders.push(this.parseGender(arg));
        else if (this.isRace(arg))
          parsedArgs.races = parsedArgs.races.concat(this.parseRaces(arg));
        else if (this.isCount(arg)) {
          if (parsedArgs.nameCount !== 1) // throw in order to just end the loop
            throw new Error('Already specified name count - can only take one name count!');

          parsedArgs.nameCount = this.parseCount(arg, parsedArgs);
        }
        // simply ignore args that aren't any of the above
      });

      if (!parsedArgs.genders.length) {
        // default male; should this be random or should we supply both and let consumer decide?
        parsedArgs.genders.push(DEFAULT_GENDER);
        parsedArgs.message += `Gender not specified or found; using default (${DEFAULT_GENDER})${NEWLINE}`;
      }
      if (!parsedArgs.races.length) {
        // default human; should this be random or should we supply all and let consumer decide?
        parsedArgs.races.push(DEFAULT_RACE);
        parsedArgs.message += `Race not specified or found; using default (${DEFAULT_RACE})${NEWLINE}`;
      }
    } catch (e) {
      parsedArgs.error = e.message; // if there is an error, just get out of here
    }
    return parsedArgs;
  }

  isCount(inArg) {
    const n = Math.floor(Number(inArg));
    return String(n) === inArg && n >= 0;
  }

  parseCount(inArg, parsedArgs) {
    let count = Math.floor(Number(inArg));

    if (count > MAX_NAME_COUNT) {
      parsedArgs.message += `Exceeded max name count; using max (${MAX_NAME_COUNT})${NEWLINE}`;
      count = MAX_NAME_COUNT;
    }

    return count;
  }

  isGender(inArg) {
    return genderKeys.includes(inArg);
  }

  parseGender(inArg) {
    return femaleKeys.includes(inArg)
      ? 'female'
      : 'male';
  }

  isRace(inArg) {
    return raceKeys.includes(inArg) || this.isHalfbreed(inArg);
  }

  isHalfbreed(inArg) {
    return typeof inArg === 'string' && inArg.startsWith('half') && inArg !== 'halfling';
  }

  parseRaces(inArg) {
    if (this.isHalfbreed(inArg))
      return this.parseHalfbreedRace(inArg);

    if (dwarfKeys.includes(inArg))
      return ['dwarf'];
    else if (elfKeys.includes(inArg))
      return ['elf'];
    else if (hobbitsesKeys.includes(inArg))
      return ['halfling'];
    else if (orcKeys.includes(inArg))
      return ['orc'];
    else if (gnomeKeys.includes(inArg))
      return ['gnome'];

    return ['human']; // default to human; should this be random?
  }

  parseHalfbreedRace(inArg) {
    let race = inArg.substring('half'.length, inArg.length);
    if (race.startsWith('-'))
      race = race.substring(1, race.length);

    return ['human'].concat(this.parseRaces(race));
  }
}

module.exports = NameGeneratorArgsParser;
