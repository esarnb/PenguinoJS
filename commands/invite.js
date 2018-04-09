module.exports.run = (client, msg, args) => {
  if (!msg.guild.members.get(`${client.user.id}`).hasPermission("CREATE_INSTANT_INVITE")) return msg.channel.send("Sorry! I cannot do that currently. Please request one from the administrators.")
  msg.channel.createInvite({ maxAge: 3600, maxUses: 2, unique: true, reason: `Best server ever with ${msg.guild.owner.user.tag} as the owner!`})
  .then(invite => msg.channel.send(`Created an invite https://discord.gg/${invite.code}`))
  .catch(console.error);
}

module.exports.info = {
  name: "invite",
  help: "Generate an invite link to the current channel",
  categ: "Tools",
  owner: false,
  admin: false,
  issue: false
}
