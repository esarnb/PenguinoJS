exports.run = async (client, msg, args) => {
    let embed = new client.discord.MessageEmbed(), g = msg.guild;
    msg.guild.fetch().then(g => {
        
        embed.addField("Name", g.name, false)
        embed.addField("Description", g.description, false)
        embed.addField("Region", g.region, false)
        embed.addField("Locale", g.preferredLocale, false)
        embed.addField("Verification", g.verificationLevel.toLowerCase(), false)
        embed.addField("Roles", `Roles total: ${g.roles.cache.size}`, false)
        embed.addField("Server ID", g.id, false)
        embed.addField("Owner", `Name: ${g.owner.displayName}\nTag: ${g.owner.user.tag}\nID: ${g.owner.user.id}`, false)
        embed.addField("User Count", `Members: ${g.approximateMemberCount}, Users: ${g.members.cache.filter(x => !x.user.bot).size}, Bots: ${g.members.cache.filter(x => x.user.bot).size}`, false)
        embed.addField("Emojis", `Total: ${g.emojis.cache.size} -> Standard: ${g.emojis.cache.filter(x => !x.animated).size}, Animated: ${g.emojis.cache.filter(x => x.animated).size}`, false)
        embed.addField("Channels", `Text: ${g.channels.cache.filter(x => x.type == "text").size}, Voice: ${g.channels.cache.filter(x => x.type == "voice").size}, Category: ${g.channels.cache.filter(x => x.type == "category").size}, News: ${g.channels.cache.filter(x => x.type == "news").size}, Store: ${g.channels.cache.filter(x => x.type == "store").size}, Unknown: ${g.channels.cache.filter(x => x.type == "unknown").size}`, false)
        embed.addField("Server Creation", g.createdAt + "\nUnix Timestamp: " + g.createdTimestamp, false)
        embed.addField(client.user.tag + " Joined Server", g.joinedAt + "\nUnix Timestamp: " + g.joinedTimestamp, false)
        embed.setThumbnail(g.iconURL())
        msg.channel.send({embed: embed})
    });
}

exports.help = {
  name: 'server', 
  desc: "Shows server information", 
  type: "Server Info", 
  usage: `server`, 
  owner: false, 
  locked: false, 
  guild: false 
}