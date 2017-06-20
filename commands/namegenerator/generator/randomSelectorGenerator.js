const SeedDataRepository = require('./seed/seedDataRepository');

class RandomSelectorGenerator extends SeedDataRepository {
    constructor() {
        super();
    }

    generateName(args) {
        const generated = {
            names: [],
            error: '',
            message: ''
        };
        
        const seed = super.getSeedData(args);
        if(seed.error) {
            generated.error = seed.error;
            return generated;
        }
        if(seed.message) 
            generated.message += seed.message;

        for(let i = 0; i < args.nameCount; i++){
            const selected = Math.randomInt(0, seed.seeds.length);
            generated.names.push(seed.seeds[selected]);
        }

        return generated;
    }
}

module.exports = RandomSelectorGenerator;
