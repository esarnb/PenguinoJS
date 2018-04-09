module.exports.run = (client, msg, args) => {
  msg.delete({timeout: 200});
  msg.channel.send(args.join(" "));
}

module.exports.info = {
  name: "say",
  help: "Say anything you like.",
  categ: "Fun",
  owner: false,
  admin: true,
  issue: false
}
