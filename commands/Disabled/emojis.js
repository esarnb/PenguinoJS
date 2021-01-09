exports.run = async (client, msg, args) => {
  const embed = new client.discord.MessageEmbed(), n = 5;
  if (!args[0]) {
    let emojis = await msg.guild.emojis.cache, items = emojis.map(x => x);
    let result = await new Array(Math.ceil(items.length / n)).fill().map(_ => items.splice(0, n).join(" "))
    
    result = await new Array(Math.ceil(result.length / 5)).fill().map(_ => result.splice(0, 5))
    results = result.map((x,i) => {return {name: `25 Set #${i+1}`, value: x, inline: false}})
    
    embed.addFields(results)
    embed.setFooter(`Total: ${emojis.size} -> Standard: ${emojis.filter(x => !x.animated).size}, Animated: ${emojis.filter(x => x.animated).size}`)
    
  } else {
    let Emojis = client.mongo.models.Emojis
    let current = await Emojis.find({ guildid: msg.guild.id });
    if (!current) return msg.channel.send("No emoji stats found.")
    
    let items = current.sort((a,b) => b.count - a.count ).map((x,i) => `[${i+1}.](https://esarnb.com) ${x.emoji} ${x.count}`)//.join("")
    let result = await new Array(Math.ceil(items.length / n)).fill().map(_ => items.splice(0, n).join("\n"))
    for (let i = 0; i < result.length; i++) embed.addField(`Group ${i+1}`, result[i], true);
    
    embed.setTitle("Top used emojis in " + msg.guild.name)
  }

  msg.channel.send({embed: embed})

}
  
  exports.help = {
    name: 'emojis',
    desc: "Show all emojis, or stats",
    type: "Server Info",
    usage: "emojis <stats>",
    owner: false,
    locked: false,
    guild: true
  }