const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "Ban a member from the server",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "member",
            description: "The @member to ban",
            required: true
        },
        {
            type: "string",
            name: "reason",
            description: "The reason of the ban",
            required: false
        }
    ],

    async run(client, message, args) {

        try {
            let user = await client.users.fetch(args._hoistedOptions[0].value)
            let member = message.guild.members.cache.get(user.id)
            if(!user || !member) return message.reply("Could not ban this member.")

            let reason = args.getString("reason");
            if (!reason) reason = "No reason provided.";

            if (message.user.id === user.id) return message.reply("You can't ban yourself bro :/")
            if ((await message.guild.fetchOwner()).id === user.id) return message.reply("You can't ban the server owner.")
            if (!member.bannable) return message.reply("I can't ban this member.")
            if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("You don't have the rights to ban this member")
            if ((await message.guild.bans.fetch()).get(user.id)) return message.reply("This member is already ban !")

            try {await user.send(`You have been banned from the server ${message.guild.name} by ${message.user.tag} for the following reason: \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} has banned ${user.tag} for the following reason: \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {
            return message.reply("Could not ban this member.")
        }
    }
}