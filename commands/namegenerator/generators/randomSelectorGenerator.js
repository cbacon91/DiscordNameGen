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
      let selected = Math.randomInt(0, seedData.seeds.length);
      let name = seedData.seeds[selected];

      if (args.includeSurname) {
        selected = Math.randomInt(0, seedData.surnameSeeds.length);
        name += ` ${seedData.surnameSeeds[selected]}`;
      }

      generated.names.push(name);
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
      let selected = Math.randomInt(0, seedData.seeds.length);
      let name = seedData.seeds[selected];

      if (args.includeSurname) {
        selected = Math.randomInt(0, seedData.surnameSeeds.length);
        name += `${seedData.selectedRace.isClanBased ? ' of clan' : ''} ${seedData.surnameSeeds[selected]}`;
      }

      generated.names.push(name);
    }

    return generated;
  }
}

module.exports = RandomSelectorGenerator;
