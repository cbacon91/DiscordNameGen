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

      const uniqueRaces = [...new Set(args.races)];
      const uniqueGenders = [...new Set(args.genders)];

      const race = uniqueRaces[Math.randomInt(0, uniqueRaces.length)];
      const gender = uniqueGenders[Math.randomInt(0, uniqueGenders.length)];

      if (uniqueRaces.length > 1)
        seedData.message += `Multiple races specified: generating ${race} names.${NEWLINE}`;
      if (uniqueGenders.length > 1)
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
