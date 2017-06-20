const SeedDataRepository = require('./seed/seedDataRepository');

class SeededGenerator {
    constructor() {
        this.seedDataRepository = new SeedDataRepository();
    }

    getSeedData(args) {
        return this.seedDataRepository.getSeedData(args);
    }
}

module.exports = SeededGenerator;
