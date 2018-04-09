module.exports.run = (client, msg, args) => {

  if (!args) {
    msg.channel.send("Pong!");
  }
  else {
    msg.channel.send("pinging").then((msgd) => {
      msgd.edit(`<a:aparrot:394343043102408715>: ${Math.round((msgd.createdTimestamp - msg.createdTimestamp))}Vms\n<a:disdat:423642260916404224>: ${Math.round(client.ping)}Ams `);
    });
  }
}

module.exports.info = {
  name: "ping",
  help: "Shows Latency and API latency",
  categ: "Info",
  owner: false,
  admin: false,
  issue: false
}
