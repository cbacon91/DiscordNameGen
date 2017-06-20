const commando = require('discord.js-commando');
const config = require('../../config'); //todo let's stop using ../../
const NameGeneratorRepository = require('./generator/nameGeneratorRepository');
const ArgsParser = require('./argsParser');

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
        const generated = this.nameGeneratorRepository.generateName(parsedArgs);
        message.channel.send(generated);
    }
}

module.exports = NameGenerationCommand;
