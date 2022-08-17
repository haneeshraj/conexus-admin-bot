const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`flip`)
    .setDescription(`Flips a coin`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const randomNumb = Math.floor(Math.random() * 2) + 1;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Flipped!")
          .setDescription(`It's ${randomNumb === 1 ? "Heads!" : "Tails!"}`),
      ],
    });
  },
};
