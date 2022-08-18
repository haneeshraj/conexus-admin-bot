const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`warn`)
    .setDescription(`Warns a user`)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageChannels |
        PermissionFlagsBits.ManageMessages |
        PermissionFlagsBits.ManageRoles
    )
    .addSubcommand((input) =>
      input
        .setName("add")
        .setDescription("Warns a user")
        .addUserOption((input) =>
          input
            .setName("user")
            .setDescription("A user from the server")
            .setRequired(true)
        )
        .addStringOption((input) =>
          input
            .setName("reason")
            .setDescription("The reason as to why the user is being warned")
            .setRequired(true)
        )
    )
    .addSubcommand((input) =>
      input
        .setName("remove")
        .setDescription("Removes a user's warning")
        .addStringOption((input) =>
          input
            .setName("warnid")
            .setDescription("The ID of the warning")
            .setRequired(true)
        )
    )
    .addSubcommand((input) =>
      input
        .setName("review")
        .setDescription("Reviews a user's warning")
        .addStringOption((input) =>
          input
            .setName("warnid")
            .setDescription("The ID of the warning")
            .setRequired(true)
        )
    ),

  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    try {
      const mode = interaction.options.getSubcommand();
      if (mode === "add") {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const addWarn = async () => {
          try {
            const { data } = await axios.post(
              "http://localhost:3000/api/warns",
              {
                warnId: uuidv4(),
                userId: user.id,
                reason,
              }
            );
            user.send({
              embeds: [
                new EmbedBuilder()
                  .setTitle("You have been warned!")
                  .setColor("Blurple")
                  .setFields(
                    { name: "Warned by", value: `<@${interaction.user.id}>` },
                    { name: "Reason", value: data.reason },
                    { name: "Warn ID", value: data.warnId },
                    {
                      name: "Note",
                      value:
                        "If you think this was a warning which you dont deserve, please contact the mods or admins",
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
              embeds: [
                new EmbedBuilder()
                  .setTitle("User Warned!")
                  .setColor("Blurple")
                  .setFields(
                    { name: "User", value: `<@${data.userId}>` },
                    { name: "Reason", value: data.reason },
                    { name: "Warn ID", value: data.warnId }
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
        addWarn();
        return;
      }
      if (mode === "remove") {
        const warnId = interaction.options.getString("warnid");
        const deleteWarn = async () => {
          try {
            const resp = await axios.get(
              `http://localhost:3000/api/warns/warning/${warnId}`
            );
            if (!resp.data.message) {
              const { data } = await axios.delete(
                `http://localhost:3000/api/warns/warning/${warnId}`
              );
              await interaction.reply({
                ephemeral: true,
                content: `Warn ${warnId} has been successfully removed!`,
              });
              return;
            }
            await interaction.reply({
              ephemeral: true,
              content: `Warn ${warnId} does not exist! Please enter a valid Warn ID `,
            });
          } catch (error) {
            console.error(error);
          }
        };
        deleteWarn();
        return;
      }
      if (mode === "review") {
        const warnId = interaction.options.getString("warnid");
        const getWarn = async () => {
          const { data } = await axios.get(
            `http://localhost:3000/api/warns/warning/${warnId}`
          );
          if (!data.message) {
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
        };
        getWarn();
      }
    } catch (error) {
      console.error(error);
    }
  },
};
