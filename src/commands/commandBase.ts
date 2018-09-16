import { CommandData } from './commandData';
import { Message, RichEmbed } from 'discord.js';
import { Logger } from '../logger';

export abstract class CommandBase {

  constructor (
    public readonly logger: Logger,
    public readonly commandData: CommandData,
  ) {}

  public abstract run(msg: Message, _args: string): void;

  sendEmbed(embed: RichEmbed | undefined, originalMessage: Message): Promise<any> {
    if(embed === undefined) {
      return this.send('', originalMessage);
    }
    
    try {
      return originalMessage.channel
        .send('', { embed: embed})
        .then(t => t
          // is it necessary to do anything on success?
          // long-term - log these so I can see what is most common?
          // just return the message back, useful for testing at least
          , (r) => {
            this.logger.log(`Failed on replying :: Original message: "${originalMessage.content}" :: Error: "${r}"`);
            return r;
          });
    } catch (e) {
      this.logger.log(e);
      return e;
    }
  }

  send(messageText: string | string[], originalMessage: Message): Promise<any> {
    if(!messageText || !messageText.length) {
      messageText = '**An error occurred while generating a reply. Please try again later.**';
    }

    try {
      return originalMessage.channel
        .send(messageText)
        .then(t => t
          // is it necessary to do anything on success?
          // long-term - log these so I can see what is most common?
          // just return the message back, useful for testing at least
          , (r) => {
            this.logger.log(`Failed on replying :: Original message: "${originalMessage.content}" :: Error: "${r}"`);
            return r;
          });
    } catch (e) {
      this.logger.log(e);
      return e;
    }
  }
}
