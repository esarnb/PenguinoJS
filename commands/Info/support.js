exports.run = async (client, msg, args) => {
  client.guilds.get("552478526713102336").fetchInvites()
  .then(invites => msg.channel.send("Invites: "+invites.map(x => x)))
  .catch(console.error);
}

exports.help = {
  name: 'support',
  desc: "Support Server Invite",
  type: "Info",
  usage: "-support",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
