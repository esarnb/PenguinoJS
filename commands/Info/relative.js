require("dotenv").config();

exports.run = async (client, msg, args) => {
  msg.channel.send({embeds: [
    new client.discord.MessageEmbed()
      .setDescription(`Dynamic Timestamp: <t:${parseInt((+ new Date())/1000)}:R>`)
  ]})
}

exports.help = {
  name: 'relative',
  desc: "relative",
  type: "Info",
  usage: "Show dynamic timestamp relative to now",
  owner: false,
  locked: false,
  guild: false
}