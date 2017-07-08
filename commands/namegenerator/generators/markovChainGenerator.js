/* eslint-disable */
//todo reenable eslint when implemented
const seeds = require('./seeds');

class MarkovChainGenerator extends seeds.SeedDataRepository {
  constructor(seedRepository) {
    super(seedRepository);
    throw new Error('not implemented');
  }

  generateName(args) {
    const seedData = super.getSeedData(args);
    throw 'not implemented';
  }
}

module.exports = MarkovChainGenerator;
