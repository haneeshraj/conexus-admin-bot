const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  async execute(member, client) {
    try {
      const welcomeChannel = client.channels.cache.get("1006091452750770226");

      welcomeChannel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              `Welcome to ${member.guild.name}, ${member.user.username}!`
            )
            .setDescription(
              `We hope you have a great time in ${member.guild.name}!\nBefore you make new friends, please make sure to read <#1006093796779507723> and <#1006093388082331708>!`
            )
            .setColor("Random")
            .setTimestamp()
            .setFooter({
              iconURL: member.guild.iconURL(),
              text: `  |  ${member.guild.name}`,
            }),
        ],
      });
      await msg.react("🥳");
    } catch (error) {
      console.error(error);
    }
  },
};
