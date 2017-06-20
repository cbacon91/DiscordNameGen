const SeededGenerator = require('./seededGenerator');

class RandomSelectorGenerator extends SeededGenerator {
    constructor() {
        super();
    }

    generateName(args) {
        const seed = super.getSeedData(args);
        const selected = Math.randomInt(0, seed.length);
        return seed[selected];
    }
}

module.exports = RandomSelectorGenerator;
