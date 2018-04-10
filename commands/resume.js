
module.exports.run = (client, msg, args) => {
  client.voiceConnections.forEach(vc => {
    if (vc.dispatcher) {
      if (vc.dispatcher.paused) {
        vc.dispatcher.resume();
        msg.channel.send(`\`Resumed Music\``)
      }
      else {
        msg.channel.send("Already Playing!");
      }
    }
  });
}

module.exports.info = {
  name: "resume",
  help: "resumes music",
  categ: "Music",
  owner: false,
  admin: false,
  issue: false
}
