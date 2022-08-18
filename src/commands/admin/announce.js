const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`announce`)
    .setDescription(`Announces the message passed by the moderator/admin`)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageChannels |
        PermissionFlagsBits.ManageMessages |
        PermissionFlagsBits.ManageRoles
    )
    .addChannelOption((input) =>
      input
        .setName("channel")
        .setDescription("The channel where the announcement is announced")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("title")
        .setDescription("The title of the announcement")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("description")
        .setDescription("The description of the announcement")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const announceChannel = interaction.options.getChannel("channel");
      await interaction.deferReply({ ephemeral: true });
      await interaction.editReply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setTitle("Success!")
            .setDescription("Announcement has been made!"),
        ],
      });
      await announceChannel.send({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setColor("Purple")
            .setTitle(title)
            .setDescription(description)
            .setFooter({
              iconURL: interaction.guild.iconURL(),
              text: `    |    ` + interaction.guild.name,
            }),
        ],
      });
      const adminLog = client.channels.cache.get("1006098938941669426");
      await adminLog.send({
        embeds: [
          new EmbedBuilder()
            .setTitle("Announcement")
            .setColor("Purple")
            .setDescription("An announcement was made ")
            .setFields(
              {
                name: "Channel",
                value: `<#${announceChannel.id}>`,
                inline: true,
              },
              { name: "By", value: `<@${interaction.user.id}>`, inline: true }
            )
            .setFooter({
              iconURL: interaction.guild.iconURL(),
              text: `    |    ` + interaction.guild.name,
            })
            .setTimestamp(),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
