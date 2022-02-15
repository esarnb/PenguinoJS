const dayjs = require("dayjs");

exports.run = async (client, msg, args) => {
  let target;
  if (!args[0]) target = msg.member;
  else if (msg.mentions.members.size) target = msg.mentions.members.first();
  else if (!isNaN(args[0])) {
    let user = await msg.guild.members.resolve(args[0])
    if (user) target = user;
    else msg.channel.send("usr not found by id")
  } else {
    let username = await msg.guild.members.cache.filter(x => x.displayName == args.join(" "))
    if (username) target = username.first()
  }

  if (!target) return msg.channel.send("User not found.")
  let embed = new client.discord.MessageEmbed();

  embed.addField("**Member INFO**", " ឵឵ ឵឵ ឵឵ ឵឵")
  embed.addField("Displayname", target.displayName, false) 
  embed.addField("Nametag | ID", `${target.user.tag} | ${target.user.id}`, false) 
  embed.addField("Manipulation", `Bannable: ${target.bannable} | Kickable: ${target.kickable} | Manageable: ${target.manageable}`, false) 
  embed.addField("Color", `Color: ${target.displayColor} | Hex: ${target.displayHexColor}`, false)
  embed.addField("joinedAt", `${dayjs(target.joinedTimestamp).format('MM/DD/YYYY hh:mm:ss')} UTC`, false) 
  embed.setThumbnail(target.user.avatarURL())
  if (target.premiumSince) {
    embed.addField("Premium Since", " ឵឵ ឵឵"+target.premiumSince, false) 
    embed.addField("Premium Since Timestamp", " ឵឵ ឵឵"+target.premiumSinceTimestamp, false) 
  }
  
  // if (target.presence) { 
  //   if (target.presence.clientStatus) embed.addField("Status", target.presence.clientStatus)
  //   if (target.presence.activities.length) target.presence.activities.map(x => {
  //     embed.addField(`${x.emoji} ឵឵ ឵឵${x.name}`, `${x.type} ឵឵ ឵឵${x.details}`)
  //   })
  // }
  if (target.roles) {
    embed.addField("Roles", target.roles.cache.map(x => x).join(" | "))
  }
  // if (target.voice) {
  //   embed.addField("voice", "Has voice data")
  // }
  // embed.addField("User INFO", " ឵឵ ឵឵ ឵឵ ឵឵")
  
  msg.channel.send({embeds: [embed]})
}

exports.help = {
  name: 'member', 
  desc: "Shows member information", 
  type: "Info", 
  usage: `member`, 
  owner: false, 
  locked: true, 
  guild: true 
}