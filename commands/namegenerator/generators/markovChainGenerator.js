/* eslint-disable */
//todo reenable eslint when implemented
const seeds = require('./seeds');

class MarkovChainGenerator extends seeds.SeedDataRepository {
  constructor() {
    super();
    throw new Error('not implemented');
  }

  async generateNameAsync(args) {
    const seedData = await super.getSeedDataAsync(args);
    throw 'not implemented';    
  }
}

module.exports = MarkovChainGenerator;
