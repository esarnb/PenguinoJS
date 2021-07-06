exports.run = async (client, msg, args) => {
  let ServerMusic = client.mongo.models.Musics
  let current = await ServerMusic.findOne({ guildid: msg.guild.id });
  if (!msg.guild.me.voice.connection) msg.channel.send("Im not in vc!")
  else if (!current.queue.length && !msg.guild.me.voice.connection.speaking.bitfield) msg.channel.send("Empty queue!")
  else if (msg.guild.me.voice.connection) msg.guild.me.voice.connection.dispatcher.end()
  else msg.channel.send("Oh no something went wrong on command skip")
}
  
  exports.help = {
    name: 'skip',
    desc: "skip 'now playing' song.",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }