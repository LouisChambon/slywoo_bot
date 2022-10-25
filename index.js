const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client({intents: 3276799});
const loadCommands = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');

dotenv.config();

client.commands = new Discord.Collection();

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);
