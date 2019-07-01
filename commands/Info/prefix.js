exports.run = async (client, msg, args) => {
  if (msg.guild) {
    if (!args[0]) {
      runCheck();
    }
    else if (args[0] == "set" && !msg.member.hasPermission("MANAGE_GUILD", {checkAdmin: true, checkOwner: true})){
      return msg.channel.send("You dont have the manage guild/server permission (either MANAGE_GUILD or ADMINISTRATOR). \nPlease ask an admin to set the prefix.")
    }
    else if ( args[0] == "set" ) updatePrefix()

    async function runCheck() {
      await client.connection.query(`SELECT * FROM Prefixes WHERE guild = ${msg.guild.id}`, function (err, row) {
        if (err) console.log(err);
        msg.channel.send("Prefix for this guild is " + row[0].prefixes)
      })
    }

    async function updatePrefix() {
      await client.connection.query(`INSERT INTO Prefixes (prefixes, guild) VALUES (?, ?) ON DUPLICATE KEY UPDATE prefixes = '${args[1]}'`, [args[1], msg.guild.id], async (err) => {
        if (err) throw err;
        client.prefix = args[1];
        runCheck()
      })
    }
  }
}

exports.help = {
  name: 'prefix',
  desc: "Shows prefix or set a new prefix",
  type: "Info",
  usage: "-prefix set !",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
