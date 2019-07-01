const fs = require("fs");
exports.run = async (client, msg, args) => {
  if(!args || args.size < 1) return msg.reply("Must provide a command name to reload.");
  const commandName = args[0];
  if(client.commands.has(commandName)) {
    let folderName = client.commands.get(commandName).help.type
    // return console.log(client.commands.get(commandName))
    if (require.resolve(`../${folderName}/${commandName}.js`)) {
      delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];
      client.commands.delete(commandName);
      const props = require(`../${folderName}/${commandName}.js`);
      client.commands.set(commandName, props);
      msg.reply(`The command ${commandName} has been reloaded`);
    }
  }
}

exports.help = {
  name: 'reload',
  desc: "Reload",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  admin: false,
  locked: false,
  guild: false
}
