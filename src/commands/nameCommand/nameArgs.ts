import { Race } from "../models/race";

export interface NameArgs {
  races: Race[];
  genders: string[];
  nameCount: number;
  error: string;
  message: string;
}
