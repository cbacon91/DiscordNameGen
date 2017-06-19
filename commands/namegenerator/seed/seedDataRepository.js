const jsonSeedRepository = require('./jsonSeedRepository');
const mongoSeedRepository = require('./mongoSeedRepository');
const apiSeedRepository = require('./apiSeedRepository');

class SeedDataRepository {
    getSeedData(args) {
        const config = require('../../../config'); //todo: import? babel?
        const repositories = {
            "json": new jsonSeedRepository(),
            "mongo": new mongoSeedRepository(),
            "api": new apiSeedRepository()
        };
        const innerRepository = repositories[config.generator.seedSource];
        if(!innerRepository)
            throw `seed source ${config.generator.seedSource} not implemented`;

        return innerRepository.getSeedData(args);
    }
}

module.exports = SeedDataRepository;
