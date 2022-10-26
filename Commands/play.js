const Discord = require('discord.js');
const { DisTube } = require('distube');

module.exports = {

    name: "play",
    description: "Plays the music you want",
    permission: Discord.PermissionFlagsBits.Speak,
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

        let song = args.getString("song");

        if (!song) return message.reply(`Error | Please enter a song url or query to search.`)

        client.DisTube.play(message.member.voice.channel, song, {
            member: message.member,
            textChannel: message.channel,
            message
        })

        // client.DisTube.on("playSong", (queue, song) => {
        //     queue.textChannel.send("Now Playing : " + song.name)
        // })
    }
}