import { NameArgs } from "./nameArgs";
import { Races, RaceKeys, RaceFactory } from "../models/races";
import { Race } from "../models/race";

const maxNameCount = 20;

// todo: move gender specifics to genders namespace (see races)
const maleKeys = ['m', 'male', 'man', 'boy'];
const femaleKeys = ['f', 'female', 'w', 'woman', 'girl'];
const genderKeys = maleKeys.concat(femaleKeys);

export class NameArgsParser {
  constructor(private readonly raceFactory: RaceFactory){}

  parseArgs(inArgs: string) {
    const args = inArgs.trim().split(' ').filter(arg => !!arg);
    const parsedArgs = new NameArgs();

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

      if (!parsedArgs.races.length) {
        const randomRace = this.raceFactory.random();
        parsedArgs.races.push(randomRace);
        parsedArgs.message.push(`Race not specified or found; using random (${randomRace.name})`);
      }

      if (!parsedArgs.genders.length) {
        const randomGender = Math.floor(Math.random() * 2) == 0
          ? 'male'
          : 'female';
        parsedArgs.genders.push(randomGender);
        parsedArgs.message.push(`Gender not specified or found; using random (${randomGender})`);
      }

    } catch (e) {
      parsedArgs.error.push(e.message); // if there is an error, just get out of here
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
      parsedArgs.message.push(`Exceeded max name count; using max (${maxNameCount})`);
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
    return RaceKeys.includes(inArg) || this.isHalfbreed(inArg);
  }

  isHalfbreed(inArg: string): boolean {
    return inArg.startsWith('half') && inArg !== Races.Halfling.name;
  }

  parseRaces(inArg: string): Race[] {
    if (this.isHalfbreed(inArg))
      return this.parseHalfbreedRace(inArg);

    return [this.raceFactory.getRace(inArg)];
  }

  parseHalfbreedRace(inArg: string): Race[] {
    let race = inArg.substring('half'.length, inArg.length);
    if (race.startsWith('-'))
      race = race.substring(1, race.length);

    return [Races.Human].concat(this.parseRaces(race));
  }
}
