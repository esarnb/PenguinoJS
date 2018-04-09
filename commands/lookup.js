const moment = require("moment")
module.exports.run = (client, msg, args) => {
 try {
   var guildy = client.guilds.get(args[0])
   var embed = new client.discord.MessageEmbed()
     .addField(`Name`, guildy.name)
     .addField(`Owner`, guildy.owner)
     .addField(`id`, guildy.id)
     .addField(`Users`, guildy.members.filter(xx => !xx.user.bot).size)
     .addField(`Bots`, guildy.members.filter(xx => xx.user.bot).size)
     .addField(`Server Created At`, moment(guildy.createdAt).format('MM/DD/YYYY  | hh:mm A'))
   msg.channel.send(embed)
 }
 catch (err) {
   msg.reply("" + err.message)
 }
}

module.exports.info = {
  name: "test",
  help: "Testing.",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
