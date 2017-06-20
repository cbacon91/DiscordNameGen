const commando = require('discord.js-commando');
const config = require('../../config'); //todo let's stop using ../../
const seedDataRepository = require('./seed/seedDataRepository');
const nameGeneratorRepository = require('./generator/nameGeneratorRepository');

class NameGenerationCommand extends commando.Command {
    constructor(client) {
        const cmdTitle = "name";

        super(client, {
            name: cmdTitle,
            memberName: cmdTitle,
            description: "Picks a name from a list of names based on race and gender",
            group: "namegenerator"
        });

        this.seedDataRepository = new seedDataRepository();
        this.nameGeneratorRepository = new nameGeneratorRepository();
    }

    async run(message, args) {
        const seedData = this.seedDataRepository.getSeedData(args);
        const generated = this.nameGeneratorRepository.generateName(seedData);
        message.reply(generated);
    }
}

module.exports = NameGenerationCommand;
