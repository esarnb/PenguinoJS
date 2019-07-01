exports.run = async (client, msg, args) => {
  // if (args[0] == "all") return msg.channel.send(client.commands.map(cmd => `${cmd.help.name} | ${cmd.help.desc} | ${cmd.help.usage}`).join("\n"))
  //Collect all command data
  var categories = uniq(client.commands.map(cmd => cmd.help.type))
  var embeds = [];
  //Remove copies
  function uniq(a) {
    return Array.from(new Set(a));
  }
//Restriction on OWNER Commands
    if (msg.author.id != client.config.ownerid) {
      var index = categories.indexOf("Owner");
      if (index > -1) {
        categories.splice(index, 1);
      }
    }

//Restriction on ADMIN commands
    if (!msg.member.hasPermission("ADMINISTRATOR", {checkAdmin: true, checkOwner: true})) {
      var index = categories.indexOf("Admin");
      if (index > -1) {
        categories.splice(index, 1);
      }
    }

  //List out commands in embeds
  for (categ of categories) {
    let embed = new client.discord.MessageEmbed();
    embed.setColor(client.rColor())
    .setTitle(`Category: ${categ}`)
    .setFooter(categories.join("  |  "), msg.author.avatarURL())
    var str = client.commands.filter(cmd => cmd.help.type == categ)
      .map(cmd => `\\${client.prefix}${cmd.help.name} | ${cmd.help.desc}`).join("\n\n")
    if (str.length > 1000) {
      for (let i = 0; i < str.length; i = i + 1000) {
        embed.addField(" ឵឵", str.slice(i, i+1000))
      }
    }
    else {
      embed.addField(categ, str)
    }
    embeds.push(embed)
  }
  client.tools.embedListing(client, msg, args, embeds) //Post
}

exports.help = {
  name: 'help',
  desc: "Shows all commands",
  type: "Info",
  usage: "-help",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
