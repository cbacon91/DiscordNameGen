import { NameArgs } from "./nameGeneratorArgs";

const NEWLINE = require('os').EOL;
const races = require('../models/races');

const maxNameCount = 20;
const defaultGender = 'male';
const defaultRace = races.RaceFactory('human');

// todo: move gender specifics to genders namespace (see races)
const maleKeys = ['m', 'male', 'man', 'boy'];
const femaleKeys = ['f', 'female', 'w', 'woman', 'girl'];
const genderKeys = maleKeys.concat(femaleKeys);

export class NameGeneratorArgsParser {
  parseArgs(inArgs: string) {
    const args = inArgs.trim().split(' ').filter(arg => !!arg);
    const parsedArgs = {
      races: [],
      genders: [],
      nameCount: 1,
      error: '',
      message: '',
    } as NameArgs;

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
        parsedArgs.genders.push(defaultGender);
        parsedArgs.message += `Gender not specified or found; using default (${defaultGender})${NEWLINE}`;
      }
      if (!parsedArgs.races.length) {
        parsedArgs.races.push(defaultRace);
        parsedArgs.message += `Race not specified or found; using default (${defaultRace.name})${NEWLINE}`;
      }
    } catch (e) {
      parsedArgs.error = e.message; // if there is an error, just get out of here
    }
    return parsedArgs;
  }

  isCount(inArg: string): boolean {
    const n = Math.floor(Number(inArg));
    return String(n) === inArg && n >= 0;
  }

  parseCount(inArg: string, parsedArgs: NameArgs): number {
    let count = Math.floor(Number(inArg));

    if (count > maxNameCount) {
      parsedArgs.message += `Exceeded max name count; using max (${maxNameCount})${NEWLINE}`;
      count = maxNameCount;
    }

    return count;
  }

  isGender(inArg: string): boolean {
    return genderKeys.includes(inArg);
  }

  parseGender(inArg: string): string {
    return femaleKeys.includes(inArg)
      ? 'female'
      : 'male';
  }

  isRace(inArg: string): boolean {
    return races.RaceKeys.includes(inArg) || this.isHalfbreed(inArg);
  }

  isHalfbreed(inArg: string): boolean {
    return typeof inArg === 'string' && inArg.startsWith('half') && inArg !== 'halfling';
  }

  parseRaces(inArg: string): Race[] {
    if (this.isHalfbreed(inArg))
      return this.parseHalfbreedRace(inArg);

    return [races.RaceFactory(inArg)];
  }

  parseHalfbreedRace(inArg: string): Race[] {
    let race = inArg.substring('half'.length, inArg.length);
    if (race.startsWith('-'))
      race = race.substring(1, race.length);

    return [defaultRace].concat(this.parseRaces(race));
  }
}
