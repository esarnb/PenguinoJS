const Discord = require("discord.js");
const client = new Discord.Client({autoReconnect:true});
const redis = require('redis');

client.discord = require("discord.js");
client.colors = require('colors/safe');

client.config = require("./config.json");

client.load = require("./functions/autoCMD.js");
client.getQueue = require("./functions/getQueue.js");
client.runQueue = require("./functions/runQueue.js");

client.prefix = client.config.prefix; //Im so lazy

client.commands = {};
client.queues = {};
client.load(client);

client.URE = "Empty";

client.on('ready', () => require('./events/ready.js')(client));
client.on('message', (msg) => require('./events/message.js')(client, msg));
process.on('unhandledRejection', error => {
    console.log(error);
    client.users.get(client.config.ownerid).send("Error: \n" + error.message + "\n\n" + client.URE);
});

client.redis = redis.createClient();
if (client.redis) {
  let dbNum = 0;
  client.redis.select(dbNum);
  client.redis.on('connect', function() {
      console.log(client.colors.cyan(`Redis is now connected on database: [${dbNum}]`));
  });
}
client.login(client.config.token);
