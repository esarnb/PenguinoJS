exports.run = async (client, msg, args) => {
  if (msg.guild.me.voice.connection) {
    msg.channel.send("Resuming...").then((m) => {
      msg.guild.me.voice.connection.dispatcher.resume();
      m.edit("Resumed.")
    })
  } else msg.channel.send("I am not in vc!")
}
  
  exports.help = {
    name: 'resume',
    desc: "Bot resumes music",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }