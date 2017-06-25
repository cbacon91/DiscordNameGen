const extensionsInit = require('./extensions');
const Discord = require('discord.js');
const config = require('./config');

const commands = require('./commands');

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
    juan.commands.set('name', new commands.NameGenerationCommand(juan,
      new commands.argsParsers.NameGeneratorArgsParser(),
      new commands.namegenerator.generators.NameGeneratorRepository(
        getInnerNameGeneratorRepository(config))));
  }

  async function onMessage(msg) {
    if (msg.content === config.discord.authToken) {
      console.log(`Emergency shut-off requested by ${msg.author.username}#${msg.author.discriminator} id ${msg.author.id}`);
      process.exit();
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

  // todo move to another file; index.js shouldn't do all of this
  function getInnerNameGeneratorRepository(configuration) {
    const generators = commands.namegenerator.generators;
    const innerGenerators = {
      randomSelector: () => new generators.RandomSelectorGenerator(
        getSeedRepository(configuration)),
      markovChain: () => new generators.MarkovChainGenerator(
        getSeedRepository(configuration)),
      api: () => new generators.ApiGenerator(),
    };

    const innerRepositoryCtor = innerGenerators[configuration.generator.type];
    if (!innerRepositoryCtor)
      throw new Error(`generation type ${configuration.generator.type} not implemented`);

    return innerRepositoryCtor();
  }

  function getSeedRepository(configuration) {
    const seeds = commands.namegenerator.generators.seeds;

    const repositories = {
      json: () => new seeds.JsonSeedRepository(),
      mongo: () => new seeds.MongoSeedRepository(),
      api: () => new seeds.ApiSeedRepository(),
    };

    const innerRepositoryCtor = repositories[configuration.generator.seedSource];
    if (!innerRepositoryCtor)
      throw new Error(`seed source ${configuration.generator.seedSource} not implemented`);

    return innerRepositoryCtor();
  }
}());
