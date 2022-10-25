const Discord = require('discord.js');
const loadSlashCommands = require("../Loaders/loadSlashCommands");

module.exports = async (client) => {

    await loadSlashCommands(client)

    console.log(`${client.user.tag} is online !`);

    client.user.setPresence({
        status: "dnd",
        activities: [{
            name: "/help | !!help",
        }]
    })
}