import { Race } from "../models/race";

export interface SeedData {
  seeds: string[];
  surnameSeeds: string[];
  message: string;
  error: string;
  selectedRace: Race;
  selectedGender: string;
}
