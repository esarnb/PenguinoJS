exports.run = async (client, msg, args) => {
    if  (msg.guild && !msg.member.permissionsIn(msg.channel).has("MANAGE_MESSAGES", true)) return msg.channel.send("You do not have perms to edit messages.");
    else if (msg.guild && !msg.guild.members.cache.get(client.user.id).permissionsIn(msg.channel).has("CREATE_INSTANT_INVITE", true)) return msg.channel.send("I do not have perms to generate invites.")

    const link = await client.generateInvite({
      permissions: [],
      scopes: ['guilds'],
    });
    msg.channel.send(`Generated invite link: ${link}`);

  }
  
  exports.help = {
    name: 'invite',
    desc: "Generate a server invite (permission required)",
    type: "Admin",
    usage: "invite",
    owner: false,
    locked: false,
    guild: true
  }