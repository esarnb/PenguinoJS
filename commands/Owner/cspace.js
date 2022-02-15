exports.run = async (client, msg, args) => {
  msg.delete().then(() => {
    console.log(`• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • `)
  })
}

exports.help = {
  name: 'cspace',
  desc: "cspace",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}