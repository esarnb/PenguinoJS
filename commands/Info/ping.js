exports.run = async (client, msg, args) => {
  let emojis = [
  	`https://cdn.discordapp.com/emojis/508027554557329448.gif?v=1`,
  	`https://cdn.discordapp.com/emojis/468080518341197834.gif?v=1`,
  	`https://cdn.discordapp.com/emojis/544526717562257428.gif?v=1`,
  	`https://cdn.discordapp.com/emojis/468080498225184801.gif?v=1`,
  	`https://cdn.discordapp.com/emojis/429390316261605396.gif?v=1`
  ]

  msg.channel.send(`*Pinging...*`).then((m) => {
    let prompt = `Message Delay: ${Math.round(m.createdTimestamp - msg.createdTimestamp)}ms ❄  Websocket Ping: ${Math.round(client.ws.ping)}ms`;
    if (msg.guild && !msg.guild.members.get(client.user.id).hasPermission("EMBED_LINKS", {checkAdmin: true, checkOwner: true})) {
      m.edit(prompt)
    }
    else {
      m.edit("", {
        embed: new client.discord.MessageEmbed()
        .setFooter(prompt, emojis[Math.floor(Math.random() * emojis.length)])
        .setColor(client.rColor())
      });
    }
  });
}

exports.help = {
  name: 'ping',
  desc: "Shows latency in miliseconds",
  type: "Info",
  usage: "-ping",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
