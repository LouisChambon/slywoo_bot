const Discord = require('discord.js');
const { DisTube } = require('distube');

module.exports = {

    name: "play",
    description: "Plays the music you want",
    permissions: [
        Discord.PermissionFlagsBits.Connect,
        Discord.PermissionFlagsBits.Speak
    ],
    dm: true,
    category: "Music",
    options: [
        {
            type: "string",
            name: "song",
            description: "The name of the song you want to listen to",
            required: true,
            autocomplete: false,
        }
    ],

    async run(client, message, args) {

        client.DisTube = new DisTube(client, {
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
        })

        const song = args.getString("song");
        if (!song) return message.reply(`Error | Please enter a song url or query to search.`)

        client.DisTube.play(message.member.voice.channel, song, {
            member: message.member,
            textChannel: message.channel,
        })

        await message.reply("Now playing : " + song)
    }
}