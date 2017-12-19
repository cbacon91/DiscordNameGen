const JsonSeedRepository = require('./jsonSeedRepository');
const MongoSeedRepository = require('./mongoSeedRepository');
const ApiSeedRepository = require('./apiSeedRepository');

function SeedRepositoryFactory(seedSource) {
  const repositories = {
    json: () => new JsonSeedRepository(),
    mongo: () => new MongoSeedRepository(),
    api: () => new ApiSeedRepository(),
  };

  const innerRepositoryCtor = repositories[seedSource];
  if (!innerRepositoryCtor)
    throw new Error(`seed source ${seedSource} not implemented`);

  return innerRepositoryCtor();
}

module.exports = SeedRepositoryFactory;