const ytdl = require("youtube-dl");
const ytsearch = require("youtube-search");

module.exports.run = (client, msg, args) => {
  var queue = client.getQueue(client, msg.guild.id);
  var testUrl = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  if (args.length == 0) {
    msg.channel.send("You need to provide a link or title!");
  }
  else if (testUrl.test(args.join(" "))) { // Play link
    msg.delete({timeout: 100});

    msg.channel.send("Searching...").then((m) => {
      ytdl.getInfo(args.join(" "), ["--no-warnings", "--force-ipv4"], {cwd: __dirname, maxBuffer: Infinity}, (err, info) => {
        if (err || info.format_id === undefined || info.format_id.startsWith("0")) {
          console.log(err);
          return msg.channel.send("Could not play the video! [Error 1]");
        }

        info.requester = msg.author.id;
        queue.push(info);

        m.edit(`Queued ${info.title}`).then(() => {
          if (queue.length === 1) {
            client.runQueue(client, msg, queue);
          }
        }).catch(err => console.log(err));
      });
    }).catch(err => console.log(err));
  }
  else { // Search video
    ytsearch(args.join(" "), {maxResult: 5, safeSearh: false,  key: "AIzaSyC64ykWqc8X25HvkbYep5sXiDamGINNHxw"}, (err, videoInfo) => {
      if (err) return console.log(`NUMERO UNO S1 ${err}`);

      msg.channel.send("Searching...").then(async (toReact) => {
        toReact.edit({embed: new client.discord.MessageEmbed()
            .setDescription(`**Results for \`${args.join(' ')}\`**:\n\n🐟 **[${videoInfo[0].title}](${videoInfo[0].link})**\n\n🐠 **[${videoInfo[1].title}](${videoInfo[1].link})**\n\n🐡 **[${videoInfo[2].title}](${videoInfo[2].link})**
              \n🍥 **[${videoInfo[3].title}](${videoInfo[3].link})
              \n\n🐧 Cancel**`, true)
            .setFooter(msg.author.username, msg.author.avatarURL)
            .setColor(client.rColor)
          });
          var collector =  new client.discord.ReactionCollector(toReact, m => m.users.last().id == msg.author.id, {time: 60000, dispose: true});
          var nowDelete = false;
          await collector.on('collect', (mm) => {

            if (mm.emoji.name == '🐟') {
              queueVid(videoInfo[0].link);
              toDo();
            } else if (mm.emoji.name == '🐠') {
              queueVid(videoInfo[1].link);
              toDo();
            } else if (mm.emoji.name == '🐡') {
              queueVid(videoInfo[2].link);
              toDo();
            } else if (mm.emoji.name == '🍥') {
              queueVid(videoInfo[3].link);
              toDo();
            }
            else if (mm.emoji.name == '🐧') {
              toReact.delete({timeout: 10});
              toDo();
            }

            function toDo() {
              collector.stop();
              if (nowDelete) {
                toReact.delete({timeout: 100});
              }
              else {
                setTimeout(function () {
                    toReact.delete({timeout: 100});
                }, 5000);
              }
            }
          });

          await toReact.react('🐟');
          await toReact.react('🐠');
          await toReact.react('🐡');
          await toReact.react('🍥');
          await toReact.react('🐧');

          await function() {nowDelete = true;}

         function queueVid(link) {
          ytdl.getInfo(link, ["--no-warnings", "--force-ipv4"], {cwd: __dirname, maxBuffer: Infinity}, (err, info) => {
            if (err || info.format_id === undefined || info.format_id.startsWith("0")) {
              console.log(err);
              return msg.channel.send({embed: new client.discord.MessageEmbed()
                .setDescription(`Could not play video!`)
                .setColor(client.rColor)
              }).then((md) => {
                md.delete({timeout: 100})
              })
            }

            info.requester = msg.author.id;
            queue.push(info);

            msg.channel.send({embed: new client.discord.MessageEmbed()
              .setDescription(`Queued ${info.title}`)
              .setColor(client.rColor)
            }).then((qm) => {
              if (queue.length === 1) {
                qm.delete({timeout: 100});
                client.runQueue(client, msg, queue);
              }
            }).catch(err => console.log(err));
          });
        }

      }).catch(err => console.log(err));
    });

  }
}

module.exports.info = {
  name: "play",
  help: "Play some music.",
  categ: "Music",
  owner: false,
  admin: false,
  issue: false
}
