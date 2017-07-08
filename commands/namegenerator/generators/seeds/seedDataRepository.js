class SeedDataRepository {
  constructor(innerRepository) {
    if (!innerRepository)
      throw new Error('inner seed repository not provided');

    this.innerRepository = innerRepository;
  }

  getSeedData(args) {
    return this.innerRepository.getSeedData(args);
  }
}

module.exports = SeedDataRepository;
