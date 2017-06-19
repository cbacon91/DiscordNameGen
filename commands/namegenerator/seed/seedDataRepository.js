const jsonSeedRepository = require('./jsonSeedRepository');
const mongoSeedRepository = require('./mongoSeedRepository');
const apiSeedRepository = require('./apiSeedRepository');
const config = require('../../../config'); //todo: import? babel?

const repositories = {
    "json": () => new jsonSeedRepository(),
    "mongo": () => new mongoSeedRepository(),
    "api": () => new apiSeedRepository()
}; 

class SeedDataRepository {
    constructor() {
        this.innerRepository = repositories[config.generator.seedSource]();
        if(!this.innerRepository)
            throw `seed source ${config.generator.seedSource} not implemented`;
    }

    getSeedData(args) {
        return this.innerRepository.getSeedData(args);
    }
}

module.exports = SeedDataRepository;
