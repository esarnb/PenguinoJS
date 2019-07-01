exports.run = async (client, msg, args) => {
	if (args[0] && args[1]) {
		  client.user.setActivity(args.slice(1, args.length).join(" "), { type: args[0] }) 
  			.then(presence => msg.channel.send(`Activity set to ${presence.activity.type}: ${presence.activity.name} `))
  			.catch(console.error);
	}
	else {
		msg.channel.send("presence ActivityType ActivityName")
	}
}
exports.help = {
  name: 'presence',
  desc: "temporary presence update",
  type: "Owner",
  usage: "presence ActivityType ActivityName",
  owner: true,
  admin: false,
  locked: false,
  guild: false
}

