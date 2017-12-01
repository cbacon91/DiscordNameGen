const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');

const argsParsers = requireInject('../commands/argsParsers', {
  os: {
    EOL: '\r\n',
  },
});

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

describe('name generator args parsers', () => {
  let parser;

  mocha.beforeEach(() => {
    parser = new argsParsers.NameGeneratorArgsParser();
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
    assert.deepEqual(parser.parseRaces('d'), [{ name: 'dwarf', isClanBased: true }]);
    assert.deepEqual(parser.parseRaces('dwarf'), [{ name: 'dwarf', isClanBased: true }]);
    assert.deepEqual(parser.parseRaces('halfling'), [{ name: 'halfling', isClanBased: true }]);
    assert.deepEqual(parser.parseRaces('hobbit'), [{ name: 'halfling', isClanBased: true }]);
  });

  it('should parse human and halfrace for half-elf and halfelf', () => {
    assert.deepEqual(parser.parseRaces('half-elf'), [{ name: 'human' }, { name: 'elf' }]);
    assert.deepEqual(parser.parseRaces('halfelf'), [{ name: 'human' }, { name: 'elf' }]);
    assert.deepEqual(parser.parseRaces('half-dwarf'), [{ name: 'human' }, { name: 'dwarf', isClanBased: true }]);
    assert.deepEqual(parser.parseRaces('halfhalfling'), [{ name: 'human' }, { name: 'halfling', isClanBased: true }]);
  });

  // is this test invalid? do we want it to random given bad input?
  it('should default to human given bad race input', () => {
    // should parseRaces throw error if not given a string?
    assert.deepEqual(parser.parseRaces('bruh'), [{ name: 'human' }]);
    assert.deepEqual(parser.parseRaces({}), [{ name: 'human' }]);
    assert.deepEqual(parser.parseRaces([]), [{ name: 'human' }]);
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
      races: [{ name: 'dwarf', isClanBased: true }],
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
      races: [{ name: 'dwarf', isClanBased: true }, { name: 'elf' }],
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
      races: [{ name: 'dwarf', isClanBased: true }],
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
      races: [{ name: 'human' }],
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
      races: [{ name: 'dwarf', isClanBased: true }],
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
      races: [{ name: 'human' }],
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
      races: [{ name: 'human' }],
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
