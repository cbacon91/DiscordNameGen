const config = require('../config');
const CommandBase = require('./commandBase');

class HelpCommand extends CommandBase {
  constructor(client) {
    const cmdTitle = 'help';

    super(client, {
      name: cmdTitle,
      usage: 'help',
      description: 'Generates help and about information. You\'re reading it right meow.',
    });
  }

  // todo: enable 'help ${helpCmd} for more detail
  async run(message, args) {
    let prefix = '';
    if (message.guild)
      prefix = config.discord.defaultPrefix;

    let helpText = 'For more detailed comments on commands, visit the full readme at ';
    helpText += process.env.npm_package_homepage;
    helpText += this.NEWLINE;

    helpText += `\`\`\`asciidoc${this.NEWLINE}`;

    // todo..
    // helpText += 'You can also specify `help {commandName}` for full details on the command. ';
    // helpText += 'These are fully-fleshed out, and are walls of text.
    // helpText += Use them at your discretion.';

    this.client.commands.forEach((command) => {
      helpText += prefix + command.name;

      if (command.usage)
        helpText += ` ::  ${command.usage}`;

      if (command.description)
        helpText += ` ::  ${command.description}`;

      helpText += this.NEWLINE;
    });

    helpText += this.NEWLINE;
    helpText += '===============================';
    helpText += this.NEWLINE + this.NEWLINE;
    helpText += `Version ${process.env.npm_package_version} \`\`\``;
    helpText += 'Bugs? Questions? Feel free to contact my creator directly at ';
    helpText += config.discord.devServer ? config.discord.devServer : 'the github link above';

    return this.send(helpText, message);
  }
}

module.exports = HelpCommand;
