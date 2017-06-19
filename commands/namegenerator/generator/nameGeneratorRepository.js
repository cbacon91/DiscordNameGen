const config = require('../../../config'); //todo: import? babel?
const randomSelectorGenerator = require('./randomSelectorGenerator');
const markovChainGenerator = require('./markovChainGenerator');
const apiGenerator = require('./apiGenerator');

const generators = {
    "randomSelector": () => new randomSelectorGenerator(),
    "markovChain": () => new markovChainGenerator(),
    "api": () => new apiGenerator(),
};

class NameGeneratorRepository {
    constructor() {
        this.innerGenerator = generators[config.generator.type]();
        if(!this.innerGenerator)
            throw `generator type ${config.generator.type} not implemented`;
    }

    generateName(seed) {
        return this.innerGenerator.generateName(seed);
    }
}

module.exports = NameGeneratorRepository;
