exports.run = async (client, msg, args) => {
  
  if (client.mongo) {
    let Prefixes = client.mongo.models.get("Prefixes")
    let thePrefix = async () => await Prefixes.findOne({ guildid: msg.guild.id });
    let current = await thePrefix();
    if (!current) {
        let newGuild = new Prefixes({ prefix: ">", guildid: msg.guild.id })
        newGuild.save((err, res) => { if (err) return console.error(err) })
    } 

    if (args[0]) {
      if (!msg.member.permissionsIn(msg.channel).has("MANAGE_CHANNELS", true)) return msg.channel.send("You're not a manager! Required: \n(MANAGE_CHANNELS, ADMINISTRATOR, or OWNER)")
      Prefixes.findOneAndUpdate({guildid: msg.guild.id}, {prefix: args[0]}).then((res) => {
        msg.channel.send(`Old: ${res.prefix}\nNew: ${args[0]}`)
      })
    } else { msg.channel.send(`Prefix: ${current.prefix}`) }
  } else msg.channel.send(`Unable to access records. Use prefix: ${client.config.prefix}`)
}

exports.help = {
  name: 'prefix',
  desc: "Shows server prefix, Admins can change",
  type: "Info",
  usage: "prefix <new prefix>",
  owner: false,
  locked: false,
  guild: true
}