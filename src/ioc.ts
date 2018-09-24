import { ConsoleLogger } from './consoleLogger';
import { Utility } from './utility';
import { NameArgsParser } from './commands/namecommand/nameArgsParser';
import { RaceFactory } from './commands/models/raceFactory';
import { JsonRandomSelectorRepository } from './commands/namecommand/jsonRandomSelectorRepository';
import { Logger } from './logger';


// setup so that the 'e2e' tests and real config work together. If I ever change the source of something (such as the underlying repository), the tests are updated automatically.
const ioc = new Map();

export enum Resolution {
  Logger,
  Utility,
  RaceFactory,
  NameArgsParser,
  NameRepository
}

export function Resolve<T>(target: Resolution): T {
  return <T>ioc.get(target)();
}

ioc.set(Resolution.Logger, () => new ConsoleLogger());
ioc.set(Resolution.Utility, () => new Utility());
ioc.set(Resolution.RaceFactory, () => new RaceFactory(Resolve<Utility>(Resolution.Utility)));
ioc.set(Resolution.NameArgsParser, () => new NameArgsParser(Resolve<RaceFactory>(Resolution.RaceFactory)));
ioc.set(Resolution.NameRepository, () => new JsonRandomSelectorRepository(Resolve<Utility>(Resolution.Utility), Resolve<Logger>(Resolution.Logger)));
