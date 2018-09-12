// import { CommandBase } from "./commandBase";
// import { DiscordClient } from "../discordClient";
// import { NameArgsParser } from "./argsParsers/nameGeneratorArgsParser";
// import { Message } from "discord.js";
// import { NameArgs } from "./argsParsers/nameGeneratorArgs";

// const DISCORD_MESSAGE_CHARACTER_LIMIT = 2000;
// const REMOVE_TOKEN = '$#'; // arbitrary token to remove.
// const MESSAGE_TOO_LONG = `*The list of names would exceed Discord's character limit. Removed ${REMOVE_TOKEN} name(s).*`;
// const cmdTitle = 'name';

// class NameCommand extends CommandBase {
//   constructor(
//       protected readonly client: DiscordClient, 
//       protected readonly argsParser: NameArgsParser, 
//       protected readonly nameGeneratorRepository: any
//     ) {

//     super(client, {
//       name: cmdTitle,
//       usage: 'name [Race ...] [Gender ...] [NameCount]',
//       description: 'Picks a name from a list of names based on race and gender.',
//     });
//   }

//   async run(message: Message, args: string) {
//     const parsedArgs = this.argsParser.parseArgs(args);

//     if (parsedArgs.error)
//       return this.send(`**${parsedArgs.error}**`, message);

//     const generated = await this.nameGeneratorRepository.generateNameAsync(parsedArgs);

//     if (generated.error)
//       return this.send(`**${generated.error}**`, message);

//     return this.send(this.buildReply(parsedArgs, generated), message);
//   }

//   buildReply(parsedArgs: NameArgs, generated:any) {
//     let replyMessage = '';

//     if (parsedArgs.message || generated.message) {
//       replyMessage += `*${parsedArgs.message}${generated.message}`;
//       // cut off the ending this.NEWLINE so the * can be next to a character
//       replyMessage = replyMessage.substring(0, replyMessage.length - 2);
//       replyMessage += '*'.concat(this.NEWLINE, this.NEWLINE);
//     }

//     let nameList = generated.names.join(this.NEWLINE);

//     if (this.isMessageTooLong(nameList, replyMessage)) {
//       replyMessage += MESSAGE_TOO_LONG;

//       let isRemovingNames = true;
//       let removedNames = 0;
//       while (isRemovingNames) {
//         generated.names.pop();
//         removedNames += 1;
//         nameList = generated.names.join(this.NEWLINE);

//         if (!this.isMessageTooLong(nameList, replyMessage)) isRemovingNames = false;
//       }
//       replyMessage = replyMessage.replace(REMOVE_TOKEN, removedNames) + this.NEWLINE + this.NEWLINE;
//     }

//     replyMessage += nameList;

//     return replyMessage;
//   }

//   isMessageTooLong(names: string[], currentMessage: string): boolean {
//     return names.length + currentMessage > DISCORD_MESSAGE_CHARACTER_LIMIT;
//   }
// }

// module.exports = NameCommand;
