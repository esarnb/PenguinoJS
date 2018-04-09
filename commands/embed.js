module.exports.run = (client, msg, args) => {
  msg.delete({timeout: 300})
  var embed = new client.discord.MessageEmbed()
    .setDescription(`${args.join(" ")}`)
    msg.channel.send(embed);
}

module.exports.info = {
  name: "embed",
  help: "Embed anything you like.",
  categ: "Fun",
  owner: false,
  admin: false,
  issue: false
}
