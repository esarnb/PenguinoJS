exports.run = async (client, msg, args) => {
  if (msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) msg.delete({timeout: 300});
  if (!args[0]) return msg.channel.send("Try again but with a link to a picture").then((msgy) => msgy.delete({timeout: 5000}));
  try {
    msg.channel.send({embed: new client.discord.MessageEmbed()
      .setImage(args[0])
      .setFooter(msg.author.tag, msg.author.avatarURL())
      .setDescription(`[Sauce](${args[0]})`, msg.author.avatarURL())
    })
  }
  catch (err) {
    msg.channel.send(err.message).then((msgy) => msgy.delete({timeout: 5000}))
  }
}

exports.help = {
  name: 'pic',
  desc: "convert link to pic",
  type: "Fun",
  usage: "-pic URL.gif\nSupports gif jpg jpeg.",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
