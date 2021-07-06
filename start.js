require("dotenv").config()

const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  presence:{
    status: "online",
    activity: {
      name:  "@PenguinoJS help",
      type: "WATCHING"
    }
  },
  intents: Discord.Intents.ALL
});

client.discord = Discord; // Attach discord functions into client 
require("./scripts/values.js")(client); // Initialize prefix and variables
require("./Mongoose/mongoose.js")(client); // Initialize MongoDB Connection
require("./load.js")(client); // Load in commands and events
// require("./Twitch/twitch.js")(client); // Initialize Twitch Webhooks // Moved to separate Github project
// require("./MedalTV/medalTV.js")(client); // Initialize Medal Records // Moved to separate Github project

process.on('unhandledRejection', err => { if (err) console.log(err) });

// Handle clean exit
process.on('SIGINT', async () => {
  if (this.voice && this.voice.connections.length) await this.voice.connections.map((c) => c.channel.leave());
  // for (x in client.twitch.streamers) client.twitch.streamers.sub ? client.twitch.streamers.sub.stop() : null;
  await process.exit()
});

client.login(process.env.TOKEN);
