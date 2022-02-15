require("dotenv").config()

const Discord = require("discord.js");

const intentList = [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_BANS,
  Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  Discord.Intents.FLAGS.GUILD_INVITES,
  Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  Discord.Intents.FLAGS.GUILD_PRESENCES,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  // GUILD_MESSAGE_TYPING,
  Discord.Intents.FLAGS.DIRECT_MESSAGES,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  // DIRECT_MESSAGE_TYPING
  Discord.Intents.FLAGS.GUILD_SCHEDULED_EVENTS
];

const client = new Discord.Client({
  disableEveryone: true,
  presence:{
    status: "online",
    activity: {
      name:  "@HashyJS help",
      type: "WATCHING"
    }
  },
  intents: intentList,
  partials: ['CHANNEL'],
  // { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }
});

client.discord = Discord; // Attach discord functions into client 
require("./scripts/values.js")(client); // Initialize prefix and variables
// require("./Mongoose/mongoose.js")(client); // Initialize MongoDB Connection
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
