const JsonSeedRepository = require('./jsonSeedRepository');
const MongoSeedRepository = require('./mongoSeedRepository');
const ApiSeedRepository = require('./apiSeedRepository');
const config = require('../../../../config'); //todo: import? babel?

const repositories = {
    "json": () => new JsonSeedRepository(),
    "mongo": () => new MongoSeedRepository(),
    "api": () => new ApiSeedRepository()
}; 

class SeedDataRepository {
    constructor() {
        this.innerRepository = repositories[config.generator.seedSource](); //should probably be DI instead of hardcoded like this
        if(!this.innerRepository)
            throw `seed source ${config.generator.seedSource} not implemented`;
    }

    getSeedData(args) {
        return this.innerRepository.getSeedData(args);
    }
}

module.exports = SeedDataRepository;
