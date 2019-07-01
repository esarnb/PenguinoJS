exports.run = async (client, msg, args) => {
  msg.channel.send(`Napping for 3 seconds...`).then((m) => {
    setTimeout(function () {
      process.exit()
    }, 1000);
  });


}

exports.help = {
  name: 'restart',
  desc: "Restart",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  admin: false,
  locked: false,
  guild: false
}
