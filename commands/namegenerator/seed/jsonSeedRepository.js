class JsonSeedRepository {
    getSeedData(args) {
        //todo
        //pick random args.races
        //pick random args.genders
        const race = args.races[0];
        const gender = args.genders[0];

        const seed = require(`./jsonSeedData/${race}${gender}`);
        return seed;
    }
}

module.exports = JsonSeedRepository;
