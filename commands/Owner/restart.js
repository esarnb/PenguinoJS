exports.run = async (client, msg, args) => {
    
    // Restart will only work if the bot is initialized in a restarter program
    //    such as NPM's Forever or Nodemon or PM2

  msg.channel.send(`Napping for 3 seconds...`).then(async () => {
    if (client.voice.connections) await client.voice.connections.map((c) => c.channel.leave())
    await process.exit("Restarting")
  });
  
}
  
  exports.help = {
    name: 'restart',
    desc: "Restart",
    type: "Owner",
    usage: "Interesting Cmd",
    owner: true,
    locked: false,
    guild: false
  }