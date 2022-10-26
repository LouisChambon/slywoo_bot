const Discord = require('discord.js');
const ms = require('ms');

module.exports = {

    name: "mute",
    description: "Mute a member of the server",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The @member to mute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "time",
            description: "Duration of the mute",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "reason",
            description: "The reason of the mute",
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {

        let user = args.getUser("member");
        let member = message.guild.members.cache.get(user.id)
        if (!member || !user) return message.reply("Couldn't find this user.")

        let time = args.getString("time")
        if (!time) return message.reply("Please select time duration !")

        if (isNaN(ms(time))) return message.reply("Bad format input !")
        if (ms(time) > 2419200000) return message.reply("The mute duration can't be superior than 28 days !")

        let reason = args.getString("reason")
        if (!reason) reason = "No reason provided.";

        if (message.user.id === user.id) return message.reply("You can't mute ypurself !")
        if ((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't mute the server owner !")
        if (!member.moderatable) return message.reply("I can't mute this member !")
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You don't have the rights to kick this member")
        if (member.isCommunicationDisabled()) return message.reply("This member is already muted !")

        try {await user.send(`You have been muted from the server ${message.guild.name} for ${time} by ${message.user.tag} for the following reason: \`${reason}\``)} catch (err) {}

        await message.reply(`${message.user} has muted ${user.tag} for ${time} for the following reason: \`${reason}\``)

        await member.timeout(ms(time), reason)
    }
}