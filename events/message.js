module.exports = async (client, msg) => {
  if (msg.author.bot || (msg.content.startsWith("`") && msg.content.charAt(msg.content.length - 1) == "`")) return;

	//Load MySQL
  if (msg.guild && client.mysqlStatus) {
    client.connection.query(`SELECT * FROM Prefixes WHERE guild = ${msg.guild.id}`, function (err, row) {
      if (err) console.log(err);
      if (row) {
        if (!row.length) {
          client.connection.query(`INSERT INTO Prefixes (prefixes, guild) VALUES (?, ?)`, [client.prefix, msg.guild.id])
        }
        client.prefix = row.length > 0 ? row[0].prefixes : client.prefix;
      }
    })
  }

	//Check prefix
		let prefixes = [client.prefix, `<@${client.user.id}> `, `<@!${client.user.id}> `];
		for (thisPrefix of prefixes) {
			if (msg.content.startsWith(thisPrefix)) {
				client.prefix = thisPrefix;
				if(msg.content.indexOf(client.prefix) !== 0) return;
        //Load Args, cmd
				const args = msg.content.slice(client.prefix.length).trim().split(/ +/g);
				const command = args.shift().toLowerCase();
				let cmd = client.commands.get(command);

				//Run cmd file after checking locks of file
				if(cmd) {
					let usrFound = client.Owners.find(usr => (usr == msg.author.id));
					if (cmd.help.owner  == true  && (!usrFound)) return msg.channel.send("You're not owner!");
					if (cmd.help.locked == true  && (!usrFound)) return msg.channel.send("Command is locked, my apologies");
					if (!msg.guild && (cmd.help.guild == true)) return msg.channel.send("Command is guild only!");
//Why am i using MANAGE_MESSAGES?
          else if (cmd.help.admin == true && !msg.member.hasPermission("MANAGE_MESSAGES", {checkAdmin: true , checkOwner: true})) return msg.channel.send("You're not admin (MANAGE_MESSAGES permisison) in the guild!");
					cmd.run(client, msg, args);
				}
			}
		}
}
