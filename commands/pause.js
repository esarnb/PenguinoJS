
module.exports.run = (client, msg, args) => {
  client.voiceConnections.forEach(vc => {
    if (vc.dispatcher) {
      if (!vc.dispatcher.paused) {
          vc.dispatcher.pause();
          msg.channel.send(`\`Paused Music\``)
      }
      else {
        msg.channel.send("Already Paused!");
      }
    }
  });
}

module.exports.info = {
  name: "pause",
  help: "Pauses music",
  categ: "Music",
  owner: false,
  admin: false,
  issue: false
}
