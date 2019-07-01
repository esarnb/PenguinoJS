var wd = require("word-definition");
exports.run = async (client, msg, args) => {
	try {
		if (args.length <= 1) return msg.channel.send(`Example: ${client.prefix}define cornucopia en\nen = English, fr = French, de = German`);
		else {
			wd.getDef(args[0], args[1], null, function(definition) {
				if (!definition || !definition.definition) { return msg.channel.send("Sorry, could not find that word!")}
				msg.channel.send({embed: new client.discord.MessageEmbed()
					.setTitle(definition.word)
					.setDescription(definition.definition.slice(0, 2000))
					.setFooter(`Category: ${definition.category}`, msg.author.avatarURL())
				})
			})
		}
	}
	catch(err) {
		if (err && err.message) {
			msg.channel.send(err.message.slice(0, 2000))	
		}
		
	}
		
}

exports.help = {
  name: 'define',
  desc: "Define a word in English, French, or German",
  type: "Fun",
  usage: "-define keyboard en",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
