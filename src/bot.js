const {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
} = require("discord.js");
const colors = require("colors");
require("dotenv").config();
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildIntegrations,
  ],
  partials: [
    Partials.GuildMember,
    Partials.User,
    Partials.Channel,
    Partials.Message,
  ],
});

client.commands = new Collection();
client.buttons = [];
client.commandArray = [];

// client.on("interactionCreate", (interaction) => {
// });

const functionFolder = fs.readdirSync(`./src/functions`);
for (const folder of functionFolder) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();

client.login(process.env.BOT_TOKEN);
