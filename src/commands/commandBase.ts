import { CommandData } from "./commandData";
import { Message, Client } from "discord.js";

export abstract class CommandBase {

  protected readonly NEWLINE: string = '\r\n';

  constructor (
    public readonly client: DiscordClient,
    public readonly commandData: CommandData
  ) {}

  public abstract run(msg: Message, args: string): void;

  send(messageText: string, originalMessage: Message) {
    try {
      return originalMessage.channel
        .send(messageText)
        .then(t => t
          // is it necessary to do anything on success?
          // long-term - log these so I can see what is most common?
          // just return the message back, useful for testing at least
          , (r) => {
            console.log(`Failed on replying :: Original message: "${originalMessage.content}" :: Error: "${r}"`);
            return r;
          });
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
