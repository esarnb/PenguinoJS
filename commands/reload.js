const fs = require("fs");

module.exports.run = (client, msg, args) => {
  if (!args || args == '' || args === undefined) return;
  if (args in client.commands) { // --ping `ping` is args, //if the arg is found in cmd
    let commandList = fs.readdirSync('./commands/');
    if (commandList.indexOf(`${args.join(' ')}.js`) >= 0) {
      delete require.cache[require.resolve(`../commands/${args.join(' ')}.js`)]; //deletes cache
      client.commands[args.join(' ')] = require(`../commands/${args.join(' ')}.js`); //loads in function
    }
    client.load(client, args.join(' ')); //loads in cmd
    msg.channel.send(`Reloaded \`${args.join(" ")}\``, {code: 'dsconfig'});
  } else return msg.channel.send(`Could not find the command!`, {code: 'fix'});
}

module.exports.info = {
  name: "reload",
  help: "Quick refresh.",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
