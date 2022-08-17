const axios = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);
const { v4: uuidv4 } = require("uuid");
module.exports = {
  data: new SlashCommandBuilder()
    .setName(`report`)
    .setDescription(`Reports an issue`)
    .addStringOption((input) =>
      input
        .setName("details")
        .setDescription("Details of the report")
        .setRequired(true)
    )
    .addUserOption((input) =>
      input
        .setName("user")
        .setDescription("A user who is involved in the report")
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const details = interaction.options.getString("details");
    const user = interaction.options.getUser("user") || "None";
    const reportChannel = client.channels.cache.get("1006900401334931486");

    const addReport = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/user-reports/",
          {
            reportId: uuidv4(),
            userId: interaction.user.id,
            details,
            userInvolved: user.id,
          }
        );
        const msg = await reportChannel.send({
          embeds: [
            new EmbedBuilder()
              .setTitle(`New Report`)
              .setColor("Blurple")
              .setFields(
                { name: "Report ID", value: data.reportId },
                { name: "Report by", value: `<@${data.userId}>` },
                { name: "Details", value: data.details },
                {
                  name: "User involved",
                  value:
                    data.userInvolved === "None"
                      ? "None"
                      : `<@${data.userInvolved}>`,
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
        await msg.react("✅");
        await interaction.user.send({
          embeds: [
            new EmbedBuilder()
              .setTitle(`New Report`)
              .setColor("Blurple")
              .setFields(
                { name: "Report ID", value: data.reportId },
                { name: "Details", value: data.details },
                {
                  name: "User involved",
                  value:
                    data.userInvolved === "None"
                      ? "None"
                      : `<@${data.userInvolved}>`,
                },
                {
                  name: "Thank you for reporting",
                  value: "Admins will get in contact with you in a while!",
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
        await interaction.reply({
          ephemeral: true,
          content: "Your report has been submitted! Please check your dms!",
        });
      } catch (error) {
        console.error(error);
      }
    };
    addReport();
  },
};
