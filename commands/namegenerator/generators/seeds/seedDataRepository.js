class SeedDataRepository {
  constructor(innerRepository) {
    if (!innerRepository)
      throw new Error('inner seed repository not provided');

    this.innerRepository = innerRepository;
  }

  getSeedData(args) {
    return this.innerRepository.getSeedData(args);
  }

  getSeedDataAsync(args) {
    return this.innerRepository.getSeedDataAsync(args);
  }
}

module.exports = SeedDataRepository;
