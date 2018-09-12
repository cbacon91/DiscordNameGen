import { CommandBase } from './commandBase';
import { config } from '../config';
import { DiscordClient } from '../discordClient';
import { Message } from 'discord.js';

export class HelpCommand extends CommandBase {
  constructor(client: DiscordClient) {
    const cmdTitle = 'help';

    super(client, {
      name: cmdTitle,
      usage: 'help',
      description: 'Generates help and about information. You\'re reading it right meow.',
    });
  }

  // todo: enable 'help ${helpCmd} for more detail
  async run(message: Message, _args: string) {
    let prefix = '';
    if (message.guild)
      prefix = config.discord.defaultPrefix;

    let helpText = [`For more detailed comments on commands, visit the full readme at ${process.env.npm_package_homepage}`];
    helpText.push('');

    helpText.push('```asciidoc');

    // todo..
    // helpText += 'You can also specify `help {commandName}` for full details on the command. ';
    // helpText += 'These are fully-fleshed out, and are walls of text.
    // helpText += Use them at your discretion.';

    this.client.commands.forEach((command: CommandBase) => {
      let cmdText = prefix + command.commandData.name;

      if (command.commandData.usage)
      cmdText += ` ::  ${command.commandData.usage}`;

      if (command.commandData.description)
      cmdText += ` ::  ${command.commandData.description}`;

      helpText.push(cmdText);
    });

    helpText.push('===============================');
    helpText.push('');
    helpText.push(`Version ${process.env.npm_package_version}`);
    helpText.push('```');
    helpText.push('Bugs? Questions? Feel free to contact my creator directly at the github link above');

    return this.send(helpText, message);
  }
}
