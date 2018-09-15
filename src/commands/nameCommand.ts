import { CommandBase } from "./commandBase";
import { Message, RichEmbed } from "discord.js";
import { NameRepository } from "./namecommand/nameRepository";
import { NameArgsParser } from "./namecommand/nameArgsParser";
import { RaceArray } from "./models/races";
import { Race } from "./models/race";
import { Logger } from "../logger";

const cmdTitle = 'name';

export class NameCommand extends CommandBase {
  constructor(
    logger: Logger,
    protected readonly argsParser: NameArgsParser,
    protected readonly nameRepository: NameRepository
  ) {

    super(logger, {
      name: cmdTitle,
      usage: 'name elf female 20',
      description: 'Randomly selects a name from a list of pre-determined names based on race and gender (the base list comes from Xanathar\'s Guide to Everything). You can supply any number of races (or none), and I will choose a race at random and supply names for it. The order of parameters is not important, and no parameters are required. For more detailed help, use "${prefix}help name"',
      detailedHelp: nameDetailedHelp
    });
  }

  async run(message: Message, args: string): Promise<any> {
    const parsedArgs = this.argsParser.parseArgs(args);

    if (parsedArgs.error.length)
      return this.send([...parsedArgs.error.map((e: string) => `**${e}**`)], message);

    const generated = await this.nameRepository.getNamesAsync(parsedArgs);

    if (generated.error.length)
      return this.send([...generated.error.map((e: string) => `**${e}**`)], message);

    const reply = [
      ...parsedArgs.message.map((m: string) => `*${m}*`),
      ...generated.message.map((m: string) => `*${m}*`),
      '',
      ...generated.names,
    ];
    return this.send(reply, message);
  }
}

const nameDetailedHelp = new RichEmbed({
  "title": "name",
  "description": "A pre-determined list of names (taken from Xanathar's Guide to Everything) is the basis for name generation. I will randomly select a first name, a surname (if applicable), and stitch them together. If requested, I can also generate up to 20 names at a time (more at a time risks going over Discord's message character limit). Due to the nature of where these names come from, there is a moderate risk of collisions. You will likely see duplicates over time. ",
  "color": 186105,
  "fields": [{
      "name": "[race]",
      "value": "You can supply any number of races, pulled from the list below, or none. If none are provided, I will select one at random."
    }, {
      "name": "[gender]",
      "value": "You can supply a gender, or not. If none is provided, I will select one at random. Note that not all races require a gender, such as virtue, which is gender-neutral."
    }, {
      "name": "[nameCount]",
      "value": "You can provide a number of names to generate. If no count is provided, I will generate one name at a time. I can generate a maximum of 20 names at a time due to Discord's message character limit."
    }, {
      "name": "== Below follows all currently implemented races ==",
      "value": "== Any keys that are related to the race and how to trigger them as a race follow. e.g. `name g` will determine a name for a gnome. =="
    },
    ...RaceArray.map((r: Race) => {
      return {
        name: r.name,
        value: r.keys.join('; ')
      }
    })
  ]
});