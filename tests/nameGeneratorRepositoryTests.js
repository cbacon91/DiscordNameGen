/* eslint-disable no-new, no-useless-constructor, no-empty-function */
// disable no-new because ctors blowing up is a reasonable test imo; also turning off other rules
// for mock ctors
const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');
const extensions = require('../extensions');

const mockSeedDataRepository =
    class SeedDataRepository {
      constructor(innerRepo) {}
      getSeedData(inArgs) {
        return {
          seeds: ['juan'],
          error: inArgs.provideError ? 'error' : '',
          message: inArgs.provideMessage ? 'message' : '',
        };
      }
    };

const generators = requireInject('../commands/namegenerator/generators', {
  '../commands/namegenerator/generators/seeds': {
    SeedDataRepository: mockSeedDataRepository,
  },
});

extensions(); // load up Math.randomInt

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

describe('api generator', () => {
  it('should throw error because not implemented', () => {
    assert.throws(() => {
      new generators.ApiGenerator('url');
    });
  });
});

describe('markov chain generator', () => {
  it('should throw error because not implemented', () => {
    assert.throws(() => {
      new generators.MarkovChainGenerator(mockSeedDataRepository);
    });
  });
});

describe('name generator repository - container', () => {
  it('should throw error if inner generator not supplied', () => {
    assert.throws(() => {
      new generators.NameGeneratorRepository();
    });
  });

  it('should throw error if args are not supplied to generate name', () => {
    assert.throws(() => {
      const mockInnerGen = {
        generateName: args => 'juan',
      };

      const repo = new generators.NameGeneratorRepository(mockInnerGen);
      repo.generateName();
    });
  });

  it("should return innergenerator's name", () => {
    const mockInnerGen = {
      generateName: args => 'juan',
    };

    const repo = new generators.NameGeneratorRepository(mockInnerGen);
    const name = repo.generateName({});
    assert.strictEqual(name, 'juan');
  });
});


describe('random selector generator', () => {
  it('should throw error with no args', () => {
    assert.throws(() => {
      const generator = new generators.RandomSelectorGenerator();
      generator.generateName();
    });
  });

  it('should return early with error message if there is error from seedData', () => {
    const generator = new generators.RandomSelectorGenerator();
    const generated = generator.generateName({
      provideError: true,
    });

    assert.deepEqual(generated, {
      names: [],
      error: 'error',
      message: '',
    });
  });

  it('should add message if there is message from seedData', () => {
    const generator = new generators.RandomSelectorGenerator();
    const generated = generator.generateName({
      provideMessage: true,
      nameCount: 1,
    });

    assert.deepEqual(generated, {
      names: ['juan'],
      error: '',
      message: 'message',
    });
  });
});
