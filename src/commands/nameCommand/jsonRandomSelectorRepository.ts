import { NameRepository } from "./nameRepository";
import { SeedData } from "./seedData";
import { config } from "../../config";
import { Race } from "../models/race";
import { NameArgs } from "./nameArgs";
import { GeneratedNames } from "./generatedNames";
import { Utility } from "../../utility";
import { Logger } from "../../logger";

export class JsonRandomSelectorRepository extends NameRepository {

  constructor(
    private readonly utility: Utility,
    private readonly logger: Logger
  ){
    super();
  }

  async getNamesAsync(args: NameArgs): Promise<GeneratedNames> {

    const generated = new GeneratedNames();

    const seedData = await this.getSeedDataAsync(args);

    if (seedData.error.length) {
      generated.error = seedData.error;
      return generated;
    }

    generated.message = seedData.message;

    for (let i = 0; i < args.nameCount; i++) {
      let selected = this.utility.intBetween(0, seedData.seeds.length);
      let name = seedData.seeds[selected];

      if (!seedData.selectedRace.lacksSurname) {
        selected = this.utility.intBetween(0, seedData.surnameSeeds.length);
        name += ` ${seedData.surnameSeeds[selected]}`;
      }

      // todo: ignore duplicates
      generated.names.push(name);
    }

    return generated;
  }

  determineSeeding(args: NameArgs) {
    const seedData = new SeedData();

    try {
      if (!args)
        throw new Error('args must be provided to generate seed data');
      if (!args.races || !args.races.length)
        throw new Error('at least one race must be provided to generate seed data');
      if (!args.genders || !args.genders.length)
        throw new Error('at least one gender must be provided to generate seed data');

      const uniqueGenders = [...new Set(args.genders)];
      const uniqueRaces: Race[] = [];
      const isNewUniqueRace = (newRace: Race) => !uniqueRaces.map(r => r.name).includes(newRace.name);
      args.races.filter(isNewUniqueRace).forEach((r: Race) => uniqueRaces.push(r));

      seedData.selectedRace = uniqueRaces[this.utility.intBetween(0, uniqueRaces.length)];
      seedData.selectedGender = uniqueGenders[this.utility.intBetween(0, uniqueGenders.length)];

      if (uniqueRaces.length > 1)
        seedData.message.push(`Multiple races specified: generating ${seedData.selectedRace.name} names.`);
      if (uniqueGenders.length > 1)
        seedData.message.push(`Multiple genders specified: generating ${seedData.selectedGender} names.`);
    } catch (e) {
      seedData.error.push(e.message);
    }

    return seedData;
  }

  async getSeedDataAsync(args: NameArgs): Promise<SeedData> {
    // TODO;
    // getSeedData for each repository should only care about the following:
    // 1) race, string (or Race class?), required
    //   a) there should be a central "raceRepository" somewhere probably
    // 2) gender, string (or Gender class?), optional
    //   a) if !race.isGenderless, and gender is not supplied, throw error
    // returns { given: []string, surname: []string, race Race, gender Gender }

    const seedData = this.determineSeeding(args);
    if (seedData.error.length)
      return seedData;

    const srcUri = config.api.srcUri;

    let requestUri = `${srcUri}/${seedData.selectedRace.name}`;
    if (!seedData.selectedRace.isGenderless)
      requestUri += `.${seedData.selectedGender}`;
    requestUri += '.json';

    const surfileRequestUri = `${srcUri}/${seedData.selectedRace.name}.surname.json`;

    const requests = [];
    const generateSurname = !seedData.selectedRace.lacksSurname;

    requests.push(this.utility.request(requestUri));

    if (generateSurname)
      requests.push(this.utility.request(surfileRequestUri));

    // todo await
    return Promise.all(requests).then((results) => {
      seedData.seeds = JSON.parse(results[0]);

      if (generateSurname)
        seedData.surnameSeeds = JSON.parse(results[1]);

      return seedData;
    }).catch((err) => {
      this.logger.log('Error while generating seed data for JsonSeedRepository.');
      this.logger.log(`Filename: ${requestUri}`);
      this.logger.log(`Race ${seedData.selectedRace}, Gender ${seedData.selectedGender}`);
      this.logger.log(err);
      seedData.error.push('An error occurred while generating seed data for name generation. This has been logged and will be fixed soon:tm:.');
      return seedData;
    });
  }
}
