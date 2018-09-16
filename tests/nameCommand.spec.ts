import { NameCommand } from '../src/commands/nameCommand';
import { Logger } from '../src/logger';
import { NameArgsParser } from '../src/commands/namecommand/nameArgsParser';
import { NameRepository } from '../src/commands/namecommand/nameRepository';
import { NameArgs } from '../src/commands/namecommand/nameArgs';
import { TextChannel, Message } from 'discord.js';
import { GeneratedNames } from '../src/commands/namecommand/generatedNames';

describe('nameCommand', () => {
  let command: NameCommand;
  let logger: jasmine.SpyObj<Logger>;
  let parser: jasmine.SpyObj<NameArgsParser>;
  let repo: jasmine.SpyObj<NameRepository>;
  let channel: jasmine.SpyObj<TextChannel>;
  let message: jasmine.SpyObj<Message>;

  beforeEach(() => {
    channel = jasmine.createSpyObj('channel', ['send']);
    logger = jasmine.createSpyObj('logger', ['log']);
    parser = jasmine.createSpyObj('parser', ['parseArgs']);
    repo = jasmine.createSpyObj('repo', ['getNamesAsync']);


    command = new NameCommand(logger, parser, repo);
    message = jasmine.createSpyObj('message', ['channel']);
    (<any>message.channel) = channel;
  });

  describe('run', () => {
    it('should return early if args error', async () => {
      const errMsg = 'oops';
      parser.parseArgs.and.returnValue(new NameArgs({
        error: [errMsg]
      }));

      await command.run(message, 'arg');

      expect(channel.send).toHaveBeenCalledWith([`**${errMsg}**`]);
      expect(repo.getNamesAsync).not.toHaveBeenCalled();
    });

    it('should return early if generated error', async () => {
      const errMsg = 'oops';
      parser.parseArgs.and.returnValue(new NameArgs());
      repo.getNamesAsync.and.returnValue(new GeneratedNames({
        error: [errMsg]
      }));

      await command.run(message, 'arg');

      expect(channel.send).toHaveBeenCalledWith([`**${errMsg}**`]);
      expect(repo.getNamesAsync).toHaveBeenCalled();
    });

    it('should return include args messages', async () => {
      const msg = 'random';
      parser.parseArgs.and.returnValue(new NameArgs({
        message: [msg]
      }));
      repo.getNamesAsync.and.returnValue(new GeneratedNames({}));

      await command.run(message, 'arg');

      expect(channel.send).toHaveBeenCalledWith([`*${msg}*`, '']);
      expect(repo.getNamesAsync).toHaveBeenCalled();
    });

    it('should return include generated messages', async () => {
      const msg = 'random';
      parser.parseArgs.and.returnValue(new NameArgs({
      }));
      repo.getNamesAsync.and.returnValue(new GeneratedNames({
        message: [msg]
      }));

      await command.run(message, 'arg');

      expect(channel.send).toHaveBeenCalledWith([`*${msg}*`, '']);
      expect(repo.getNamesAsync).toHaveBeenCalled();
    });

    it('should return include names', async () => {
      const name = 'tom foolery';
      parser.parseArgs.and.returnValue(new NameArgs({}));
      repo.getNamesAsync.and.returnValue(new GeneratedNames({
        names: [name]
      }));

      await command.run(message, 'arg');

      expect(channel.send).toHaveBeenCalledWith(['',name]);
      expect(repo.getNamesAsync).toHaveBeenCalled();
    });
  });

});