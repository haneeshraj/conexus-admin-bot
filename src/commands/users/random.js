const { SlashCommandBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`random`)
    .setDescription(`Picks a random number!`)
    .addNumberOption((input) =>
      input.setName("number").setDescription("The highest range of the number")
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const num = interaction.options.getNumber("number") || 5;
      const randomNumb = Math.floor(Math.random() * num) + 1;

      await interaction.reply(`The random number is **${randomNumb}**!`);
    } catch (error) {
      console.error(error);
    }
  },
};
