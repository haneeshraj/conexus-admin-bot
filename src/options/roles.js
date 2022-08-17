const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

const row = new ActionRowBuilder().addComponents(
  new SelectMenuBuilder()
    .setCustomId("roles")
    .setPlaceholder("Select a role option")
    .addOptions(
      {
        label: "Announcement",
        description:
          "Announcement role for recieving personal notifications for the announcements made in the server",
        value: "roles_announcements",
      },
      {
        label: "Pronouns",
        description: "Lists out all the available pronoun roles in the server.",
        value: "roles_pronouns",
      },
      {
        label: "Musician",
        description:
          "Lists out all the available musician roles in the server.",
        value: "roles_musician",
      },
      {
        label: "Programmer",
        description:
          "Lists out all the available programmer roles in the server.",
        value: "roles_programmer",
      },
      {
        label: "Artist",
        description: "Lists out all the available artist roles in the server.",
        value: "roles_artist",
      },
      {
        label: "Gamer",
        description: "Lists out all the available gamer roles in the server.",
        value: "roles_gamer",
      }
    )
);

module.exports = row;
