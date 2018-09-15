import { DiscordClient } from "./src/discordClient";
import { HelpCommand } from "./src/commands/helpCommand";
import { config } from './src/config';
import { Message } from "discord.js";
import { NameCommand } from "./src/commands/nameCommand";
import { NameArgsParser } from "./src/commands/namecommand/nameArgsParser";
import { JsonRandomSelectorRepository } from "./src/commands/namecommand/jsonRandomSelectorRepository";
import { Utility } from "./src/utility";
import { RaceFactory } from "./src/commands/models/raceFactory";
import { ConsoleLogger } from "./src/consoleLogger";


const logger = new ConsoleLogger();
// wait five minutes and try again .. The most common crash is discord losing connection,
// and trying again immediately would fail as well.
const retryIn = 5 * 60 * 1000; //

const maxCrashes = 5;
let crashes = 0; // if only it were that easy...

runBot();

export function runBot() {
  try {
    logger.log(`Initializing Juan Charles for attempt number ${crashes} ...`);
    init();
  } catch (error) {
    crashes += 1;
    logger.log(`Encountered error # ${crashes}:`);
    logger.log(error);

    if (crashes < maxCrashes) {
      logger.log(`Retrying in ${retryIn / 1000 / 60} minutes.`);
      setTimeout(runBot, retryIn);
    } else
      process.exit(500); // just let it die
  }
}

function init() {
  const juan = new DiscordClient();
  const token = config.discord.authToken;

  juan.login(token);

  juan.once('ready', onReady);
  juan.on('message', onMessage);
  juan.on('disconnect', onDisconnect);

  function onDisconnect() {
    process.exitCode = 0;
  }

  function onReady() {
    const util = new Utility();

    juan.commands.set('help', new HelpCommand(juan, logger));
    juan.commands.set('name', new NameCommand(juan, logger,
      new NameArgsParser(new RaceFactory(util)),
      new JsonRandomSelectorRepository(util, logger)
    ));

    logger.log(`Setup Complete. Active in ${juan.guilds.size} servers.`);
  }

  function onMessage(msg: Message) {
    if (msg.content === config.discord.authToken) {
      logger.log(`Emergency shut-off requested by ${msg.author.username}#${msg.author.discriminator} id ${msg.author.id}`);
      // exit instead of set exitCode because this needs to be shut off immediately
      process.exit(503);
    }

    if (msg.author.bot)
      return;

    let offset;
    const prefix = msg.guild
      ? config.discord.defaultPrefix // todo let guild set their own prefix.
      : '';

    if (msg.content.trim().startsWith(prefix))
      offset = prefix.length;
    else if (msg.content.trim().startsWith(juan.user.toString()))
      offset = juan.user.toString().length + 1;
    else // if message doesn't start with the prefix or an @mention, just ignore their message.
      return;

    const userInput = msg.content.substring(offset).split(' ')[0].toLowerCase();
    const command = juan.commands.get(userInput);

    if (!command)
      return;

    const args = msg.content.substring(offset + userInput.length).trim();
    command.run(msg, args);
  }
}
