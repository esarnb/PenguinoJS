exports.run = async (client, msg, args) => {
  if (msg.author.id == "241731561114959882" || msg.author.id == "312014669344931841") {
  	return msg.reply("oh boy, not you again")
  }
  if (msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) msg.delete({timeout: 300});
  msg.channel.send(args.join(" "))
}

exports.help = {
  name: 'say',
  desc: "say things",
  type: "Fun",
  usage: "-say Emp is great",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
