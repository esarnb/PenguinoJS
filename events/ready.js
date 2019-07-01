const colors = require("colors")

module.exports = async (client) => {
  // client.user.setActivity(`@PenguinoJS support | Guilds: ${client.guilds.size} | @PenguinoJS prefix`, { type: "PLAYING" })
  
  await require("../scripts/mysql.js/index.js").run(client)
  await require("../scripts/Express/express.js/index.js.js").run(client)
  await console.log(`Ready to serve in ${client.channels.size} channels on ${client.guilds.size} servers, for a total of ${client.users.size} users.`.yellow);
  
  // await require("../mongodb.js").run(client)
  // await require("../flags.js").run(client)
  // require("../felix.js").run(client)
}
