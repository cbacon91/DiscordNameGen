const Discord = require('discord.js');
const commando = require('discord.js-commando');

const bot = new commando.Client();
const token = ""; //todo move to config

bot.registry.registerGroup('namegenerator', 'namegenerator');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(token);
