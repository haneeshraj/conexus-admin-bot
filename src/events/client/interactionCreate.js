const { EmbedBuilder } = require("discord.js");
const row = require("../../options/roles.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          ephemeral: true,
          content: "An error has occured!",
        });
      }
    }

    // Role info

    if (!interaction.isSelectMenu()) return;
    switch (interaction.values[0]) {
      case "roles_announcements":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Announcement Role!")
              .setDescription(
                "\n\n<@&1006112050340167810> - This roles enables you to receive private notifications whenever an announcement is made to keep track of the updates on the server!"
              )
              .setTimestamp()
              .setFields({
                name: "Command Usage",
                value: "`/role assign [ROLENAME]`",
              })
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      case "roles_pronouns":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Pronoun Roles!")
              .setDescription(
                "\n<@&1006096335625269270>\n\n<@&1006096378860159037>\n\n<@&1006096434698932224>\n"
              )
              .setTimestamp()
              .setFields({
                name: "Command Usage",
                value: "`/role assign [ROLENAME]`",
              })
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      case "roles_musician":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Musician Roles!")

              .setTimestamp()
              .setFields(
                {
                  name: "Instrumentalist",
                  value:
                    "<@&1007992573350133830> • If you play an musical instrument\n\n<@&1007992806305972234> • If you play the guitar\n\n<@&1007992823276130404> • If you play the piano\n\n<@&1007992866150297640> • If you play the flute\n\n<@&1007992979451031552> • If you play the bass",
                },
                {
                  name: "Artists",
                  value:
                    "<@&1006108333876453376> • If you are a music artist\n\n<@&1006095128680726598> • If you are a rapper\n\n<@&1006095148301701120> • If you are a vocalist\n\n<@&1006094662626447390> • If you are a sound engineer\n\n<@&1006094599061786736> • If you are a music producer\n\n<@&1006095097185718302> • If you are a music NFT artist ",
                },
                {
                  name: "Command Usage",
                  value: "`/role assign [ROLENAME]`",
                }
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      case "roles_programmer":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Programmers Roles!")
              .setDescription(
                "<@&1006110709165326417> - A programmer role which will let you access to all the programmer chats"
              )
              .setTimestamp()
              .setFields(
                {
                  name: "Field Of Interest",
                  value:
                    "<@&1006094571769438238> • If you're a full stack web developer \n\n<@&1006108841676636211> • If you're a frontend developer \n\n<@&1006109028818092052> • If you're a backend developer \n\n<@&1006447015389057104> •  If you're a game developer \n\n<@&1006447132942803014> •  If you're a mobile application developer \n\n<@&1006447412967133214> •  If you're a competitive coder \n\n<@&1006110786017574913> • if you're a data scientist/analyst",
                },
                {
                  name: "Languages",
                  value:
                    "<@&1006105706094678077>\n\n<@&1006105756313059408>\n\n<@&1006106439019925565>\n\n<@&1006106604392960110>\n\n<@&1006105791918514237>\n\n<@&1006105875800399882>\n\n<@&1006106665789181972>\n\n<@&1006106375245549650>\n\n<@&1006107276597268540>\n\n<@&1006106432585863228>\n\n<@&1006111077513310279>\n\n<@&1006106792943681577>\n\n<@&1006106833427107860>\n\n<@&1006106875995111424>\n\n<@&1006112978191527936>\n\n<@&1006113036836274216>\n\n<@&1006111023020904479>\n\n<@&1006106922539302942>\n\n<@&1006107012481941534>\n\n<@&1006107050486538240>\n\n<@&1006107094556090389>\n\n<@&1006110934080700558>\n\n<@&1006107163950845972>\n\n<@&1006110897330192424>",
                },
                {
                  name: "Command Usage",
                  value: "`/role assign [ROLENAME]`",
                }
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      case "roles_artist":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Artist Roles!")
              .setDescription(
                "<@&1008001307958841407> • If you sketch, paint, draw etc, this is your role :)"
              )
              .setTimestamp()
              .setFields(
                {
                  name: "Designer/Artist",
                  value:
                    "<@&1006094485744259083> • If you are a motion designer\n\n<@&1006094525535633459> • If you are a graphic designer\n\n<@&1006094546691702805> • If you are a web designer\n\n<@&1008001683474878568> • If you are a fashion designer\n\n<@&1008002153920602113> • If you are a VFX artist",
                },
                {
                  name: "Softwares",
                  value:
                    "<@&1006109477101117542> • If you use After Effects  \n\n<@&1006109452270837801> • If you use Photoshop\n\n<@&1006109495828689027> • If you use Premiere Pro \n\n<@&1006110571596349440> • If you use Illustrator \n\n<@&1006109528057708554> • If you use Nuke\n\n<@&1006109733436018690> • If you use Rhino\n\n<@&1006109566196527164> • If you use Blender\n\n<@&1006109696450633758> • If you use Maya\n\n<@&1006109590821273682> • If you use 3DS Max\n\n<@&1006109542016372746> • If you use Cinema4D\n\n<@&1006111328429166652> • If you use Octane\n\n<@&1006111349123842110> • If you use Redshift\n\n<@&1006111369168433212> • If you use Vray\n\n",
                },
                {
                  name: "Command Usage",
                  value: "`/role assign [ROLENAME]`",
                }
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      case "roles_gamer":
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new EmbedBuilder()
              .setColor("Random")
              .setTitle("Gamer Roles!")
              .setDescription(
                "\n\n<@&1006113684143222876> - If you're an epic gamer, this role awaits you!"
              )
              .setTimestamp()
              .setFields(
                {
                  name: "Games",
                  value:
                    "<@&1007976301648416908> • If you play Minecraft\n\n<@&1007976515843149965> • If you play Overwatch\n\n<@&1007976535476686918> • If you play League Of Legends\n\n<@&1007976575519694868> • If you play Roblox\n\n<@&1007976887101968484> • If you play Apex Legends\n\n<@&1007976699931136020> • If you play GTA\n\n<@&1007976847918768159> • If you play Valorant\n\n<@&1007976935558742056> • If you play Fortnite\n\n<@&1007976490958336000> • If you play CSGO",
                },
                {
                  name: "Command Usage",
                  value: "`/role assign [ROLENAME]`",
                }
              )
              .setFooter({
                iconURL: interaction.guild.iconURL(),
                text: `  |  ${interaction.guild.name}`,
              }),
          ],
          components: [],
        });
        break;
      default:
        console.error(error);
        break;
    }

    // END OF ROLE INFO
  },
};
