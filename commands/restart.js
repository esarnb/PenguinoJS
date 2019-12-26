exports.run = async (client, msg, args) => {
    
    // Restart will only work if the bot is initialized in a restarter program
    //    such as NPM's Forever or Nodemon

  msg.channel.send(`Napping for 3 seconds...`).then((m) => { process.exit() });
  
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