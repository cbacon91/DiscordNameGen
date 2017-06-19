class JsonSeedRepository {
    getSeedData(args) {
        const seed = require('./humanMale');
        return seed;
    }
}

module.exports = JsonSeedRepository;
