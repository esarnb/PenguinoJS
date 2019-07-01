exports.run = async (client, msg, args) => {
  var dispatcherChannel = msg.member.guild.members.get(client.user.id).voice.channel.connection.dispatcher
  dispatcherChannel.pause;
  msg.channel.send("Paused music.")
}

exports.help = {
  name: 'pause',
  desc: "Pause the bot's speech.",
  type: "Music",
  usage: "-pause",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
