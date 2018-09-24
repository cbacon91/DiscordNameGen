import { Logger } from './logger';

export class ConsoleLogger extends Logger {
  log(s: string): void {
    console.log(s);
  }
}