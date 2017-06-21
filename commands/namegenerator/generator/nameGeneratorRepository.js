const config = require('../../../config'); // todo: import? babel?
const RandomSelectorGenerator = require('./randomSelectorGenerator');
const MarkovChainGenerator = require('./markovChainGenerator');
const ApiGenerator = require('./apiGenerator');

const generators = {
  randomSelector: () => new RandomSelectorGenerator(),
  markovChain: () => new MarkovChainGenerator(),
  api: () => new ApiGenerator(),
};

class NameGeneratorRepository {
  constructor() {
    this.innerGenerator = generators[config.generator.type](); // should probably be DI instead of hardcoded like this
    if (!this.innerGenerator)
      throw `generator type ${config.generator.type} not implemented`;
  }

  generateName(args) {
    return this.innerGenerator.generateName(args);
  }
}

module.exports = NameGeneratorRepository;
