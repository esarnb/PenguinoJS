module.exports = (client, guild) => {
  if (client.eventsChannel && true/*Empy.flags.guildMemberAdd*/) {
    //if it is my server
    if (member.guild.id == "552478526713102336") {
      client.eventsChannel.send({embed: new client.discord.MessageEmbed()
        .setColor(client.rColor())
        .setTitle("❄New Member❄")
        .addField("Member", member.user.tag)
        .addField("ID", member.user.id)
      })

      if (client.AutoAdmin.find(x => x == member.user.id )) {
        member.roles.add("552487763530874900").then(member.send("Since you are my friend, I have granted you Administrator access c:"))
      }
    }
    //if it is not my server
    else {
      //make some sort of optional flag per server and save to DB
    }
  }
}
