const commando = require('discord.js-commando');

class NameGeneratorCommand extends commando.Command {
    constructor(client) {
    const cmdTitle = "name";

        super(client, {
            name: cmdTitle,
            memberName: cmdTitle,
            description: "Picks a name from a list of names based on race and gender",
            group: "namegenerator"
        });
    }

    async run(message, args) {
        //todo: parse args for gender, race, etc
        //todo: convert this to be based on some internal logic function / manager / domain etc so it's easier to switch from "pick a random name" to "generate a name"
        const seed = require('./seed/humanMale');
        const min = 0;
        const max = seed.length;
        const selected = Math.floor(Math.random() * (max - min)) + min;
        message.reply(`${seed[selected]}`);
    }
}

module.exports = NameGeneratorCommand;
