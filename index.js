import { Client, GatewayIntentBits } from "discord.js";
import { Commands } from "./commands/CallAllCommands.js";
import dotenv from 'dotenv';

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildBans,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildVoiceStates,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildIntegrations,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.GuildMessageTyping,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildScheduledEvents,
  GatewayIntentBits.GuildWebhooks
] });

dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: "dnd",
    activities: [{
      name: "/help | ice on me Im gay",
    }]
  })
});

Commands(client);

client.login(process.env.TOKEN);



// Répertorier les commandes dans l'API


// import { Routes, REST } from "discord.js";

// import dotenv from 'dotenv';

// dotenv.config();

// const commands = [
//   {
//     name: 'help',
//     description: 'Lists all the commands',
//   },
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
//   {
//     name: 'exit',
//     description: 'Exit the voice channel',
//   },
//   {
//     name: 'join',
//     description: 'Join voice channel',
//   }
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