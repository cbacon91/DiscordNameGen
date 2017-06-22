const extensionsInit = require('./extensions');
const Discord = require('discord.js');
const config = require('./config');
const commands = require('./commands');


(function init() {
  const juan = new Discord.Client();
  const token = config.discord.authToken;
  extensionsInit();

  juan.login(token);

  juan.commands = new Map();
  juan.once('ready', () => {
    juan.commands.set('help', new commands.HelpCommand(juan));
    juan.commands.set('name',
      new commands.NameGenerationCommand(juan,
        new commands.ArgsParser(),
        new commands.NameGeneratorRepository()));
  });

  juan.on('message', async (msg) => {
    // emergency shut-off valve
    if (msg.content === config.discord.authToken)
      process.exit();

    if (msg.author.bot) { // Don't respond to bots
      return;
    }

    let offset;
    const prefix = msg.guild
      ? config.discord.defaultPrefix // todo let guild set their own prefix.
      : '';

    if (msg.content.trim().startsWith(prefix))
      offset = prefix.length;
    else if (msg.content.trim().startsWith(juan.user.toString()))
      offset = juan.user.toString().length + 1;
    else
      return;

    const userInput = msg.content.substring(offset).split(' ')[0].toLowerCase();
    const command = juan.commands.get(userInput);

    if (!command)
      return;

    const args = msg.content.substring(offset + userInput.length).trim();
    command.run(msg, args);
  });

  juan.on('disconnect', () => {
    process.exit();
  });
}());
