import { NameCommand } from "../src/commands/nameCommand";
import { Logger } from "../src/logger";
import { NameArgsParser } from "../src/commands/namecommand/nameArgsParser";
import { NameRepository } from "../src/commands/namecommand/nameRepository";
import { NameArgs } from '../src/commands/namecommand/nameArgs';
import { TextChannel, Message, Client } from 'discord.js';

describe('nameCommand', () => {
  let command: NameCommand;
  let logger: jasmine.SpyObj<Logger>;
  let parser: jasmine.SpyObj<NameArgsParser>;
  let repo: jasmine.SpyObj<NameRepository>;
  let channel: jasmine.SpyObj<TextChannel>;
  let message: jasmine.SpyObj<Message>;

  beforeEach(() => {
    channel = jasmine.createSpyObj('channel', ['send']);
    logger = jasmine.createSpyObj('logger', []);
    parser = jasmine.createSpyObj('parser', ['parseArgs']);
    repo = jasmine.createSpyObj('repo', []);

    command = new NameCommand(logger, parser, repo);
message = jasmine.createSpyObj('message', []);
message.channel.and.returnValue(channel);


  });

  describe('run', async () => {
    it('should return early if args error', () => {
      const errMsg = 'oops';
      parser.parseArgs.and.returnValue(new NameArgs({
        error: [errMsg]
      }));
      const message = {
        channel: {
          
        }
      }


    });
  });

});