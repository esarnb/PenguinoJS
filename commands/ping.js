require("colors")
exports.run = async (client, msg, args) => {
    // Custom animated emojis to choose from everytime cmd is called
    let emojis = [
        `https://cdn.discordapp.com/emojis/508027554557329448.gif?v=1`,
        `https://cdn.discordapp.com/emojis/468080518341197834.gif?v=1`,
        `https://cdn.discordapp.com/emojis/544526717562257428.gif?v=1`,
        `https://cdn.discordapp.com/emojis/468080498225184801.gif?v=1`,
        `https://cdn.discordapp.com/emojis/429390316261605396.gif?v=1`
    ]
    
    let owners = await Promise.all(client.owners.map(async x => await client.users.fetch(x)))
    msg.channel.send(`*Pinging...*`).then((m) => {
      let prompt = `Message Delay: ${Math.round(m.createdTimestamp - msg.createdTimestamp)}ms ❄  Websocket Ping: ${Math.round(client.ws.ping)}ms`;
      if (msg.guild && !msg.guild.members.cache.get(client.user.id).hasPermission("EMBED_LINKS", {checkAdmin: true, checkOwner: true})) {
        m.edit(prompt)
      }
      else {
        m.edit("", {
          embed: new client.discord.MessageEmbed()
          .setDescription(prompt)
          .setFooter(`Created by ${owners.map(x => x.tag).join(", ")}`, emojis[Math.floor(Math.random() * emojis.length)])
          .setColor(client.rColor())
        });
      }
    });
}


exports.help = {
    name: 'ping', // Name of the command to run
    desc: "Shows delay in ms", // Desc to show in the help command
    type: "Info", // Category the command falls under for help cmd
    usage: `ping`, // Extra information for help cmd
    owner: false, // See if only owners can run the command
    locked: false, // See if users are allowed to use this command (debug or not)
    guild: false // See if cmd can only work in guilds or dms too (guild only = true)
}