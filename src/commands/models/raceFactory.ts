import { Utility } from '../../utility';
import { Race } from './race';
import { RaceArray } from './races';

export class RaceFactory {

  constructor(private readonly utility: Utility){}

  getRace(key: string): Race {
    const selected = RaceArray.find((r: Race) => r.keys.includes(key));
    if(!selected)
      throw 'race not found, oh dear this shouldn\'t happen';
    return selected;
  }

  random(): Race {
    return RaceArray[this.utility.intBetween(0, RaceArray.length - 1)];
  }
}