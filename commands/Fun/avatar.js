exports.run = async (client, msg, args) => {
  if (!msg.guild|| !args[0]) return msg.channel.send({embed: new client.discord.MessageEmbed().setFooter(msg.author.tag).setImage(msg.author.avatarURL()).setColor(client.rColor())})
 /*If the user is in dms, there is no member obj, if they are in the server, then it is a member object [.setfooter and .setImage]*/
  let mentionedUser = msg.mentions.members.first();
  let argsUser = client.users.get(args[0]);

  if (mentionedUser) return msg.channel.send({embed: new client.discord.MessageEmbed().setFooter(mentionedUser.user.tag).setImage(mentionedUser.user.avatarURL()).setColor(client.rColor())})
  else if (!isNaN(args[0]) && argsUser) return msg.channel.send({embed: new client.discord.MessageEmbed().setFooter(argsUser.tag).setImage(argsUser.avatarURL()).setColor(client.rColor())})
  else return msg.channel.send("Couldnt find user through mention or userid! Try again c:")
}

exports.help = {
  name: 'avatar',
  desc: "Shows the avatar of a person mentioned or by userid \n(userid only works if the bot is in the same server as the user)",
  type: "Fun",
  usage: "-avatar @mention\n-avatar userid",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
