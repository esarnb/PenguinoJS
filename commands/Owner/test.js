require("dotenv").config();
exports.run = async (client, msg, args) => {
  console.log(client.application);
}

exports.help = {
  name: 'test',
  desc: "test",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}