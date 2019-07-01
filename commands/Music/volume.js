exports.run = async (client, msg, args) => {
  var vc = msg.member.guild.members.get(client.user.id).voice.channel
  if (!args[0]) {
    if (vc) {
      msg.channel.send("Current volume: " + vc.connection.dispatcher.volume * 100 + "/200")
    }
  }
  else if (isNaN(args[0]) || (parseInt(args[0]) < 1 || parseInt(args[0]) > 200) ) {
    msg.channel.send("Volume can be a number between 1 to 10 (inclusive). A max of 10 is doubling the normal volume.")
  }
  else {
    vc.connection.dispatcher.setVolume(parseInt(args[0])/100)
  }
}

exports.help = {
  name: 'volume',
  desc: "Set the volume of music in a channel.",
  type: "Music",
  usage: "-volume 5",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
