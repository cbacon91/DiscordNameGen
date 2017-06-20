const commando = require('discord.js-commando');
const config = require('../../config'); //todo let's stop using ../../
const NameGeneratorRepository = require('./generator/nameGeneratorRepository');
const ArgsParser = require('./argsParser');

const DISCORD_MESSAGE_CHARACTER_LIMIT = 2000;
const NEWLINE = require('os').EOL;

class NameGenerationCommand extends commando.Command {
    constructor(client) {
        const cmdTitle = "name";

        super(client, {
            name: cmdTitle,
            memberName: cmdTitle,
            description: "Picks a name from a list of names based on race and gender",
            group: "namegenerator"
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

        replyMessage += generated.names.join(NEWLINE);

        // deal with 2000 character limit!
        // it *probably* won't ever be hit with a max of 50 characters, since a surname and a firstname 
        // should be no more than 30 characters; 30 * 50 = 1500 that gives 500 characters for messages, 
        // so it **should** be okay, but there should still be some handling around it.
        // todo: get total message size just before sending; if message is too long, start popping names 
        // off the list until we're below the limit again

        return replyMessage;
    }
}

module.exports = NameGenerationCommand;
