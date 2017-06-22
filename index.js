const extensionsInit = require('./extensions');
const Discord = require('discord.js');
const config = require('./config');

const commands = require('./commands');
// should we allow chaining here to keep index.js clean? ie, user does
// commands.namegenerator.generators
const generators = require('./commands/namegenerator/generators');

(function init() {
  const juan = new Discord.Client();
  const token = config.discord.authToken;
  extensionsInit();

  juan.login(token);

  juan.once('ready', onReady);
  juan.on('message', onMessage);
  juan.on('disconnect', onDisconnect);

  function onDisconnect() {
    process.exit();
  }

  function onReady() {
    juan.commands = new Map();
    juan.commands.set('help', new commands.HelpCommand(juan));
    juan.commands.set('name',
      new commands.NameGenerationCommand(juan,
        new commands.argsParsers.NameGeneratorArgsParser(),
        new generators.NameGeneratorRepository(getInnerNameGeneratorRepository())));
  }

  async function onMessage(msg) {
    if (msg.content === config.discord.authToken) {
      console.log(`Emergency shut-off requested by ${msg.author.username}#${msg.author.discriminator} id ${msg.author.id}`);
      process.exit();
    }

    if (msg.author.bot) // Don't respond to bots
      return;

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
  }

  // todo move to another file; index.js shouldn't do all of this
  function getInnerNameGeneratorRepository() {
    const innerGenerators = {
      randomSelector: () => new generators.RandomSelectorGenerator(),
      markovChain: () => new generators.MarkovChainGenerator(),
      api: () => new generators.ApiGenerator(),
    };

    return innerGenerators[config.generator.type]();
  }
}());
