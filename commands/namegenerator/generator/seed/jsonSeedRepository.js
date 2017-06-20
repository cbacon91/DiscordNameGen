class JsonSeedRepository {
    getSeedData(args) {
        const race = args.races[Math.randomInt(0, args.races.length)];
        const gender = args.genders[Math.randomInt(0, args.genders.length)];

        const seed = require(`./jsonSeedData/${race}${gender}`);
        return seed;
    }
}

module.exports = JsonSeedRepository;
