const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Reponds with pong`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      await interaction.reply({ ephemeral: true, content: "Pong!" });
    } catch (error) {
      console.error(error);
    }
  },
};
