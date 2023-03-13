require("dotenv").config();

exports.run = async (client, msg, args) => {
  const msgCollector = new MessageCollector(msg.channel, {
    
  });

  msgCollector.collect((message) => {

  });

  msgCollector.dispose((message) => {

  });

  msgCollector.end((collected, reason) => {

  });

  msg.channel.send({
    embeds: [
      new client.discord.MessageEmbed()
        .setDescription("<a:cockdance:671548656192847883>")
    ]
  });
}

exports.help = {
  name: 'test',
  desc: "test",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}