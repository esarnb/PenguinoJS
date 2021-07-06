exports.run = async (client, msg, args) => {
  let ServerMusic = client.mongo.models.Musics
  findGuild()
  
  if (args[0]) {
    const yts = require( 'yt-search' )
    const collector = new client.discord.MessageCollector(msg.channel, m => m.author.id === msg.author.id, { time: 60000 });
    let opts = {
      query: args.join(" "),
      pageStart: 1, 
      pageEnd: 1
    }
    yts(opts, function ( err, r ) {
      if (err) msg.channel.send("error: " + err.message)
      const videos = r ? r.videos : null
      // const playlists = r.playlists || r.lists
      // const channels = r.channels || r.accounts
      // console.log(videos.size);
      // console.log(videos.length);

      if (videos && videos.length > 0) {
        videos.length = 15
        let vidOptions = videos.map((x,i) => `${i+1}. [${x.title}](${x.url})`)
        let embed = new client.discord.MessageEmbed().setDescription(vidOptions.join("\n"))
        msg.channel.send({embed: embed}).then((embed) => {
          collector.on('collect', m => {
            embed.delete({timeout: 100})
            if (isNaN(m.content) || +m.content > videos.length || +m.content < 1) msg.channel.send("Please input a number in the range!")
            else {
              addSong({title: videos[+m.content-1].title, url: videos[+m.content-1].url}, playSong)
              collector.stop()
            }
          })
        })
      } else return msg.channel.send("Videos not found.")
    })
  } else playSong()
  
    async function addSong(song, cb) {
      let current = await findGuild()
      if (!current) current = await findGuild()
      
      current.queue.push(song)
      current = await ServerMusic.findOneAndUpdate({ guildid: msg.guild.id }, {queue: current.queue});
      current.save((err, res) => { if (err) return console.error(err) })
      if (msg.guild.me.voice.connection && msg.guild.me.voice.connection.speaking.bitfield) msg.channel.send(`\`\`\`dsconfig\nAdded: ${song.title}\`\`\``)
      else cb()
    }

    async function findGuild() {
      let current = await ServerMusic.findOne({ guildid: msg.guild.id });

      if (!current) {
        let newGuild = new ServerMusic({ guildid: msg.guild.id, queue: [] })
        newGuild.save((err, res) => { if (err) return console.error(err) })
        return newGuild
      }
      else return current
    }

    async function playSong() {
      if (!msg.member.voice.channel) return msg.channel.send("Join a vc then run again")
      let vc = msg.guild.me.voice.connection ? msg.guild.me.voice.connection : await msg.member.voice.channel.join()
      // await   msg.guild.me.voice.connection.dispatcher.resume(); Crashes on new guilds

      let current = await ServerMusic.findOne({ guildid: msg.guild.id });
          
      if (current.queue.length > 0) {
        let toPlay =  current.queue.shift();
        current = await ServerMusic.findOneAndUpdate({ guildid: msg.guild.id }, {queue: current.queue, nowPlaying: toPlay.title});
        current.save((err, res) => { if (err) return console.error(err) })

        console.log(toPlay);
        let mstream = await require('ytdl-core-discord')(toPlay.url).catch((err) => msg.channel.send(`Err: ${err.message}`))
        let dispatcher = vc.play(mstream, {type: "opus"})
          .on("start", () => {
            dispatcher.setVolume(current.volume / 100);
            msg.channel.send(`\`\`\`dsconfig\nNow Playing: ${toPlay.title}\`\`\``)
          })
          .on("finish", () => {
            playSong()
          })
          .on('error', e => {
            console.error(e);
            msg.channel.send("Could not play this song. " + e.message ? e.message : "Unknown")
            playSong()
          })
      } 
        else return msg.channel.send("Queue is empty.")
    }
}
  
  exports.help = {
    name: 'play',
    desc: "play a song title (reply with a number)",
    type: "Disabled",
    usage: "Interesting Cmd",
    owner: false,
    locked: true,
    guild: false
  }