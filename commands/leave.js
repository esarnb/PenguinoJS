exports.run = async (client, msg, args) => {
  if (msg.guild.me.voice.connection) msg.guild.me.voice.channel.leave()
}
  
  exports.help = {
    name: 'leave',
    desc: "Bot leaves VC",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }