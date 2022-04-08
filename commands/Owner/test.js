exports.run = async (client, msg, args) => {
  msg.channel.send({embeds: [
    new client.discord.MessageEmbed()
      .setDescription(`Dynamic Timestamp: <t:${parseInt((+ new Date())/1000)}:R>`)
  ]})
}

exports.help = {
  name: 'test',
  desc: "test",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}