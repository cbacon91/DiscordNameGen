/* eslint-disable no-new, no-useless-constructor, no-empty-function */
// disable no-new because ctors blowing up is a reasonable test imo; also turning off other rules
// for mock ctors
const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');
const extensions = require('../src/extensions');

const mockSeedDataRepository =
    class SeedDataRepository {
      constructor(innerRepo) {}
      getSeedData(inArgs) {
        return {
          selectedRace: { lacksSurname: true, isGenderless: true },
          seeds: ['juan'],
          surnameSeeds: [],
          error: inArgs.provideError ? 'error' : '',
          message: inArgs.provideMessage ? 'message' : '',
        };
      }
      getSeedDataAsync(inArgs) {
        return Promise.resolve({
          selectedRace: { lacksSurname: true, isGenderless: true },
          seeds: ['juan'],
          surnameSeeds: [],
          error: inArgs.provideError ? 'error' : '',
          message: inArgs.provideMessage ? 'message' : '',
        });
      }
    };

const generators = requireInject('../src/commands/namegenerator/generators', {
  '../src/commands/namegenerator/generators/seeds': {
    SeedDataRepository: mockSeedDataRepository,
  },
});

extensions(); // load up Math.randomInt

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

describe('name generator repository - container', () => {
  it('should throw error if inner generator not supplied', () => {
    assert.throws(() => {
      new generators.NameGeneratorRepository();
    });
  });
});


describe('random selector generator', () => {
  it('should return early with error message if there is error from seedData - generateNameAsync', async () => {
    const generator = new generators.RandomSelectorGenerator();
    const generated = await generator.generateNameAsync({
      provideError: true,
    });

    assert.deepEqual(generated, {
      names: [],
      error: 'error',
      message: '',
    });
  });

  it('should add message if there is message from seedData - generateNameAsync', async () => {
    const generator = new generators.RandomSelectorGenerator();
    const generated = await generator.generateNameAsync({
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
