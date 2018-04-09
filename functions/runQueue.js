
const ytdl = require('ytdl-core');

module.exports = (client, msg, queue) => {
  if (queue.length === 0) {
     return msg.channel.send({embed: new client.discord.MessageEmbed()
      .setDescription(`Queue has finished playing, thanks for listening!`)

    }).then(() => {
        const voiceConnection = msg.guild.voiceConnection;
        if (voiceConnection !== null) voiceConnection.disconnect()
        client.voiceConnections.forEach(vc => {
          if (vc.dispatcher) {
            if (!vc.dispatcher.paused) {
              setTimeout( function() {
                vc.dispatcher.pause();
                setTimeout( function() {
                  vc.dispatcher.resume();
                }, 100);
              }, 100);
            }
          }
        });
    }).catch((err) => msg.channel.send(`Error occured!\n\`\`\`js\n1 ${err}\n\`\`\``));
  }

  new Promise((resolve, reject) => {
    const voiceConnection = msg.guild.voiceConnection;
    let queue = client.getQueue(client, msg.guild.id);

    if (voiceConnection === null) {
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join().then((connection) => {

          resolve(connection);
        }).catch((error) => {
          if (error) {
            queue.splice(0, queue.length);
            return msg.channel.send(`Error occured!\n\`\`\`js\n2 ${error}\n\`\`\``);
          }
        });
      } else {
        queue.splice(0, queue.length);
        reject();
      }
    } else {
      resolve(voiceConnection);
    }

  }).then((connection) => {
    const video = queue[0];
    let videoRequester = client.users.get(video.requester);
    const voiceConnection = msg.guild.voiceConnection;

    client.vidInfo = (video);
    msg.channel.send({embed: new client.discord.MessageEmbed()
      .setThumbnail(video.thumbnail)
      .setDescription(`Now Playing: [${video.title}](${video.webpage_url}) [${videoRequester}]`)

    }).then(() => {
      let dispatcher = connection.play(ytdl(video.webpage_url, {filter: 'audioonly'}));

      if (videoRequester === undefined) {
        setTimeout(function () {
          if (queue.length > 0) {
            queue.shift();
            client.runQueue(client, msg, queue);
          }
        }, 1000);
      }
      new Promise((resolve, reject) => {
        client.redis.exists(`GuildMusicVolume`, function (err, reply) {
          if (err) throw err;
          if (reply === 1) {
            client.redis.get(`GuildMusicVolume`, function(err, reply) {
              var obj = JSON.parse(reply);

              function isInList(guildy) {
                  return guildy.guildid === `${msg.guild.id}`;
              }
              // console.log(`RunQueue:${obj.users.find(isInList).guildid}|${obj.users.find(isInList).volumeSet}`);

              if (obj.users.find(isInList)){
                client.volumeSet = obj.users.find(isInList).volumeSet;

              voiceConnection.player.dispatcher.setVolume((client.volumeSet/100));
              }
            })
          }
        })
        resolve();
      })

      dispatcher.on('end', () => {
        setTimeout(() => {
          if (queue.length > 0) {
            queue.shift();
            client.runQueue(client, msg, queue);
          }
        }, 1000);
      });
    }).catch((e) => msg.channel.send(`Error occured!\n\`\`\`js\n3 ${e}\n\`\`\``));
  }).catch((e) => msg.channel.send(`Error occured!\n\`\`\`js\n4 ${e}\n\`\`\``));
}
