exports.run = async (client, msg, args) => {
  if(!args || args.size < 1) return msg.reply("Must provide a command name to reload.");
  
  const cmd = args[0];
  if(client.commands.has(cmd)) {
    delete require.cache[getFile];
    client.commands.delete(cmd);
  }
  
  let getFile = require.resolve(`./${cmd}.js`)
  if (getFile) {
    const props = require(`./${cmd}.js`);
    client.commands.set(cmd, props);
    msg.reply(`the command ${cmd} has been reloaded`);
  }
}

exports.help = {
  name: 'reload',
  desc: "Reload",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}