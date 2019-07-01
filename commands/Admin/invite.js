const path = require('path');
exports.run = (client, msg, args) => {
  if (!msg.guild.members.get(`${client.user.id}`).hasPermission("CREATE_INSTANT_INVITE", {checkAdmin: true, checkOwner: true})) return msg.channel.send("Sorry! I cannot do that currently. Please request one from the administrators.")
  msg.channel.createInvite({ maxAge: 3600, maxUses: 1, unique: true, reason: `${msg.author.tag}|${msg.author.id}`})
    .then(invite => msg.channel.send(`Created a 1hr-timeout & one-time-use temporary invite: https://discord.gg/${invite.code}`)).catch(console.error);
}

exports.help = {
  name: 'invite',
  desc: "Quick invite to the guild [1hr].",
  type: "Admin",
  owner: false,
  admin: true,
  locked: true,
  guild: false
}
