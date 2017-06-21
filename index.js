const extensionsInit = require('./extensions');
const Discord = require('discord.js');
const config = require('./config');
const fs = require('fs');

(function init() {
  const juan = new Discord.Client();
  const token = config.discord.authToken;
  extensionsInit();

  juan.login(token);

  juan.commands = new Map();
  juan.once('ready', () => {
    const dir = './commands/';

    fs.readdir(dir, (err, inFiles) => {
      if (err) {
        console.log(err);
        process.exit();
      } else {
        const searchFiles = inFiles.filter(file => file.endsWith('Command.js'));
        for (let i = 0; i < searchFiles.length; i++) {
          const fileName = searchFiles[i];
          try {
            const Command = require(`./commands/${/(.*)\.js/.exec(fileName)[1]}`); // eslint-disable-line global-require,import/no-dynamic-require
            const command = new Command(juan);
            juan.commands.set(command.name, command);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  });

  juan.on('message', async (msg) => {
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
