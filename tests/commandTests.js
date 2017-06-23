/* eslint-disable no-new */
// disable no-new because ctors blowing up is a reasonable test imo
const mocha = require('mocha');
const chai = require('chai');
const requireInject = require('require-inject');
const extensions = require('../extensions');

let lastLoggedMsg = '';
const commands = requireInject('../commands', {
  os: {
    EOL: '\r\n',
  },
  '../logger': {
    log: (msg) => {
      lastLoggedMsg = msg;
    },
  },
});

extensions(); // load up Math.randomInt

const describe = mocha.describe;
const it = mocha.it;
const assert = chai.assert;

mocha.beforeEach(() => {
  lastLoggedMsg = '';
});

mocha.afterEach(() => {
  lastLoggedMsg = '';
});

describe('command base', () => {
  it('should throw error when not provided client', () => {
    assert.throws(() => {
      new commands.CommandBase(null, {});
    });
  });

  it('should throw error when not provided cmdData', () => {
    assert.throws(() => {
      new commands.CommandBase({}, null);
    });
  });

  it('should throw error when not provided cmdData.name', () => {
    assert.throws(() => {
      new commands.CommandBase({}, {});
    });
  });

  it('should reply successfully', () => {
    const base = new commands.CommandBase({}, {
      name: 'test',
    });
    const cmdMock = {
      channel: {
        send: msg => Promise.resolve(msg),
      },
    };

    return base
      .send('test msg', cmdMock)
      .then((reply) => {
        assert.strictEqual(reply, 'test msg');
      });
  });

  it('should log error if error', () => {
    const base = new commands.CommandBase({}, {
      name: 'test',
    });
    const cmdMock = {
      channel: {
        send: msg => Promise.reject(msg),
      },
      content: 'command',
    };

    return base
      .send('test msg', cmdMock)
      .then(() => {
        // success cb; it failed, ignore
        assert.strictEqual(lastLoggedMsg, 'Failed on replying :: Original message: "command" :: Error: "test msg"');
      });
  });
});
