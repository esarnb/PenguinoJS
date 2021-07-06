exports.run = async (client, msg, args) => {
  let ServerMusic = client.mongo.models.Musics
  let current = await ServerMusic.findOne({ guildid: msg.guild.id });

  let embed = new client.discord.MessageEmbed()
  if (!current.queue.length && (!msg.guild.me.voice.connection || !msg.guild.me.voice.connection.speaking.bitfield) ) return msg.channel.send("No queued songs.")
  if (current.queue.length) embed.setDescription("Up next:\n"+current.queue.map((x,i) => i+1 + ". " + x.title).join("\n"))
  if (current.nowPlaying) embed.setTitle("Now Playing: " + current.nowPlaying) 
  msg.channel.send({embed: embed})
}
  
  exports.help = {
    name: 'queue',
    desc: "Shows what's queued up.",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }