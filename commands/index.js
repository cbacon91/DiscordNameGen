const HelpCommand = require('./helpCommand');
const NameGenerationCommand = require('./nameGenerationCommand');
const ArgsParser = require('./namegenerator/argsParser');
const NameGeneratorRepository = require('./namegenerator/generator/nameGeneratorRepository');

module.exports = {
  HelpCommand,
  NameGenerationCommand,
  ArgsParser,
  NameGeneratorRepository,
};
