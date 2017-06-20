const SeededGenerator = require('./seededGenerator');

class MarkovChainGenerator extends SeededGenerator {
    constructor() {
        super();
    }

    generateName(args) {
        const seed = super.getSeedData(args);
        throw 'not implemented';
    }
}

module.exports = MarkovChainGenerator;
