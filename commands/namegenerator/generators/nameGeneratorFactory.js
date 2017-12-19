const SeedRepositoryFactory = require('./seeds/seedRepositoryFactory');
const NameGeneratorRepository = require('./nameGeneratorRepository');
const RandomSelectorGenerator = require('./randomSelectorGenerator');
const MarkovChainGenerator = require('./markovChainGenerator');
const ApiGenerator = require('./apiGenerator');

function getInnerNameGeneratorRepository(generatorType, seedSource) {
  const innerGenerators = {
    randomSelector: () => new RandomSelectorGenerator(SeedRepositoryFactory(seedSource)),
    markovChain: () => new MarkovChainGenerator(SeedRepositoryFactory(seedSource)),
    api: () => new ApiGenerator(),
  };

  const innerRepositoryCtor = innerGenerators[generatorType];
  if (!innerRepositoryCtor)
    throw new Error(`generation type ${generatorType} not implemented`);

  return innerRepositoryCtor();
}

module.exports = function(generatorType, seedSource) {
  return new NameGeneratorRepository(getInnerNameGeneratorRepository(generatorType, seedSource));
};
