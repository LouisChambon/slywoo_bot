import { Client, GatewayIntentBits } from "discord.js";
import { Commands } from "./commands/CallAllCommands.js";
import dotenv from 'dotenv';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
dotenv.config();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

Commands(client);

client.login(process.env.TOKEN);



// Répertorier les commandes dans l'API


// import { Routes } from "discord-api-types";
// import { REST } from ("@discordjs/rest");

// import dotenv from 'dotenv';

// dotenv.config();

// const commands = [
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
// ];

// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// (async () => {
//   try {
//     console.log('Started refreshing application (/) commands.');

//     await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

//     console.log('Successfully reloaded application (/) commands.');
//   } catch (error) {
//     console.error(error);
//   }
// })();