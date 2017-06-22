/* eslint-disable */
//todo reenable eslint when implemented

const seeds = require('./seeds');

class MarkovChainGenerator extends seeds.SeedDataRepository {
  constructor(seedRepository) {
    super(seedRepository);
  }

  generateName(args) {
    const seed = super.getSeedData(args);
    throw 'not implemented';
  }
}

module.exports = MarkovChainGenerator;
