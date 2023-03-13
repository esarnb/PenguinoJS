require("dotenv").config();

exports.run = async (client, msg, args) => {
	let x = await client.api.applications(client.user.id).rpc.get();
	let decimal = x.flags
	msg.channel.send();
	msg.channel.send();
	msg.channel.send(`Application Flags:
  >>> Flags in Decimal: 
  \`${x.flags}\`
  Flags in Binary: 
  \`${numberWithCommas(Number(decimal).toString(2))}\`
  (starting from zero, right to left)
  \`\`\`dsconfig
  1 << 12	GATEWAY_PRESENCE (>100 servers - presence updates)
  1 << 13	GATEWAY_PRESENCE_LIMITED	 (<100 servers - presence updates)
  1 << 14	GATEWAY_GUILD_MEMBERS	(>100 servers - member updates)
  1 << 15	GATEWAY_GUILD_MEMBERS_LIMITED	(<100 servers - member updates)
  1 << 16	VERIFICATION_PENDING_GUILD_LIMIT	(Unusual growth of app, stops verification)
  1 << 17	EMBEDDED	(If app embedded into discord client - employee only)
  1 << 18	GATEWAY_MESSAGE_CONTENT	(>100 servers - message content)
  1 << 19	GATEWAY_MESSAGE_CONTENT_LIMITED	(<100 servers - message content)
  1 << 23	APPLICATION_COMMAND_BADGE (Badge on bot/cmd used within 30days)
  \`\`\`
`)
 

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 
}

exports.help = {
  name: 'flags',
  desc: "Show bot flags: current permissions on an application scale",
  type: "Info",
  usage: "flags",
  owner: false,
  locked: false,
  guild: false
}