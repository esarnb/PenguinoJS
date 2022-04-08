require("dotenv").config()
const Discord = require("discord.js");
const { intentsList } = require("./scripts/data");

const client = new Discord.Client({
  disableEveryone: true,
  presence:{
    status: "online",
    activity: {
      name:  "@PenguinoJS help",
      type: "WATCHING"
    }
  },
  intents: intentsList,
  partials: ['CHANNEL'],
  // { partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }
});

client.discord = Discord; // Attach discord functions into client 
require("./scripts/values.js")(client); // Initialize prefix and variables
require("./load.js")(client); // Load in commands and events
require("./Sequelize/init")(); // Initialize Sequelize Connection

process.on('unhandledRejection', err => { if (err) console.log(err) });

// Handle clean exit
process.on('SIGINT', async () => {
  if (this.voice && this.voice.connections.length) 
    await this.voice.connections.map((c) => c.channel.leave());
  process.exit()
});

client.login(process.env.TOKEN);
