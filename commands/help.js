exports.run = async (client, msg, args) => {
    let categories = {};
    for (cmd in client.commands) { 
        if (!categories[cmd.help.type]) categories[cmd.help.type] = [];
        categories[cmd.help.type].push(cmd.help);
    }
    
    let embed = new client.discord.MessageEmbed();
    for (categ in categories) { 
        categories[categ].sort((a, b) => a.name - b.name) 
        embed.addField(categ, categories[categ].map(x => `${x.name}: ${x.desc}`).join("\n"))
    }

    msg.channel.send({embed: embed})
}

exports.help = {
    name: "help",
    desc: "Shows all commands in categorical order",
    type: "Info",
    usage: "help <category>",
    owner: false,
    locked: false,
    guild: false
}