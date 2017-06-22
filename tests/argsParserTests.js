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
    assert.strictEqual(parser.parseRace('d'), 'dwarf');
    assert.strictEqual(parser.parseRace('dwarf'), 'dwarf');
    assert.strictEqual(parser.parseRace('halfling'), 'halfling');
    assert.strictEqual(parser.parseRace('hobbit'), 'halfling');
  });

  // is this test invalid? do we want it to random given bad input?
  it('should default to human given bad race input', () => {
    assert.strictEqual(parser.parseRace('bruh'), 'human');
    // should parseRace throw error if not given a string?
    assert.strictEqual(parser.parseRace({}), 'human');
    assert.strictEqual(parser.parseRace([]), 'human');
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
    // should parseRace throw error if not given a string?
    assert.strictEqual(parser.parseGender({}), 'male');
  });

  it('should parse count given valid input', () => {
    assert.strictEqual(parser.parseCount('10', {}), 10);
    assert.strictEqual(parser.parseCount('25', {}), 25);
  });

  it('should reset count if max value exceeded', () => {
    const parsedArgs = {
      message: '',
    };

    assert.strictEqual(parser.parseCount('100', parsedArgs), 50);
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
      races: ['dwarf'],
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
      races: ['dwarf', 'elf'],
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
      races: ['dwarf'],
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
      races: ['human'],
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
      races: ['dwarf'],
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
      races: ['human'],
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
      races: ['human'],
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
