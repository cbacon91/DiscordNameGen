(function() { 
    require('./extensions'); 

    const Discord = require('discord.js');
    const config = require('./config');

    const juan = new Discord.Client();
    const token = config.discord.authToken;

    juan.login(token);

    juan.commands = new Map();
    juan.once("ready", () => {
        const dir = "./commands/";
        const fs = require("fs");

        fs.readdir(dir, (err, files) => {
            if(err){
                console.log(err);
                process.exit();
            }
            else {
                files = files.filter((file) => file.endsWith('Command.js'));

                for (let i = 0; i < files.length; i++){
                    const fileName = files[i];
                    const Command = require(`./commands/${/(.*)\.js/.exec(fileName)[1]}`);
                    const command = new Command(juan);
                    juan.commands.set(command.name, command);
                }
            }
        });
    });

    juan.on("message", async (msg) => {
        if(msg.author.bot){	// Don't respond to bots
            return;
        }

        let offset;
        const prefix = msg.guild 
            ? config.discord.defaultPrefix //todo let guild set their own prefix.
            : ''; 

        if(msg.content.startsWith(prefix))
            offset = prefix.length;
        else if(msg.content.startsWith(juan.user.toString()))
            offset = juan.user.toString().length + 1;
        else 
            return;

        const userInput = msg.content.substring(offset).split(" ")[0].toLowerCase();
        const command = juan.commands.get(userInput);

        if(!command) 
            return;

        let args = msg.content.substring(offset + userInput.length).trim();
        command.run(msg, args);
    });

    juan.on("disconnect", () => {
        process.exit();
    });
})();