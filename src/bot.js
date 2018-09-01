const Discord = require('discord.js');
const config = require('./config');

const commands = require('./commands');

// wait five minutes and try again .. The most common crash is discord losing connection,
// and trying again immediately would fail as well.
const retryIn = 5 * 60 * 1000; //

const maxCrashes = 5;
let crashes = 0; // if only it were that easy...

function runBot() {
  try {
    console.log(`Initializing Juan Charles for attempt number ${crashes} ...`);
    init();
  } catch (error) {
    crashes += 1;
    console.log(`Encountered error # ${crashes}:`);
    console.log(error);

    if (crashes < maxCrashes) {
      console.log(`Retrying in ${retryIn / 1000 / 60} minutes.`);
      setTimeout(runBot, retryIn);
    } else
      process.exit(500); // just let it die
  }
}

function init() {
  const juan = new Discord.Client();
  const token = config.discord.authToken;

  juan.login(token);

  juan.once('ready', onReady);
  juan.on('message', onMessage);
  juan.on('disconnect', onDisconnect);

  function onDisconnect() {
    process.exitCode = 0;
  }

  function onReady() {
    juan.commands = new Map();
    juan.commands.set('help', new commands.HelpCommand(juan));
    juan.commands.set('name', new commands.NameGenerationCommand(juan,
      new commands.argsParsers.NameGeneratorArgsParser(),
      commands.namegenerator.generators.NameGeneratorFactory(
        config.generator.type, config.generator.seedSource
      ))
    );

    console.log(`Setup Complete. Active in ${juan.guilds.size} servers.`);
  }

  function onMessage(msg) {
    if (msg.content === config.discord.authToken) {
      console.log(`Emergency shut-off requested by ${msg.author.username}#${msg.author.discriminator} id ${msg.author.id}`);
      // exit instead of set exitCode because this needs to be shut off immediately
      process.exit(503);
    }

    if (msg.author.bot)
      return;

    let offset;
    const prefix = msg.guild
      ? config.discord.defaultPrefix // todo let guild set their own prefix.
      : '';

    if (msg.content.trim().startsWith(prefix))
      offset = prefix.length;
    else if (msg.content.trim().startsWith(juan.user.toString()))
      offset = juan.user.toString().length + 1;
    else // if message doesn't start with the prefix or an @mention, just ignore their message.
      return;

    const userInput = msg.content.substring(offset).split(' ')[0].toLowerCase();
    const command = juan.commands.get(userInput);

    if (!command)
      return;

    const args = msg.content.substring(offset + userInput.length).trim();
    command.run(msg, args);
  }
}

module.exports = runBot;