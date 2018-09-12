import { CommandBase } from "./commandBase";
import { DiscordClient } from "../discordClient";
import { Message } from "discord.js";
import { NameRepository } from "./namecommand/nameRepository";
import { NameArgsParser } from "./namecommand/nameArgsParser";
import { NameArgs } from "./namecommand/nameArgs";
import { GeneratedNames } from "./namecommand/generatedNames";

const cmdTitle = 'name';

export class NameCommand extends CommandBase {
  constructor(
      client: DiscordClient, 
      protected readonly argsParser: NameArgsParser, 
      protected readonly nameRepository: NameRepository
    ) {

    super(client, {
      name: cmdTitle,
      usage: 'name [Race ...] [Gender ...] [NameCount]',
      description: 'Picks a name from a list of names based on race and gender.',
    });
  }

  async run(message: Message, args: string) {
    const parsedArgs = this.argsParser.parseArgs(args);

    if (parsedArgs.error)
      return this.send(`**${parsedArgs.error}**`, message);

    const generated = await this.nameRepository.getNamesAsync(parsedArgs);

    if (generated.error)
      return this.send(`**${generated.error}**`, message);

    return this.send(this.buildReply(parsedArgs, generated), message);
  }

  buildReply(parsedArgs: NameArgs, generated: GeneratedNames): string {
    let replyMessage = '';

    if (parsedArgs.message || generated.message) {
      replyMessage += `*${parsedArgs.message}${generated.message}`;
      // cut off the ending this.NEWLINE so the * can be next to a character
      replyMessage = replyMessage.substring(0, replyMessage.length - 2);
      replyMessage += '*'.concat(this.NEWLINE, this.NEWLINE);
    }

    let nameList = generated.names.join(this.NEWLINE);

    replyMessage += nameList;

    return replyMessage;
  }
}
