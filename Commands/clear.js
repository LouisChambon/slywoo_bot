const Discord = require('discord.js');

module.exports = {

    name: "clear",
    description: "Clear messages",
    permission: Discord.PermissionFlagsBits.ManageMessages,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "number",
            name: "count",
            description: "The number of messages to delete [0-100]",
            required: true
        },
        {
            type: "channel",
            name: "chan",
            description: "The channel where to delete messages",
            required: false
        }
    ],

    async run(client, message, args) {

        let channel = args.getChannel("chan")
        if (!channel) channel = message.channel;
        if (channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Invalid channel")

        let number = args.getNumber("count")
        if (parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("I need a number between `0` and `100` included.")

        await message.deferReply()

        try {

            let messages = await channel.bulkDelete(parseInt(number))

            await message.followUp({content: `I have deleted \`${messages.size}\` message(s) in the channel ${channel} !`, ephemeral: true})

        } catch (err) {

            let messages = [...(await channel.messages.fetch()).filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 1209600000).values()]
            if (messages.length <= 0) return message.followUp("No message to delete ! (maybe older than 14 days !)")

            await channel.bulkDelete(messages)

            await message.followUp({content: `I have deleted only \`${messages.length}\` message(s) because the others were older than 14 days !`, ephemeral: true})
            
        }

    }
}