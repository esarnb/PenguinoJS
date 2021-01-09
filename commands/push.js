exports.run = async (client, msg, args) => {
  if  (msg.guild && !msg.member.hasPermission("MANAGE_MESSAGES", {checkAdmin: true , checkOwner: true})) return msg.channel.send("Nah.");

  msg.delete({timeout: 100}).then(() => {
    msg.channel.send(
      `
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      _
      `
    )
  })
}

exports.help = {
  name: 'push',
  desc: "push",
  type: "Admin",
  usage: "Interesting Cmd",
  owner: false,
  locked: false,
  guild: false
}