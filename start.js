const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  presence:{
    status: "online",
    activity: {
      name:  "`>support | >help | @PenguinoJS prefix`",
      type: "WATCHING"
    }
  }
});

client.discord = Discord;
var Empy = new client.discord.Collection();

client.colors = require('colors');
client.moment = require("moment");
client.tools = require("./tools.js");
client.config =  require("./config.json");

require("./loadCommandsAndEvents.js").run(client)
require("./staff.js").run(client)
// require("./felix.js").run(client)

/* These are located in ready event handler
    require("./flags.js").run(client)
    require("./mysql.js").run(client)
    require("./express.js").run(client)
    require("./mongodb.js").run(client)
*/


client.discord = Discord;
client.prefix = client.config.prefix;
client.errChannel = client.channels.get(client.config.errorChannel);
client.eventsChannel = client.channels.get(client.config.eventsChannel);
client.rColor = function () {return Math.floor(Math.random()*16777215).toString(16)}



process.on('unhandledRejection', error => {
    console.log(error);

    if (client.errorChannel) {
      client.errorChannel.send({
        embed: new client.discord.MessageEmbed()
          .setDescription(`\`\`\`xl\n${error.stack.slice(0, 1900)}\n\`\`\``)
      })
    }
});

client.login(client.config.token);
