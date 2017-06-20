const SeededGenerator = require('./seededGenerator');

class RandomSelectorGenerator extends SeededGenerator {
    constructor() {
        super();
    }

    generateName(args) {
        const seed = super.getSeedData(args);
        
        const names = [];
        for(let i = 0; i < args.nameCount; i++){
            const selected = Math.randomInt(0, seed.length);
            names.push(seed[selected]);
        }

        return names;
    }
}

module.exports = RandomSelectorGenerator;
