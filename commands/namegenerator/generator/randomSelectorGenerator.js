class RandomSelectorGenerator {
    generateName(seed) {
        const min = 0;
        const max = seed.length;
        const selected = Math.floor(Math.random() * (max - min)) + min;
        return seed[selected];
    }
}

module.exports = RandomSelectorGenerator;
