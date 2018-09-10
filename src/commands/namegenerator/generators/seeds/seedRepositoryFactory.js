const JsonSeedRepository = require('./jsonSeedRepository');

function SeedRepositoryFactory(seedSource) {
  const repositories = {
    json: () => new JsonSeedRepository(),
  };

  const innerRepositoryCtor = repositories[seedSource];
  if (!innerRepositoryCtor)
    throw new Error(`seed source ${seedSource} not implemented`);

  return innerRepositoryCtor();
}

module.exports = SeedRepositoryFactory;
