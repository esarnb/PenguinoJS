exports.run = async (client, msg, args) => {
    let categories = {};
    for (cmd in client.commands) { 
        if (!categories[cmd.help.type]) categories[cmd.help.type] = [];
        categories[cmd.help.type].push(cmd.help);
    }
    
    let embed = new client.discord.MessageEmbed(), content = null;
    for (categ in categories) { 
        categories[categ].sort((a, b) => a.name - b.name) 
        content = categories[categ].map(x => `${x.name}: ${x.desc}`).join("\n")
        embed.addField(categ, content)
        console.log(content);
        
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