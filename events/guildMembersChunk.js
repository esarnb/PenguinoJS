module.exports = (client, members, guild) => {
  if (client.eventsChannel && true/*Empy.flags.guildMembersChunk*/) {

    client.eventsChannel.send({embed: new client.discord.MessageEmbed()
      .setTitle(`👀Several Members Joined👀`)
      .addField("Users Joined: ", members.map(x => x.user.tag + `[${x.user.id}]`).join(" | ").slice(0, 1000))
      .addField("The Guild Joined", `Name: ${members.first().guild.name}\nID: ${members.first().guild.id}`)
      .addField("Guild in question:", `Name: ${guild.name} [${guild.id}]\nRegion: ${guild.region}\nOwner: ${guild.owner.user.tag} [${guild.owner.user.id}]\nMembers: ${guild.members.size}`)
      .addField("Joined on", client.moment().utcOffset(-5).format("LLLL") + " EST")
      .setColor("YELLOW")
    })
  }
}
