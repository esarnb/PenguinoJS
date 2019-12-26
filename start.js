require("dotenv").config()

const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  presence:{
    status: "online",
    activity: {
      name:  "Netflix",
      type: "WATCHING"
    }
  }
});

client.discord = Discord; // Attach discord functions into client 
require("./scripts/values.js")(client); // Initialize prefix and variables
require("./load.js")(client); // Load in commands and events

process.on('unhandledRejection', err => {
  if (err) throw err;
  //or send a message to me in dms
});

client.login(process.env.TOKEN);
