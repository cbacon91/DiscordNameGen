const seeds = require('./seeds');

class RandomSelectorGenerator extends seeds.SeedDataRepository {
  validateArgs(args) {
    if (!args)
      throw new Error('args must be provided to generate name');
  }

  generateName(args) {
    this.validateArgs(args);

    const generated = {
      names: [],
      error: '',
      message: '',
    };

    const seedData = super.getSeedData(args);

    if (seedData.error) {
      generated.error = seedData.error;
      return generated;
    }
    if (seedData.message)
      generated.message += seedData.message;


    for (let i = 0; i < args.nameCount; i++) {
      const selected = Math.randomInt(0, seedData.seeds.length);
      generated.names.push(seedData.seeds[selected]);
    }

    return generated;
  }

  async generateNameAsync(args) {
    this.validateArgs(args);

    const generated = {
      names: [],
      error: '',
      message: '',
    };

    const seedData = await super.getSeedDataAsync(args);

    if (seedData.error) {
      generated.error = seedData.error;
      return generated;
    }
    if (seedData.message)
      generated.message += seedData.message;

    for (let i = 0; i < args.nameCount; i++) {
      const selected = Math.randomInt(0, seedData.seeds.length);
      generated.names.push(seedData.seeds[selected]);
    }

    return generated;
  }
}

module.exports = RandomSelectorGenerator;
