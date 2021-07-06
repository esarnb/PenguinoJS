exports.run = async (client, msg, args) => {

    let isOwner = await client.owners.find(usr => (usr == msg.author.id));
    let categories = {};
    client.commands.forEach((cmd) => {
        if (!categories[cmd.help.type]) categories[cmd.help.type] = [];
        categories[cmd.help.type].push(cmd.help);
    });
    
    let embed = new client.discord.MessageEmbed().setColor(client.rColor()), content = null;
    if (args[0] == "all" || !args.length) {
        for (categ in categories) { 
            categories[categ].sort((a, b) => a.name - b.name) 
            content = categories[categ].map(x => `•${x.name}`).join("　")
    
            let hidden = ["Owner", "Disabled"]
            if (!hidden.includes(categ)) embed.addField(categ, content)
            else if ( (hidden.includes(categ)) && isOwner && args[0] == "all") embed.addField(categ, content)
        }

        embed.setTitle(`Category of commands`)
        embed.setFooter(`${client.prefix}help <cmdName> for more info! Current prefix for server: ${client.prefix}`)

    } else {

        let findCmd = await client.commands.filter(x => x.help.name == args[0])
        if (!findCmd.size) return msg.channel.send(`${args.join(" ")}\nCommand not found, please check *${client.prefix}help* for a list of commands`)
        let {usage, desc, name, type, owner, locked, guild} = findCmd.first().help;

        embed.setTitle(`${client.prefix}${name}`)
        embed.addField(`Description`, `${desc}`)
        embed.addField("Usage", `${client.prefix}${usage}`)
        embed.setFooter(`Category: ${type}　　Locked: ${locked}　　Guild Only: ${guild}　　Owner Only: ${owner}`)

    }
    msg.channel.send({embed: embed})
}

exports.help = {
    name: "help",
    desc: "Shows all commands in categorical order",
    type: "Info",
    usage: "help",
    owner: false,
    locked: false,
    guild: false
}