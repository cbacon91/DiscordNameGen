import { CommandBase } from './commandBase';
import { config } from '../config';
import { DiscordClient } from '../discordClient';
import { Message, RichEmbed } from 'discord.js';
import { Field } from './models/field';

export class HelpCommand extends CommandBase {
  constructor(client: DiscordClient) {
    const cmdTitle = 'help';

    super(client, {
      name: cmdTitle,
      usage: 'help',
      description: 'Generates help and about information. You\'re reading it right meow.',
    });
  }

  private getFields(prefix: string): Field[] {
    const arr: Field[] = [];
    this.client.commands.forEach((cmd: CommandBase) => {
      arr.push({
        name: prefix + cmd.commandData.usage,
        value: cmd.commandData.description.replace('${prefix}', prefix)
      });
    });
    return arr;
  }

  async run(message: Message, args: string): Promise<any> {
    let prefix = '';
    if (message.guild)
      prefix = config.discord.defaultPrefix;

    const detailRequest = this.client.commands.get(args);
    return detailRequest && detailRequest.commandData.detailedHelp
      ? this.detailedHelp(message, detailRequest)
      : this.generalHelp(message, prefix);
  }

  private detailedHelp(message: Message, command: CommandBase): Promise<any> {
    return this.sendEmbed(command.commandData.detailedHelp, message);
  }

  private generalHelp(message: Message, prefix: string): Promise<any> {
    return this.sendEmbed(new RichEmbed({
      fields: this.getFields(prefix),
      url: process.env.npm_package_homepage,
      title: 'Bugs? Questions? Requests? Feel free to contact my creator directly by opening an issue on GitHub',
      description: `In a server, you can issue commands prefixed with ${prefix}, or @me, or direct message me (no prefix required).`
    }), message);
  }
}
