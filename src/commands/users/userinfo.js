const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`userinfo`)
    .setDescription(`Gives the information of the user`)
    .addUserOption((input) =>
      input
        .setName("user")
        .setDescription("The user you want the information of")
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const userMentioned = interaction.options.getUser("user");
      if (!userMentioned) {
        return await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle("User Information")
              .setColor("Green")
              .setFields(
                {
                  name: "User ID",
                  value: interaction.user.id,
                },
                {
                  name: "Tag",
                  value: interaction.user.tag,
                },
                {
                  name: "Bot",
                  value: interaction.user.bot ? "Is a bot" : "Not a bot",
                },
                {
                  name: "Created at",
                  value: String(interaction.user.createdAt),
                }
              )
              .setThumbnail(interaction.user.avatarURL())
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
        });
      }
      return await interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setTitle("User Information")
            .setColor("Green")
            .setFields(
              {
                name: "User ID",
                value: userMentioned.id,
              },
              {
                name: "Tag",
                value: userMentioned.tag,
              },
              {
                name: "Bot",
                value: userMentioned.bot ? "Is a bot" : "Not a bot",
              },
              {
                name: "Created at",
                value: String(userMentioned.createdAt),
              }
            )
            .setThumbnail(userMentioned.avatarURL())
            .setFooter({
              iconURL: interaction.guild.iconURL(),
              text: `  |  ${interaction.guild.name}`,
            }),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
