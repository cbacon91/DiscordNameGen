const NEWLINE = require('os').EOL;
const fs = require('fs');

class JsonSeedRepository {
  getSeedData(args) {
    const seedData = {
      seeds: [],
      message: '',
      error: '',
    };

    try {
      if (!args)
        throw new Error('args must be provided to generate seed data');
      if (!args.races || !args.races.length)
        throw new Error('at least one race must be provided to generate see data');
      if (!args.genders || !args.genders.length)
        throw new Error('at least one gender must be provided to generate seed data');

      const race = args.races[Math.randomInt(0, args.races.length)];
      const gender = args.genders[Math.randomInt(0, args.genders.length)];

      if (args.races.length > 1)
        seedData.message += `Multiple races specified: generating ${race} names.${NEWLINE}`;
      if (args.genders.length > 1)
        seedData.message += `Multiple genders specified: generating ${gender} names.${NEWLINE}`;

      // todo async?
      seedData.seeds = JSON.parse(fs.readFileSync(`${__dirname}/jsonSeedData/${race}${gender}.json`, 'utf8'));
    } catch (e) {
      seedData.error = e.message;
    }

    return seedData;
  }
}

module.exports = JsonSeedRepository;
