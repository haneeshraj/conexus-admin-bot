const axios = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`userwarn`)
    .setDescription(`Runs several warn commands!`)
    .addSubcommand((input) =>
      input.setName("check").setDescription("Checks what warns a user has")
    )
    .addSubcommand((input) =>
      input
        .setName("view")
        .setDescription("Shows the warn in detail")
        .addStringOption((input) =>
          input
            .setName("warnid")
            .setDescription("The warning ID")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const subComand = await interaction.options.getSubcommand();

    if (subComand === "check") {
      const checkWarns = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/warns/${interaction.user.id}`
          );
          console.log(Array.isArray(data), interaction.user.id);
          if (!Array.isArray(data)) {
            await interaction.reply({
              ephemeral: true,
              embeds: [
                new EmbedBuilder()
                  .setTitle("No warns found!")
                  .setDescription("You have no active warnings!")
                  .setColor("Green")
                  .setThumbnail(interaction.user.avatarURL())
                  .setTimestamp()
                  .setFooter({
                    iconURL: interaction.guild.iconURL(),
                    text: `  |  ${interaction.guild.name}`,
                  }),
              ],
            });
            return;
          }
          var allWarnIds = "";
          data.forEach((warning) => {
            allWarnIds += "`" + warning.warnId + "`" + ", ";
          });
          await interaction.reply({
            ephemeral: true,
            embeds: [
              new EmbedBuilder()
                .setColor("Red")
                .setTitle("You have warning!")
                .setDescription(
                  data.length === 1
                    ? "You have a warning"
                    : `You have ${data.length} warnings`
                )
                .setFields(
                  {
                    name: "Warn IDs",
                    value: allWarnIds.slice(0, -2),
                  },
                  {
                    name: "To check your warns",
                    value: "Use the command `/userwarn view [WARN ID]`",
                  }
                )
                .setThumbnail(interaction.user.avatarURL())
                .setTimestamp()
                .setFooter({
                  iconURL: interaction.guild.iconURL(),
                  text: `  |  ${interaction.guild.name}`,
                }),
            ],
          });
        } catch (error) {
          console.error(error);
        }
      };
      checkWarns();
    }
    if (subComand === "view") {
      try {
        const warnId = interaction.options.getString("warnid");
        const viewReport = async () => {
          const { data } = await axios.get(
            `http://localhost:3000/api/warns/warning/${warnId.trim()}`
          );

          if (interaction.user.id === data.userId) {
            if (data.warnId) {
              await interaction.reply({
                ephemeral: true,
                embeds: [
                  new EmbedBuilder()
                    .setTitle("Warn Information")
                    .setColor("Orange")
                    .setFields(
                      { name: "Warn ID", value: data.warnId },
                      { name: "Reason", value: data.reason },
                      { name: "User", value: `<@${data.userId}>` }
                    )
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    .setFooter({
                      iconURL: interaction.guild.iconURL(),
                      text: `  |  ${interaction.guild.name}`,
                    }),
                ],
              });
            } else
              await interaction.reply({
                ephemeral: true,
                embeds: [
                  new EmbedBuilder()
                    .setTitle("No warn id found!")
                    .setDescription(
                      "Please make sure you entered the right warn id!"
                    )
                    .setColor("Red")
                    .setThumbnail(interaction.user.avatarURL())
                    .setTimestamp()
                    .setFooter({
                      iconURL: interaction.guild.iconURL(),
                      text: `  |  ${interaction.guild.name}`,
                    }),
                ],
              });
          } else {
            await interaction.reply({
              ephemeral: true,
              embeds: [
                new EmbedBuilder()
                  .setTitle("You do not have the permission to do that!")
                  .setDescription(
                    "Please make sure the warn ID you entered belongs to you!"
                  )
                  .setColor("Red")
                  .setThumbnail(interaction.user.avatarURL())
                  .setTimestamp()
                  .setFooter({
                    iconURL: interaction.guild.iconURL(),
                    text: `  |  ${interaction.guild.name}`,
                  }),
              ],
            });
          }
        };
        viewReport();
      } catch (error) {
        console.error(error);
      }
    }
  },
};
