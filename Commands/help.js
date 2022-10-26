const Discord = require('discord.js');

module.exports = {

    name: "help",
    description: "Lists all bot commands",
    permission: "None",
    dm: true,
    category: "Information",
    options: [
        {
            type: "string",
            name: "command",
            description: "The command to display",
            required: false
        }
    ],

    async run(client, message, args) {

        let command;
        if (args.getString("command")) {
            command = client.commands.get(args.getString("command"))
            if (!command) return message.reply("Command not found !")
        }

        if (!command) {
            let categories = [];
            client.commands.forEach(command => {
                if (!categories.includes(command.category)) categories.push(command.category)
            })

            let Embed = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Bot commands`)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Available commands : \`${client.commands.size}\`\nAvailable categories : \`${categories.length}\``)
            .setTimestamp()
            .setFooter({text: "Bot commands"})

            await categories.sort().forEach(async cat => {

                let commands = client.commands.filter(cmd => cmd.category === cat)
                Embed.addFields({name: `${cat}`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            })

            await message.reply({embeds: [Embed]})

        } else {
            let Embed = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Command : ${command.name}`)
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Name : \`${command.name}\`\nDescription : \`${command.description}\`\nRequired Permission : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommand in DM : \`${command.dm ? "Yes" : "No"}\`\nCategory : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: `Command : ${command.name}`})

            await message.reply({embeds: [Embed]})
        }
    }
}