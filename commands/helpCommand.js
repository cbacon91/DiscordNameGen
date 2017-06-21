const config = require('../config'); // todo let's stop using ../../
const pkge = require('../package');
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

    let helpText = `\`\`\`asciidoc${this.NEWLINE}`;
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
    helpText += `Version ${pkge.version}`;
    helpText += this.NEWLINE;
    helpText += `Bugs? Questions? Drop an issue at my GitHub - ${pkge.bugs.url}${this.NEWLINE} \`\`\``;

    return this.send(helpText, message);
  }
}

module.exports = HelpCommand;
