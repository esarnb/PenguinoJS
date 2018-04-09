module.exports.run = (client, msg, args) => {
  msg.channel.send('Napping for 3s!');
    setTimeout(function () {
      process.exit();
    }, 1000);
}

module.exports.info = {
  name: "restart",
  help: "Quick Naps",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
