const config = require('../config'); //todo let's stop using ../../
const NameGeneratorRepository = require('./namegenerator/generator/nameGeneratorRepository');
const ArgsParser = require('./namegenerator/argsParser');
const CommandBase = require('../commandBase');

const DISCORD_MESSAGE_CHARACTER_LIMIT = 2000;
const NEWLINE = require('os').EOL;
const REMOVE_TOKEN = '$#'; //arbitrary token to remove.
const MESSAGE_TOO_LONG = `The list of names would exceed Discord's character limit. Removed ${REMOVE_TOKEN} names.`;

class NameGenerationCommand extends CommandBase {
    constructor(client) {
        const cmdTitle = "name";

        super(client, {
            name: cmdTitle,
            usage: 'name [Race ...] [Gender ...] [NameCount]',
            description: "Picks a name from a list of names based on race and gender.",
        });

        this.nameGeneratorRepository = new NameGeneratorRepository();
        this.argsParser = new ArgsParser();
    }

    async run(message, args) {
        const parsedArgs = this.argsParser.parseArgs(args);

        if(parsedArgs.error) {
            message.channel.send(`**${parsedArgs.error}**`); 
            return; //if there was an error, just get out of here.
        }

        const generated = this.nameGeneratorRepository.generateName(parsedArgs);
        
        if(generated.error) {
            message.channel.send(`**${generated.error}**`); 
            return; //if there was an error, just get out of here.
        }
        
        message.channel.send(this.buildReply(parsedArgs, generated)); 
    }

    buildReply(parsedArgs, generated) {
        let replyMessage = '';

        if(parsedArgs.message || generated.message) {
            replyMessage += `*${parsedArgs.message}${generated.message}`;
            replyMessage = replyMessage.substring(0, replyMessage.length - 2); //cut off the ending newline so the * can be next to a character
            replyMessage += '*'; 
            replyMessage += NEWLINE;
            replyMessage += NEWLINE;
        }

        let nameList = generated.names.join(NEWLINE);

        if(this.isMessageTooLong(nameList, replyMessage))
        {
            replyMessage += MESSAGE_TOO_LONG;

            let isRemovingNames = true;
            let removedNames = 0;
            while(isRemovingNames) {
                generated.names.pop();
                removedNames++;
                nameList = generated.names.join(NEWLINE);

                if(!this.isMessageTooLong(nameList, replyMessage)) 
                    isRemovingNames = false;
            }
            replyMessage.replace(REMOVE_TOKEN, removedNames);
        }

        replyMessage += nameList;

        return replyMessage;
    }

    isMessageTooLong(names, currentMessage) {
        return names.length + currentMessage > DISCORD_MESSAGE_CHARACTER_LIMIT;
    }
}

module.exports = NameGenerationCommand;
