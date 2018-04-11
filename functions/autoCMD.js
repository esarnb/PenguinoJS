const fs = require("fs");

module.exports = (client, command) => {

  // }

  let commandList = fs.readdirSync('../PenguinoJS/commands/');

  if (command) {
    if (commandList.indexOf(`${command}.js`) >= 0) {
      delete require.cache[require.resolve(`.././commands/${command}`)];
      client.commands[command] = require(`.././commands/${command}`);
    }
  } else {
    for (let i = 0; i < commandList.length; i++) {
      let prop = commandList[i];
      if (prop.match(/\.js$/)) {
        delete require.cache[require.resolve(`.././commands/${prop}`)];
        client.commands[prop.slice(0, -3)] = require(`.././commands/${prop}`);
        console.log(client.colors.yellow(`Loaded in ${prop}`));
      }
    }
  }
}
