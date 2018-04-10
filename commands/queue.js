
module.exports.run = (client, msg, args) => {

  var queueStat = `Stopped!`;
  var voiceConnection = msg.guild.voiceConnection;
  var queue = client.getQueue(client, msg.guild.id);
  var queueText = queue.map((video, index) => (
    `${index + 1}: __${video.title}__`
  )).join("\n");

  if (voiceConnection !== null) {
    var dispatcher = voiceConnection.player.dispatcher;
    queueStat = voiceConnection.paused ? "Paused!" : "Playing!";
  }
  else if (!queueText) {
    return msg.channel.send({embed: new client.discord.MessageEmbed()
      .setDescription(`Queue for **${msg.guild.name}** (${queueStat}):\n\nThere is nothing in the queue, play something!`)
      .setColor(client.rColor)
    });
  }
  return msg.channel.send({embed: new client.discord.MessageEmbed()
    .setDescription(`Queue for **${msg.guild.name}** (${queueStat}):\n\n${queueText}`)
    .setColor(client.rColor)
  });
}
// Youtube API Key("AIzaSyC64ykWqc8X25HvkbYep5sXiDamGINNHxw");

module.exports.info = {
  name: "queue",
  help: "Music queue",
  categ: "Music",
  owner: false,
  admin: false,
  issue: false
}
