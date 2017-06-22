const JsonSeedRepository = require('./jsonSeedRepository');
const MongoSeedRepository = require('./mongoSeedRepository');
const ApiSeedRepository = require('./apiSeedRepository');
const config = require('../../../../config'); // todo: import? babel?

const repositories = {
  json: () => new JsonSeedRepository(),
  mongo: () => new MongoSeedRepository(),
  api: () => new ApiSeedRepository(),
};

class SeedDataRepository {
  constructor() {
    // should probably be DI instead of hardcoded like this
    this.innerRepository = repositories[config.generator.seedSource]();
    if (!this.innerRepository)
      throw new Error(`seed source ${config.generator.seedSource} not implemented`);
  }

  getSeedData(args) {
    return this.innerRepository.getSeedData(args);
  }
}

module.exports = SeedDataRepository;
