class NameGeneratorRepository {
  constructor(innerGenerator) {
    if (!innerGenerator)
      throw new Error('generator type must be provided!');

    this.innerGenerator = innerGenerator;
  }

  validateArgs(args) {
    if (!args)
      throw new Error('args must be supplied to generate a new name');
  }

  generateNameAsync(args) {
    this.validateArgs(args);
    return this.innerGenerator.generateNameAsync(args);
  }
}

module.exports = NameGeneratorRepository;
