const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');

const argsParsers = requireInject('../src/commands/argsParsers', {
  os: {
    EOL: '\r\n',
  },
});

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

describe('name generator args parsers', () => {
  let parser, expectedDwarf, expectedHuman, expectedElf, expectedHalfling;

  mocha.beforeEach(() => {
    parser = new argsParsers.NameGeneratorArgsParser();

    // setup common expectations for deepEquals
    // these are hard-coded instead of pulled from races.js to test backwards compatibility
    expectedDwarf = { name: 'dwarf', isClanBased: true, keys: ['d', 'dwarf', 'dwarfen', 'dwarven', 'dwarfish', 'dwarvish'] };
    expectedHalfling = { name: 'halfling', isClanBased: true, keys: ['h', 'halfling', 'hobbit', 'kender'] };
    expectedElf = { name: 'elf', keys: ['e', 'elf', 'elfen', 'elven', 'elfish', 'elvish'] };
    expectedHuman = { name: 'human', keys: ['human', 'person', 's', 'standard', 'n', 'normal'] };
  });

  mocha.afterEach(() => {
    parser = null;
  });

  it('should determine if a string is a race correctly', () => {
    assert.isTrue(parser.isRace('dwarf'));
    assert.isTrue(parser.isRace('d'));
  });

  it('should reject invalid race strings', () => {
    assert.isFalse(parser.isRace('hooligan'));
    assert.isFalse(parser.isRace(''));
    assert.isFalse(parser.isRace({}));
  });

  it('should determine if a string is a gender correctly', () => {
    assert.isTrue(parser.isGender('female'));
    assert.isTrue(parser.isGender('f'));
    assert.isTrue(parser.isGender('man'));
  });

  it('should reject invalid gender string', () => {
    assert.isFalse(parser.isGender('chickadee'));
    assert.isFalse(parser.isGender('bruh'));
    assert.isFalse(parser.isGender({}));
  });

  it('should determine if a string is count', () => {
    assert.isTrue(parser.isCount('20'));
    assert.isTrue(parser.isCount('200'));
  });

  it('should reject if a string is not real count', () => {
    assert.isFalse(parser.isCount('-1'));
    assert.isFalse(parser.isCount('burrito'));
    assert.isFalse(parser.isCount('ten'));
    assert.isFalse(parser.isCount({}));
  });

  it('should parse race given correct input', () => {
    assert.deepEqual(parser.parseRaces('d'), [expectedDwarf]);
    assert.deepEqual(parser.parseRaces('dwarf'), [expectedDwarf]);
    assert.deepEqual(parser.parseRaces('halfling'), [expectedHalfling]);
    assert.deepEqual(parser.parseRaces('hobbit'), [expectedHalfling]);
  });

  it('should parse human and halfrace for half-elf and halfelf', () => {
    assert.deepEqual(parser.parseRaces('half-elf'), [expectedHuman, expectedElf]);
    assert.deepEqual(parser.parseRaces('halfelf'), [expectedHuman, expectedElf]);
    assert.deepEqual(parser.parseRaces('half-dwarf'), [expectedHuman, expectedDwarf]);
    assert.deepEqual(parser.parseRaces('halfhalfling'), [expectedHuman, expectedHalfling]);
  });

  // is this test invalid? do we want it to random given bad input?
  it('should default to human given bad race input', () => {
    // should parseRaces throw error if not given a string?
    assert.deepEqual(parser.parseRaces('bruh'), [expectedHuman]);
    assert.deepEqual(parser.parseRaces({}), [expectedHuman]);
    assert.deepEqual(parser.parseRaces([]), [expectedHuman]);
  });

  it('should parse gender given correct input', () => {
    assert.strictEqual(parser.parseGender('m'), 'male');
    assert.strictEqual(parser.parseGender('male'), 'male');
    assert.strictEqual(parser.parseGender('f'), 'female');
    assert.strictEqual(parser.parseGender('woman'), 'female');
  });

  // is this test invalid? do we want it to random given bad input?
  it('should default to male given bad input', () => {
    assert.strictEqual(parser.parseGender('bruh'), 'male');
    assert.strictEqual(parser.parseGender('chickadee'), 'male');
    // should parseRaces throw error if not given a string?
    assert.strictEqual(parser.parseGender({}), 'male');
  });

  it('should parse count given valid input', () => {
    assert.strictEqual(parser.parseCount('10', {}), 10);
    assert.strictEqual(parser.parseCount('15', {}), 15);
  });

  it('should reset count if max value exceeded', () => {
    const parsedArgs = {
      message: '',
    };

    assert.strictEqual(parser.parseCount('100', parsedArgs), 20);
  });

  it('should return message if max value exceeded', () => {
    const parsedArgs = {
      message: '',
    };

    parser.parseCount('100', parsedArgs);
    assert.notStrictEqual(parsedArgs.message, '');
  });

  it('should parse all args with no error', () => {
    const inArgs = 'dwarven female 20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedDwarf],
      genders: ['female'],
      nameCount: 20,
      error: '',
      message: '',
    });
  });

  it('should parse multiple race args with no error', () => {
    const inArgs = 'dwarven elven female 20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedDwarf, expectedElf],
      genders: ['female'],
      nameCount: 20,
      error: '',
      message: '',
    });
  });

  it('should parse multiple gender args with no error', () => {
    const inArgs = 'dwarven female male 20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedDwarf],
      genders: ['female', 'male'],
      nameCount: 20,
      error: '',
      message: '',
    });
  });

  it('should parse norace args with message', () => {
    const inArgs = 'female 20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedHuman],
      genders: ['female'],
      nameCount: 20,
      error: '',
      message: 'Race not specified or found; using default (human)\r\n',
    });
  });

  it('should parse nogender args with message', () => {
    const inArgs = 'dwarf 20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedDwarf],
      genders: ['male'],
      nameCount: 20,
      error: '',
      message: 'Gender not specified or found; using default (male)\r\n',
    });
  });

  it('should parse nogender norace args with messages', () => {
    const inArgs = '20';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedHuman],
      genders: ['male'],
      nameCount: 20,
      error: '',
      message: 'Gender not specified or found; using default (male)\r\nRace not specified or found; using default (human)\r\n',
    });
  });

  it('should parse noargs with messages', () => {
    const inArgs = '';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [expectedHuman],
      genders: ['male'],
      nameCount: 1,
      error: '',
      message: 'Gender not specified or found; using default (male)\r\nRace not specified or found; using default (human)\r\n',
    });
  });

  it('should have error with multiple namecount supplied', () => {
    const inArgs = '20 15';

    const parsed = parser.parseArgs(inArgs);

    assert.deepEqual(parsed, {
      races: [],
      genders: [],
      nameCount: 20,
      error: 'Already specified name count - can only take one name count!',
      message: '',
    });
  });
});
