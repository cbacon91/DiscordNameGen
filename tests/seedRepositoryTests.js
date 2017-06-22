const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');
const extensions = require('../extensions');

const seeds = requireInject('../commands/namegenerator/generators/seeds', {
  os: {
    EOL: '\r\n',
  },
  fs: {
    readFileSync: (a, b) => ['juan', 'charles'],
  },
});

extensions(); // load up Math.randomInt

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

describe('seed data repository (container)', () => {
  it('should throw error when not provided dependency', () => {
    assert.throws(() => {
      new seeds.SeedDataRepository();
    });
  });

  it('should get seed data from innerRepo', () => {
    const innerRepoMock = {
      getSeedData: () => ['bruh', 'bruh2'],
    };

    const repo = new seeds.SeedDataRepository(innerRepoMock);
    assert.deepEqual(repo.getSeedData(), ['bruh', 'bruh2']);
  });
});

describe('json seed repository', () => {
  it('te', () => {
    const repo = new seeds.JsonSeedRepository();

    const seedData = repo.getSeedData({
      races: ['human'],
      genders: ['male'],
    });

    console.log(seedData);
  });
});

// todo fix after implement
describe('mongo seed repository', () => {
  it('should throw not implemented', () => {
    assert.throws(() => {
      new seeds.MongoSeedRepository();
    });
  });
});

// todo fix after implement
describe('api seed repository', () => {
  it('should throw not implemented', () => {
    assert.throws(() => {
      new seeds.ApiSeedRepository();
    });
  });
});
