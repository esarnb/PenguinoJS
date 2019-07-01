exports.run = async (client, msg, args) => {

  if (msg.author.id == "241731561114959882" || msg.author.id == "312014669344931841") {
  	return msg.reply("oh boy, not you again")
  }
  if (!args[0]) return msg.channel.send("You forgot to say something...");
  if (msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) msg.delete();

  msg.channel.send({embed: new client.discord.MessageEmbed()
    .setColor(client.rColor())
    .setDescription(args.join(" ").slice(0, 2000))
  });
}

exports.help = {
  name: 'embed',
  desc: "Embed description",
  type: "Fun",
  usage: "-embed Emp is great",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
