class RandomSelectorGenerator {
    generateName(seed) {
        const selected = Math.randomInt(0, seed.length);
        return seed[selected];
    }
}

module.exports = RandomSelectorGenerator;
