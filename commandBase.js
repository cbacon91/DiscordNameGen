class CommandBase {
  constructor(client, cmdData) {
    if (!client) 
      throw 'Missing client';
    if (!cmdData) 
      throw 'Missing CmdData';
    if (!cmdData.name) 
      throw 'Missing CmdData.name';

    this.client = client;
    this.name = cmdData.name;
    this.description = cmdData.description;
    this.usage = cmdData.usage;
    this.NEWLINE = require('os').EOL;
  }

  send(messageText, originalCommand) {
    try {
      originalCommand.channel
        .send(messageText)
        .then((t) => {
          // is it necessary to do anything on success?
          // long-term - log these so I can see what is most common?
        }, (r) => {
          console.log(`Failed on replying :: Original message: "${originalCommand.content}" :: Error: "${r}"`);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = CommandBase;
