const Discord = require('discord.js');

module.exports = {
    name: "unban",
    description: "Unban a member from the server",
    permission: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    category: "Moderation",
    options: [
        {
            type: "user",
            name: "member",
            description: "The @member to unban",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "reason",
            description: "The reason of the unban",
            required: false,
            autocomplete: false
        }
    ],

    async run(client, message, args) {

        try {
            let user = args.getUser("member")
            if (!user) return message.reply("Couldn't find this user !")

            let reason = args.getString("reason")
            if (!reason) reason = "No reason provided.";

            if (!(await message.guild.bans.fetch()).get(user.id)) return message.reply("This user isn't banned !")

            try {await user.send(`You have been unbanned by ${message.user.tag} for the following reason: \`${reason}\``)} catch (err) {}

            await message.reply(`${message.user} has unbanned ${user.tag} for the following reason: \`${reason}\``)

            await message.guild.members.unban(user, reason)

        } catch (err) {
            return message.reply("Could not find this user.")
        }
    }
}