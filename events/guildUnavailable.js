module.exports = (client, guild) => {
  if (client.eventsChannel && true/*Empy.flags.guildUnavailable*/) {

    client.eventsChannel.send({embed: new client.discord.MessageEmbed()
      .addField(`Guild Unavailable [Outtage Occured, could come back anytime. Cannot determine when.]`, guild.name)
      .addField("Guild ID", guild.id)
      .addField("Lost Connection on", client.moment().utcOffset(-5).format("LLLL") + " EST")
      .setColor(client.rColor())
    })
  }
}
