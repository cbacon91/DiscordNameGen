import { Race } from "../models/race";

export class NameArgs {
  races: Race[] = [];
  genders: string[] = [];
  nameCount: number = 1;
  error: string[] = [];
  message: string[] = [];
}
