exports.run = async (client, msg, args) => {
  var dispatcherChannel = msg.member.guild.members.get(client.user.id).voice.channel.connection.dispatcher
  dispatcherChannel.resume;
  msg.channel.send("Resumed music.")
}

exports.help = {
  name: 'resume',
  desc: "Resume the bot's speech.",
  type: "Music",
  usage: "-resume",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
