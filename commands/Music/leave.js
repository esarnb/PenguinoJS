exports.run = async (client, msg, args) => {
  let me = msg.guild.members.get(client.user.id).voice.channel;
  if (me) me.leave();
}

exports.help = {
  name: 'leave',
  desc: "Leave the voice channel.",
  type: "Music",
  usage: "-leave",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
