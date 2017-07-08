const NEWLINE = require('os').EOL;
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));

class JsonSeedRepository {
  validateArgs(args) {
    const seedData = {
      seeds: [],
      message: '',
      error: '',
      selectedRace: '',
      selectedGender: '',
    };

    try {
      if (!args)
        throw new Error('args must be provided to generate seed data');
      if (!args.races || !args.races.length)
        throw new Error('at least one race must be provided to generate see data');
      if (!args.genders || !args.genders.length)
        throw new Error('at least one gender must be provided to generate seed data');

      const uniqueRaces = [...new Set(args.races)];
      const uniqueGenders = [...new Set(args.genders)];

      seedData.selectedRace = uniqueRaces[Math.randomInt(0, uniqueRaces.length)];
      seedData.selectedGender = uniqueGenders[Math.randomInt(0, uniqueGenders.length)];

      if (uniqueRaces.length > 1)
        seedData.message += `Multiple races specified: generating ${seedData.selectedRace} names.${NEWLINE}`;
      if (uniqueGenders.length > 1)
        seedData.message += `Multiple genders specified: generating ${seedData.selectedGender} names.${NEWLINE}`;
    } catch (e) {
      seedData.error = e.message;
    }

    return seedData;
  }

  getSeedData(args) {
    const seedData = this.validateArgs(args);
    if (seedData.error)
      return seedData;

    seedData.seeds = JSON.parse(fs.readFileSync(`${__dirname}/jsonSeedData/${seedData.selectedRace}.${seedData.selectedGender}.json`, 'utf8'));
    return seedData;
  }

  async getSeedDataAsync(args) {
    const seedData = this.validateArgs(args);
    if (seedData.error)
      return seedData;

    const fileName = `${__dirname}/jsonSeedData/${seedData.selectedRace}.${seedData.selectedGender}.json`;
    return fs.readFileAsync(fileName, 'utf8').then((seeds) => {
      seedData.seeds = JSON.parse(seeds);
      return seedData;
    }).catch((err) => {
      console.log(`Error while generating seed data for JsonSeedRepository. ${NEWLINE}Filename: ${fileName} ${NEWLINE}Race ${seedData.selectedRace}, Gender ${seedData.selectedGender}`);
      console.log(err);
      seedData.error = 'An error occurred while generating seed data for name generation. This has been logged and will be fixed soon:tm:.';
      return seedData;
    });
  }
}

module.exports = JsonSeedRepository;
