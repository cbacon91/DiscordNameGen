import { Race } from "../models/race";
import { Races } from "../models/races";

export class SeedData {
  constructor(init?: Partial<SeedData>){
    Object.assign(this, init);
  }

  seeds: string[] = [];
  surnameSeeds: string[] = [];
  message: string[] = [];
  error: string[] = [];
  selectedRace: Race = Races.Human;
  selectedGender: string = '';
}
