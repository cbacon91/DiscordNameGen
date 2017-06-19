class JsonSeedRepository {
    getSeedData(args) {
        const seed = require(`./${args.race}${args.gender}`);
        return seed;
    }
}

module.exports = JsonSeedRepository;
