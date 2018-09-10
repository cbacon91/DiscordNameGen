const NEWLINE = require('os').EOL;
const Promise = require('bluebird');
const request = require('request-promise-native');
const config = require('../../../../config');

class JsonSeedRepository {
  validateArgs(args) {
    const seedData = {
      seeds: [],
      surnameSeeds: [],
      message: '',
      error: '',
      selectedRace: {},
      selectedGender: '',
    };

    try {
      if (!args)
        throw new Error('args must be provided to generate seed data');
      if (!args.races || !args.races.length)
        throw new Error('at least one race must be provided to generate seed data');
      if (!args.genders || !args.genders.length)
        throw new Error('at least one gender must be provided to generate seed data');

      const uniqueGenders = [...new Set(args.genders)];
      const uniqueRaces = [];
      const isNewUniqueRace = newRace => !uniqueRaces.map(r => r.name).includes(newRace.name);
      args.races.filter(isNewUniqueRace).forEach(r => uniqueRaces.push(r));

      seedData.selectedRace = uniqueRaces[Math.randomInt(0, uniqueRaces.length)];
      seedData.selectedGender = uniqueGenders[Math.randomInt(0, uniqueGenders.length)];

      if (uniqueRaces.length > 1)
        seedData.message += `Multiple races specified: generating ${seedData.selectedRace.name} names.${NEWLINE}`;
      if (uniqueGenders.length > 1)
        seedData.message += `Multiple genders specified: generating ${seedData.selectedGender} names.${NEWLINE}`;
    } catch (e) {
      seedData.error = e.message;
    }

    return seedData;
  }

  async getSeedDataAsync(args) {
    // TODO;
    // getSeedData for each repository should only care about the following:
    // 1) race, string (or Race class?), required
    //   a) there should be a central "raceRepository" somewhere probably
    // 2) gender, string (or Gender class?), optional
    //   a) if !race.isGenderless, and gender is not supplied, throw error
    // returns { given: []string, surname: []string, race Race, gender Gender }

    const seedData = this.validateArgs(args);
    if (seedData.error)
      return seedData;

    const srcUri = config.api.srcUri;

    let requestUri = `${srcUri}/${seedData.selectedRace.name}`;
    if (!seedData.selectedRace.isGenderless)
      requestUri += `.${seedData.selectedGender}`;
    requestUri += '.json';

    const surfileRequestUri = `${srcUri}/${seedData.selectedRace.name}.surname.json`;

    const requests = [];
    const generateSurname = !seedData.selectedRace.lacksSurname;

    requests.push(request(requestUri));

    if (generateSurname)
      requests.push(request(surfileRequestUri));

    // todo await
    return Promise.all(requests).then((results) => {
      seedData.seeds = JSON.parse(results[0]);

      if (generateSurname)
        seedData.surnameSeeds = JSON.parse(results[1]);

      return seedData;
    }).catch((err) => {
      console.log(`Error while generating seed data for JsonSeedRepository. ${NEWLINE}Filename: ${requestUri} ${NEWLINE}Race ${seedData.selectedRace}, Gender ${seedData.selectedGender}`);
      console.log(err);
      seedData.error = 'An error occurred while generating seed data for name generation. This has been logged and will be fixed soon:tm:.';
      return seedData;
    });
  }
}

module.exports = JsonSeedRepository;
