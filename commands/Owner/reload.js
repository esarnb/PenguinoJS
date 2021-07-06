exports.run = async (client, msg, args) => {
  if(!args || args.size < 1) return msg.reply("Must provide a command name to reload.");
  
  const cmd = args[0];
  if(client.commands.has(cmd)) {
    let c = client.commands.get(cmd).help.type;
    let path = `../${c}/${cmd}.js`;
    if (require.resolve(path)) {
      delete require.cache[require.resolve(path)];
      client.commands.delete(cmd);

      const props = require(path);
      client.commands.set(cmd, props);
      msg.reply(`the command ${cmd} has been reloaded`);
    }
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