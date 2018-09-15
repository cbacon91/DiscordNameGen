import { Race } from "../models/race";

export class NameArgs {
  constructor(init?: Partial<NameArgs>){
    Object.assign(this, init);
  }

  races: Race[] = [];
  genders: string[] = [];
  nameCount: number = 1;
  error: string[] = [];
  message: string[] = [];
}
