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

client.discord = Discord;
client.prefix = client.config.prefix;
client.config = require("./config.json");
client.rColor = function () {return Math.floor(Math.random()*16777215).toString(16)}

process.on('unhandledRejection', err => {
  if (err) throw err;
  //or send a message to me in dms
});

client.login(client.config.token);
