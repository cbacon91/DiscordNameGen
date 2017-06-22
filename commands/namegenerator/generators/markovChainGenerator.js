/* eslint-disable */
//todo reenable eslint when implemented

const SeedDataRepository = require('./seed/seedDataRepository');

class MarkovChainGenerator extends SeedDataRepository {
  constructor() {
    super();
  }

  generateName(args) {
    const seed = super.getSeedData(args);
    throw 'not implemented';
  }
}

module.exports = MarkovChainGenerator;
