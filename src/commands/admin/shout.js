const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`shout`)
    .setDescription(`Sends a message to a specific channel!`)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageChannels |
        PermissionFlagsBits.ManageMessages |
        PermissionFlagsBits.ManageRoles
    )
    .addChannelOption((input) =>
      input
        .setName("channel")
        .setDescription("The channel where the message is to be sent")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("text")
        .setDescription("The text of the message")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const text = interaction.options.getString("text");
    const msgChannel = interaction.options.getChannel("channel");
    try {
      await interaction.reply({
        ephemeral: true,
        embeds: [
          new EmbedBuilder()
            .setTitle("Success!")
            .setDescription("Shout has been made!"),
        ],
      });
      await msgChannel.send({ content: text });
      const adminLog = client.channels.cache.get("1006098938941669426");
      adminLog.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Aqua")
            .setTitle("Shout")
            .setDescription("An shout was made ")
            .setFields(
              {
                name: "Channel",
                value: `<#${msgChannel.id}>`,
                inline: true,
              },
              { name: "By", value: `<@${interaction.user.id}>`, inline: true }
            ),
        ],
      });
    } catch (error) {
      console.error(error);
    }
  },
};
