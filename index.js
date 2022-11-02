const dotenv = require('dotenv');
const Discord = require('discord.js');
const client = new Discord.Client({intents: 3243773});
const loadCommands = require('./Loaders/loadCommands');
const loadEvents = require('./Loaders/loadEvents');

dotenv.config();


client.commands = new Discord.Collection();
client.color = "#ffffff";

loadCommands(client);
loadEvents(client);

client.login(process.env.TOKEN);
