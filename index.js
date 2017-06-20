require('./extensions'); //not sure the best way to do this?

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('./config');

const bot = new commando.Client();
const token = config.discord.authToken;



bot.registry.registerGroup('namegenerator', 'namegenerator');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(token);
