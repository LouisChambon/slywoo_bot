// import { Player } from "discord-player";

// export function Exit(client) {
  
//   client.player = new Player(client, {
//     ytdlOptions: {
//       quality: "highestaudio",
//       highWaterMark: 1 << 25
//   }
//   });

//   return client.on("interactionCreate", async (interaction) => {
//     // Get the current queue
//     const queue = client.player.getQueue(interaction.commandGuildId);

//     if (!queue) {
//       await interaction.reply("There are no songs in the queue");
//       return;
//     }

//     // Deletes all the songs from the queue and exits the channel
//     queue.destroy();

//     await interaction.reply("Why you do this to me?");
//   });
// }
