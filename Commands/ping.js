const Discord = require('discord.js');

module.exports = {

    name: "ping",
    description: "Return the ping value !",
    permission: "None",
    dm: true,

    async run(client, message) {

        await message.reply(`Pong: \`${client.ws.ping}\``)
    }
}