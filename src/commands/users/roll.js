const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`roll`)
    .setDescription(`Rolls a dice`),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const randomNumb = Math.floor(Math.random() * 6) + 1;
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Rolled!")
          .setDescription(
            `You rolled a ${
              randomNumb === 1
                ? "one!"
                : randomNumb === 2
                ? "two!"
                : randomNumb === 3
                ? "three!"
                : randomNumb === 4
                ? "four!"
                : randomNumb === 5
                ? "five!"
                : randomNumb === 6
                ? "six!"
                : "?"
            }`
          )
          .setThumbnail(
            randomNumb === 1
              ? "https://upload.wikimedia.org/wikipedia/commons/2/2c/Alea_1.png"
              : randomNumb === 2
              ? "https://upload.wikimedia.org/wikipedia/commons/b/b8/Alea_2.png"
              : randomNumb === 3
              ? "https://upload.wikimedia.org/wikipedia/commons/2/2f/Alea_3.png"
              : randomNumb === 4
              ? "https://upload.wikimedia.org/wikipedia/commons/8/8d/Alea_4.png"
              : randomNumb === 5
              ? "https://upload.wikimedia.org/wikipedia/commons/5/55/Alea_5.png"
              : randomNumb === 6
              ? "https://upload.wikimedia.org/wikipedia/commons/f/f4/Alea_6.png"
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKkes3QKLAvNw4G0_UMBakndRsF33x5DU0fvoLDc&s"
          ),
      ],
    });
  },
};
