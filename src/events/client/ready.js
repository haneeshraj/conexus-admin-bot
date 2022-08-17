module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    client.user.setPresence({
      activities: [{ name: "with Mist!" }],
      status: "online",
    });

    console.log(
      `${client.user.tag}`.bgMagenta + " is logged and ready to go!".cyan
    );
  },
};
