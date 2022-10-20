export function Help(client) {
  return client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "help") {
      await interaction.reply("Here the list of the commands: -- ");
    }
  });
}
