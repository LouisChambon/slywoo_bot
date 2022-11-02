const Discord = require('discord.js');
const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');


dotenv.config();

module.exports = async client => {

    let commands = [];

    client.commands.forEach(async command => {
       
        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === "None" ? null : command.permission)

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string") slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setAutocomplete(command.options[i].autocomplete).setRequired(command.options[i].required))
                else slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
            }
        }

        await commands.push(slashcommand)
    })

    const rest = new REST({version: "10"}).setToken(process.env.TOKEN)

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {body: commands})
}