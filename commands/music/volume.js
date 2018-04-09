module.exports.run = (client, msg, args) => {
  let voiceConnection = msg.guild.voiceConnection;
  let queue = client.getQueue(client, msg.guild.id);
  // if (client.redis) {
  //   client.redis.exists(`GuildMusicVolume`, function (err, reply) {
  //     if (err) throw err;
  //     if (reply === 1) {
  //       client.redis.get(`GuildMusicVolume`, function(err, reply) {
  //         var obj = JSON.parse(reply);
  //         for (let thisOne of obj.users) {
  //           if (thisOne.guildid == msg.guild.id) {
  //             obj.users[obj.users.indexOf(thisOne)].volumeSet = args[0];
  //             client.redis.set(`GuildMusicVolume`, JSON.stringify(obj), function(err, reply) {
  //               if (err) throw err;
  //             })
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

  if (!voiceConnection === null || queue.length <= 0) return msg.channel.send(`There's nothing being played right now, ${msg.author.username}!`);
  if (!msg.member.hasPermission(`ADMINISTRATOR`) && msg.author.id !== queue[0].requester && msg.author.id !== client.config.ownerid) return msg.channel.send(`${msg.author.username} Only video requester or an admin can do that! Go change my mic volume instead!`);
  if (!args || args == '' || args === undefined) return msg.channel.send({embed: new client.discord.MessageEmbed()
    .setDescription(`**< Command Usage >**`)
    .addField(`Command:`, `**${client.prefix}volume** \`<number>\``)
    .addField(`Example:`, `**${client.prefix}volume** \`10\``)
    .setFooter(msg.author.username, msg.author.avatarURL)
  });
  if (isNaN(args[0]) && !parseInt(args[0])) return msg.channel.send(` \`${args[0]}\` is not a number!`);
  if (args[0] > 200 || args[0] < 0) return msg.channel.send(`**\`${args[0]}\` is ${args[0] < 0 ? 'too low' : 'too high'} ${msg.author.username}!**`);

  let dispatcher = voiceConnection.player.dispatcher;

  new Promise((resolve, reject) => {
    dispatcher.setVolume((args[0]/100));
    resolve();
  }).then(() => {
    new Promise(function(resolve, reject) {
      msg.channel.send(`**Set the volume to \`${args[0]}\`!**`)
      resolve();
    });
  })
}


module.exports.info = {
  name: "volume",
  help: "Control sound.",
  categ: "Music",
  owner: false,
  admin: false,
  issue: false
}
