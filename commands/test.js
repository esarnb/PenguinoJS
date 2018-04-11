module.exports.run = (client, msg, args) => {
  msg.reply("Tested :D");
}

module.exports.info = {
  name: "test",
  help: "Just a test command",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
