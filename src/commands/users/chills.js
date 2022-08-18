const { SlashCommandBuilder } = require(`discord.js`);
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`chills`)
    .setDescription(
      `Sends 2 sentences which are creepy, scary or huh??2f[:??]`
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const getStory = async () => {
        const { data } = await axios.get(
          "https://meme-api.herokuapp.com/gimme/TwoSentenceHorror"
        );
        console.log(data);
      };
      getStory();
    } catch (error) {
      console.error(error);
    }
  },
};
