module.exports = (client, guild) => {
  if (client.eventsChannel && true/*Empy.flags.guildCreate*/) {

    client.eventsChannel.send({embed: new client.discord.MessageEmbed()
      .setColor(client.rColor())
      .setTitle("✅Joined Guild✅")
      .addField("Guild", guild.name)
      .addField("Owner", guild.owner.user.tag)
      .addField("ID", guild.id)
      .addField("Channels", guild.channels.size)
      .addField("Members", guild.memberCount)
      .addField("Region", guild.region)
      .addField("Official Verified Server", guild.verified)
      .addField("Guild created on", client.moment(guild.createdTimestamp).utcOffset(-5).format("LLLL") + " EST")
      .addField("Joined guild on", client.moment(guild.joinedTimestamp).utcOffset(-5).format("LLLL") + " EST")
      .setImage(guild.iconURL())
    })
  }
}
