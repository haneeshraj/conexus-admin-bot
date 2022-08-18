const { SlashCommandBuilder } = require(`discord.js`);
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`joke`)
    .setDescription(`Sends a random joke!`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const getJoke = async () => {
        const { data } = await axios.get(
          "https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist&type=single"
        );
        await interaction.reply(data.joke);
      };
      getJoke();
    } catch (error) {
      console.error(error);
    }
  },
};
