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

    if (parsedArgs.error.length)
      return this.send([...parsedArgs.error.map((e: string) => `**${e}**`)], message);

    const generated = await this.nameRepository.getNamesAsync(parsedArgs);

    if (generated.error.length)
      return this.send([...generated.error.map((e: string) => `**${e}**`)], message);

    const l = this.buildReply(parsedArgs, generated);
    return this.send(l, message);
  }

  buildReply(parsedArgs: NameArgs, generated: GeneratedNames): string[] {
    let replyMessage: string[] = [];

    replyMessage = [
      ...parsedArgs.message.map((m: string) => `*${m}*`),
      ...generated.message.map((m: string) => `*${m}*`),
      '',
      ...generated.names
    ]

    return replyMessage;
  }
}
