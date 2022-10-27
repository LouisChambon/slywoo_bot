const Discord = require('discord.js');
const { DisTube } = require('distube');

module.exports = {

    name: "play",
    description: "Plays the music you want",
    permission: Discord.PermissionFlagsBits.Connect,
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

        console.log("Member: " + message.member.voice.channel)
        const song = args.getString("song");
        console.log("Song name : " + song)
        if (!song) return message.reply(`Error | Please enter a song url or query to search.`)

        client.DisTube.play(message.member.voice.channel, song, {
            member: message.member,
            textChannel: message.channel,
        })

        await message.reply("Now playing : " + song)
    }
}