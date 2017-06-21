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
    // should probably be DI instead of hardcoded like this
    this.innerGenerator = generators[config.generator.type]();
    if (!this.innerGenerator)
      throw new Error(`generator type ${config.generator.type} not implemented`);
  }

  generateName(args) {
    return this.innerGenerator.generateName(args);
  }
}

module.exports = NameGeneratorRepository;
