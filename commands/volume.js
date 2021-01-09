exports.run = async (client, msg, args) => {
  let ServerMusic = client.mongo.models.Musics
  let current = await ServerMusic.findOne({ guildid: msg.guild.id });
    if (!args[0]) return msg.channel.send(`Current Volume: ${current.volume}`)
    if (isNaN(args[0]) || !Number.isInteger(+args[0]) || +args[0] < 0 || +args[0] > 200) return msg.channel.send("Value should be between 0 and 200")
    current = await ServerMusic.findOneAndUpdate({ guildid: msg.guild.id }, {volume: args[0]}, (res) => {
      msg.guild.me.voice.connection.dispatcher.setVolume(current.volume / 100);
      current.save((err, res) => { if (err) return console.error(err); msg.channel.send(`New Volume: ${res.volume}`) })
    });
}
  
  exports.help = {
    name: 'volume',
    desc: "change current volume",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }