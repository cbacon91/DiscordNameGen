const commando = require('discord.js-commando');

class PingCommand extends commando.Command {
    constructor(client) {
    const cmdTitle = "pong";

        super(client, {
            name: cmdTitle,
            memberName: cmdTitle,
            description: "Ping!",
            group: "namegenerator"
        });
    }

    async run(message, args) {
        message.reply("Ping!");
    }
}

module.exports = PingCommand;
