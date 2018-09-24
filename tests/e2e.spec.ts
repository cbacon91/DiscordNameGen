import { NameCommand } from '../src/commands/nameCommand';
import { TextChannel, Message } from 'discord.js';
import { Resolve, Resolution } from '../src/ioc';
import { Logger } from '../src/logger';
import { NameArgsParser } from '../src/commands/namecommand/nameArgsParser';
import { NameRepository } from '../src/commands/namecommand/nameRepository';
import { RaceArray } from '../src/commands/models/races';
import { Race } from '../src/commands/models/race';


describe('nameCommand', () => {
  let command: NameCommand;
  let channel: jasmine.SpyObj<TextChannel>;
  let message: Message;

  const compileArgs = (c: any): string => {
    return `${c.count} ${c.gender} ${c.race.keys[0]}`;
  };

  const hasItalics = (l: string): boolean => {
    return l[0] === '*' && l[l.length - 1] === '*';
  };

  const noMessages20Names = (c: any) => {
    it(`should return 20 names with no message for ${c.race.name} ${c.gender} ${c.count}`, async () => {
      const r = await command.run(message, compileArgs(c));
      expect(channel.send).toHaveBeenCalled();
      expect(r.length).toBe(21); //20 + the blank
      expect(r.some(hasItalics)).toBe(false);
    });
  };

  const randomGender20Names = (c: any) => {
    it(`should return 20 names with random gender message for ${c.race.name} ${c.gender} ${c.count}`, async () => {
      const r = await command.run(message, compileArgs(c));
      expect(channel.send).toHaveBeenCalled();
      expect(r.length).toBe(22); //20 + the blank + the message

      expect(r.some(hasItalics)).toBe(true);
    });
  };

  const noMessages1Name = (c: any) => {
    it(`should return 1 names with no message for ${c.race.name} ${c.gender} ${c.count}`, async () => {
      const r = await command.run(message, compileArgs(c));
      expect(channel.send).toHaveBeenCalled();
      expect(r.length).toBe(2); //1 + the blank
      expect(r.some(hasItalics)).toBe(false);
    });
  };
  
  const randomGender1Names = (c: any) => {
    it(`should return 1 names with random gender message for ${c.race.name} ${c.gender} ${c.count}`, async () => {
      const r = await command.run(message, compileArgs(c));
      expect(channel.send).toHaveBeenCalled();
      expect(r.length).toBe(3); //1 + the blank  + the message
      expect(r.some(hasItalics)).toBe(true);
    });
  };

  beforeEach(() => {
    channel = jasmine.createSpyObj('channel', ['send']);
    channel.send.and.callFake((m: string[], ) => {
      return Promise.resolve(m);
    });

    message = {} as Message;
    message.channel = channel;

    command = new NameCommand(Resolve<Logger>(Resolution.Logger), Resolve<NameArgsParser>(Resolution.NameArgsParser), Resolve<NameRepository>(Resolution.NameRepository));
  });

  RaceArray.forEach((r: Race) => {
    describe(r.name, () => {

      const cases = [
        { race: r, count: 20, gender: 'male', test: noMessages20Names },
        { race: r, count: 20, gender: 'female', test: noMessages20Names },
        { race: r, count: 20, gender: 'male female', test: randomGender20Names },
        { race: r, count: 20, gender: null, test: randomGender20Names },
        { race: r, count: null, gender: 'male', test: noMessages1Name },
        { race: r, count: null, gender: 'female', test: noMessages1Name },
        { race: r, count: null, gender: 'male female', test: randomGender1Names },
        { race: r, count: null, gender: null, test: randomGender1Names },
      ];

      cases.forEach((c: any) => {
        if(c.test) {
          c.test(c);
        }
      });
    });
  });
});

