exports.run = async (client, msg, args) => {
    let usrFound = client.owners.find(usr => (usr == msg.author.id));
    let categories = {};

    client.commands.forEach((cmd) => {
        if (!categories[cmd.help.type]) categories[cmd.help.type] = [];
        categories[cmd.help.type].push(cmd.help);
    });
    
    let embed = new client.discord.MessageEmbed().setColor(client.rColor()), content = null;
    for (categ in categories) { 
        categories[categ].sort((a, b) => a.name - b.name) 
        content = categories[categ].map(x => `${x.name}: ${x.desc}`).join("\n")
        
        if (categ != "Owner") embed.addField(categ, content)
        else if (categ == "Owner" && usrFound) embed.addField(categ, content)
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