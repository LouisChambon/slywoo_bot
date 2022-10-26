const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kick a member from the server",
    permission: Discord.PermissionFlagsBits.KickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "The @member to kick",
            required: true
        },
        {
            type: "string",
            name: "reason",
            description: "The reason of the kick",
            required: false
        }
    ],

    async run(client, message, args) {

        let user = args.getUser("member")
        let member = message.guild.members.cache.get(user.id)
        if(!user || !member) return message.reply("Could not kick this member.")

        let reason = args.getString("reason");
        if (!reason) reason = "No reason provided.";

        if (message.user.id === user.id) return message.reply("You can't kick yourself bro :/")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't kick the server owner.")
        if (!member.kickable) return message.reply("I can't kick this member.")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You don't have the rights to kick this member")

        try {await user.send(`You have been kicked from the server ${message.guild.name} by ${message.user.tag} for the following reason: \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} has kicked ${user.tag} for the following reason: \`${reason}\``)

        await member.kick(reason)
    }
}