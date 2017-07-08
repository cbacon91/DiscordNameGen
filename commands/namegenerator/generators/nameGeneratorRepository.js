class NameGeneratorRepository {
  constructor(innerGenerator) {
    if (!innerGenerator)
      throw new Error('generator type must be provided!');

    this.innerGenerator = innerGenerator;
  }

  generateName(args) {
    if (!args)
      throw new Error('args must be supplied to generate a new name');

    return this.innerGenerator.generateName(args);
  }
}

module.exports = NameGeneratorRepository;
