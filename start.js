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

require("./scripts/load.js")(client);
require("./scripts/owners.js")(client);
require("./scripts/values.js")(client);

process.on('unhandledRejection', err => {
  if (err) throw err;
  //or send a message to me in dms
});

client.login(process.env.TOKEN);
