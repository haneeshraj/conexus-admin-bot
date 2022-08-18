const { SlashCommandBuilder } = require(`discord.js`);
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`meme`)
    .setDescription(`Sends a random meme!`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const getMeme = async () => {
        const { data } = await axios.get(
          "https://meme-api.herokuapp.com/gimme/dankmemes"
        );
        await interaction.reply(data.url);
      };
      getMeme();
    } catch (error) {
      console.error(error);
    }
  },
};
