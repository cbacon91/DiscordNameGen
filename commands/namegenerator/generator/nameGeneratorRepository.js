const config = require('../../../config'); //todo: import? babel?
const randomSelectorGenerator = require('./randomSelectorGenerator');
const markovChainGenerator = require('./markovChainGenerator');
const apiGenerator = require('./apiGenerator');

class NameGeneratorRepository {
    generateName(seed) {
        const generators = {
            "randomSelector": new randomSelectorGenerator(),
            "markovChain": new markovChainGenerator(),
            "api": new apiGenerator(),
        };
        const innerGenerator = generators[config.generator.type];
        if(!innerGenerator)
            throw `generator type ${config.generator.type} not implemented`;

        return innerGenerator.generateName(seed);
    }
}

module.exports = NameGeneratorRepository;
