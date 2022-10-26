const Discord = require('discord.js');

module.exports = {

    name: "unmute",
    description: "Unmute a member of the server",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The @member to unmute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "reason",
            description: "The reason of the unmute",
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {

        let user = args.getUser("member")
        let member = message.guild.members.cache.get(user.id)
        if (!member || !user) return message.reply("Couldn't find this member !")

        let reason = args.getString("reason")
        if (!reason) reason = "No reason provided.";

        if (!member.moderatable) return message.reply("I can't unmute this member !")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You can't unmute this member !")
        if (!member.isCommunicationDisabled()) return message.reply("This member is not muted !")

        try {await user.send(`You have been unmuted from the server ${message.guild.name} by ${message.user.tag} for the following reason: \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} has unmuted ${user.tag} for the following reason: \`${reason}\``)

        await member.timeout(null, reason)
    }
}