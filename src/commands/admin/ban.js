const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`ban`)
    .setDescription(`Bans a member from the server`)
    .addUserOption((input) =>
      input
        .setName("user")
        .setDescription("The user from the server you want to ban")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("reason")
        .setDescription("The reason for why you are banning the user")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const userInfo = interaction.options.getMember("user"); // For ban
    const reason = interaction.options.getString("reason");
    try {
      if (
        !userInfo.permissions.has(
          PermissionFlagsBits.BanMembers |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.ManageRoles
        )
      ) {
        userInfo.ban({ reason });

        const adminLog = client.channels.cache.get("1006098938941669426");
        await adminLog.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Banned a user")
              .setColor("Red")
              .setDescription("User Banned")
              .setFields(
                {
                  name: "Banned User",
                  value: `<@${userInfo.id}>`,
                  inline: true,
                },
                {
                  name: "Banned By",
                  value: `<@${interaction.user.id}>`,
                  inline: true,
                },
                {
                  name: "Reason",
                  value: reason,
                }
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `    |    ` + interaction.guild.name,
              })
              .setTimestamp(),
          ],
        });
      } else {
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle("Can't Kick Person!")
              .setDescription(
                `You do not have the permission to kick <@${userInfo.id}>`
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `    |    ` + interaction.guild.name,
              })
              .setTimestamp(),
          ],
        });
        return;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
