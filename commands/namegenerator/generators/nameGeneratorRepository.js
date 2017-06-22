class NameGeneratorRepository {
  constructor(innerGenerator) {
    if (!innerGenerator)
      throw new Error('generator type must be provided!');

    this.innerGenerator = innerGenerator;
  }

  generateName(args) {
    return this.innerGenerator.generateName(args);
  }
}

module.exports = NameGeneratorRepository;
