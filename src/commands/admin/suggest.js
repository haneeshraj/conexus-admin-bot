const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`suggest`)
    .setDescription(`Make suggestions for changes to the server`)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageMessages |
        PermissionFlagsBits.ManageChannels |
        PermissionFlagsBits.ManageRoles
    )

    .addStringOption((input) =>
      input
        .setName("title")
        .setDescription("The title of the suggestion")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("details")
        .setDescription("The details of the suggestion")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const title = interaction.options.getString("title");
      const details = interaction.options.getString("details");
      const suggestChannel = client.channels.cache.get("1006099121955934228");
      await interaction.reply({
        ephemeral: true,
        content: "The suggestion has been posted!",
      });
      const message = await suggestChannel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(title)
            .setColor("Fuchsia")
            .setDescription(details)
            .setTimestamp()
            .setFields({ name: "Suggestion by", value: interaction.user.tag })
            .setFooter({
              iconURL: interaction.guild.iconURL(),
              text: `  |  ${interaction.guild.name}`,
            }),
        ],
      });
      await message.react("✅");
      await message.react("❌");
    } catch (error) {
      console.error(error);
    }
  },
};
