const Discord = require('discord.js');
const { DisTube } = require('distube');

module.exports = {

    name: "play",
    description: "Plays the music you want",
    permissions: [
        Discord.PermissionFlagsBits.Connect,
        Discord.PermissionFlagsBits.Speak
    ],
    dm: false,
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
            leaveOnStop: true,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
        });

        
        const song = args.getString("song");
        if (!song) return message.reply(`Error | Please enter a song url or query to search.`)
        
        if (!message.member.voice.channel) return message.reply("Please connect to a voice channel !");

        let Embed = new Discord.EmbedBuilder()
            .setColor(client.color)
            .setTitle(`Now Playing :`)
            .setDescription(song)
            .setTimestamp()
        
        client.DisTube.play(message.member.voice.channel, song, {
            member: message.member,
            textChannel: message.channel,
        })

        await message.reply({embeds: [Embed]});
    }
}