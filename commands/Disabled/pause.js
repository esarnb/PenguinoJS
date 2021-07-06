exports.run = async (client, msg, args) => {
  if (msg.guild.me.voice.connection) {
    msg.channel.send("Pausing...").then((m) => {
      msg.guild.me.voice.connection.dispatcher.pause();
      m.edit("Paused.")
    })
  } else msg.channel.send("I am not in vc!")
}
  
  exports.help = {
    name: 'pause',
    desc: "Bot pauses music",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }