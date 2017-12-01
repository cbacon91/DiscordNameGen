/* eslint-disable no-new */
// disable no-new because ctors blowing up is a reasonable test imo
const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');
const extensions = require('../extensions');

const seeds = requireInject('../commands/namegenerator/generators/seeds', {
  os: {
    EOL: '\r\n',
  },
  fs: {
    readFileSync: (path, options) => '["juan", "charles"]',
    readFileAsync: (path, options) => Promise.resolve('["juan", "charles"]'),
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
});

describe('json seed repository async', () => {
  let repo;

  mocha.beforeEach(() => {
    repo = new seeds.JsonSeedRepository();
  });

  mocha.afterEach(() => {
    repo = null;
  });

  it('should return error without args', () => repo.getSeedDataAsync()
    .then((seedData) => {
      assert.strictEqual(seedData.error, 'args must be provided to generate seed data');
    }));

  it('should return error without race args', () => repo.getSeedDataAsync({
    genders: ['male'],
  }).then((seedData) => {
    assert.strictEqual(seedData.error, 'at least one race must be provided to generate see data');
  }));

  it('should return error without gender args', () => repo.getSeedDataAsync({
    races: ['dwarf'],
  }).then((seedData) => {
    assert.strictEqual(seedData.error, 'at least one gender must be provided to generate seed data');
  }));

  it('should return a message for multiple races', () => repo.getSeedDataAsync({
    races: ['human', 'elf'],
    genders: ['male'],
  }).then((seedData) => {
    assert.isTrue(seedData.message.includes('Multiple races specified: generating '));
  }));

  it('should return a message for multiple genders', () => repo.getSeedDataAsync({
    races: ['human'],
    genders: ['male', 'female'],
  }).then((seedData) => {
    assert.isTrue(seedData.message.includes('Multiple genders specified: generating '));
  }));

  it('should return seed data with valid args', () => repo.getSeedDataAsync({
    races: ['human'],
    genders: ['male'],
  }).then((seedData) => {
    assert.deepEqual(seedData.seeds, [
      'juan',
      'charles',
    ]);
  }));
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
