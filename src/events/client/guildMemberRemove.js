const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "guildMemberRemove",
  async execute(member, client) {
    const welcomeChannel = client.channels.cache.get("1006837264418095134");

    try {
      const msg = welcomeChannel.send({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Farewell, ${member.user.username}!`)
            .setDescription(`We will miss you 😞!`)
            .setColor("Random")
            .setTimestamp()
            .setFooter({
              iconURL: member.guild.iconURL(),
              text: `  |  ${member.guild.name}`,
            }),
        ],
      });
      // await msg.react("😞");
    } catch (error) {
      console.error(error);
    }
  },
};
