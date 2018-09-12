import { Race } from "../models/race";

export class NameArgs {
  races: Race[];
  genders: string[];
  nameCount: number;
  error: string;
  message: string;
}
