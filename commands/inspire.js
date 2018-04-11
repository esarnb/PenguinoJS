const request = require('request');
const moment = require("moment")
module.exports.run = (client, msg, args) => {
 try {
   request('http://inspirobot.me/api?generate=true', (err, body, resp) => {
     if (!err ) {
       msg.channel.send({embed: new client.discord.MessageEmbed()
         .setImage(resp)
       })
     }
     else {
       console.log(err);
     }
   });
 }
 catch (err) {
   msg.reply("" + err.message)
 }
}

module.exports.info = {
  name: "inspire",
  help: "Randomly generated innspirational quotes from AI.",
  categ: "Fun",
  owner: false,
  admin: false,
  issue: false
}
