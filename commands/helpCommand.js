const config = require('../config'); //todo let's stop using ../../
const pkge = require('../package');
const CommandBase = require('../commandBase');

const NEWLINE = require('os').EOL;

class HelpCommand extends CommandBase {
    constructor(client) {
        const cmdTitle = 'help';

        super(client, {
            name: cmdTitle,
            usage: 'help',
            description: `Generates help and about information. You're reading it right meow.`,
        });
    }

    async run(message, args) {
		let prefix = '';
		if(message.guild) {
			prefix = config.discord.defaultPrefix;
		}
        let helpText = '```asciidoc' + NEWLINE;
        helpText += 'Format:' + NEWLINE;
        helpText += 'CommandName :: Usage Example :: Description' + NEWLINE;
        this.client.commands.forEach((command) => {
			helpText += prefix + command.name;

            if(command.usage)
                helpText += ` ::  ${command.usage}`                

            if(command.description)
                helpText += ` ::  ${command.description}`                
            
            helpText += NEWLINE;
		});
        
        helpText += NEWLINE;
        helpText += '===============================';
        helpText += NEWLINE + NEWLINE;
        helpText += `Version ${pkge.version}`;
        helpText += NEWLINE;
        helpText += `Bugs? Questions? Drop an issue at my GitHub - ${pkge.bugs.url}`;
        helpText += '```';

		return message.channel.sendMessage(helpText);
    }
}

module.exports = HelpCommand;
