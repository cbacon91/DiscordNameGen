const newline = require('os').EOL;
const Logger = require('../logger');

class CommandBase {
  constructor(client, cmdData) {
    if (!client)
      throw new Error('Missing client');
    if (!cmdData)
      throw new Error('Missing CmdData');
    if (!cmdData.name)
      throw new Error('Missing CmdData.name');

    this.client = client;
    this.name = cmdData.name;
    this.description = cmdData.description;
    this.usage = cmdData.usage;
    this.NEWLINE = newline;
  }

  send(messageText, originalCommand) {
    try {
      return originalCommand.channel
        .send(messageText)
        .then(t => t
          // is it necessary to do anything on success?
          // long-term - log these so I can see what is most common?
          // just return the message back, useful for testing at least
          , (r) => {
            Logger.log(`Failed on replying :: Original message: "${originalCommand.content}" :: Error: "${r}"`);
            return r;
          });
    } catch (e) {
      Logger.log(e);
      return e;
    }
  }
}

module.exports = CommandBase;
