const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`kick`)
    .setDescription(`Kicks a member from the server`)
    .addUserOption((input) =>
      input
        .setName("user")
        .setDescription("The user from the server you want to kick")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("reason")
        .setDescription("The reason for why you are kicking the user")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const userInfo = interaction.options.getMember("user"); // For kick
    const reason = interaction.options.getString("reason");
    try {
      if (
        !userInfo.permissions.has(
          PermissionFlagsBits.BanMembers |
            PermissionFlagsBits.ManageMessages |
            PermissionFlagsBits.ManageRoles
        )
      ) {
        userInfo.kick(reason);

        const adminLog = client.channels.cache.get("1006098938941669426");
        const msg = await adminLog.send({
          embeds: [
            new EmbedBuilder()
              .setTitle("Kicked a user")
              .setColor("Orange")
              .setDescription("User kicked")
              .setFields(
                {
                  name: "Kicked User",
                  value: `<@${userInfo.id}>`,
                  inline: true,
                },
                {
                  name: "Kicked By",
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
        await interaction.deferReply();
        await interaction.editReply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setTitle("Successfully Kicked!")
              .setDescription(`Successfully kicked <@${userInfo.id}>`)
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `    |    ` + interaction.guild.name,
              })
              .setTimestamp(),
          ],
        });
        return;
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
