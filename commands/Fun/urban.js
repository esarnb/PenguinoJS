const urban = require("urban.js");
exports.run = async (client, msg, args) => {
	try {
		urban(args.join(" ")).then(function(definition) {
			if (definition) {
				function SendMsg(replaceWord) {
					msg.channel.send({embed: new client.discord.MessageEmbed()
						.addField(`Definition:`,`${definition.definition.slice(0, 1000)}`)
						.addField('Example:', definition.example.replace(replaceWord, `[${definition.word}](${definition.URL})`))
						.setColor(client.rColor())
					})
				}

				if (definition.example.indexOf(definition.word) >= 0) SendMsg(definition.word)
				else SendMsg(definition.word.toLowerCase())
			}
			else msg.channel.send("There is no definition.")
		})
	}
	catch(err) {
		console.log(err)
	}
}

exports.help = {
  name: 'urban',
  desc: "Define a word in English",
  type: "Fun",
  usage: "-urban word",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
