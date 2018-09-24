import { Client } from 'discord.js';
import { CommandBase } from './commands/commandBase';

export class DiscordClient extends Client {
  commands: Map<string, CommandBase>;

  constructor() {
    super();
    this.commands = new Map<string, CommandBase>();
  }
}