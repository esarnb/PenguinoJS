require("colors")
exports.run = async (client, msg, args) => {
    
    msg.channel.send(`*Pinging...*`).then((m) => {
      let prompt = `Message Delay: ${Math.round(m.createdTimestamp - msg.createdTimestamp)}ms ❄  Websocket Ping: ${Math.round(client.ws.ping)}ms`;
      if (msg.guild && !msg.guild.members.resolve(client.user.id).permissionsIn(m.channel).has("EMBED_LINKS")) {
        m.send(prompt)
      }
      else {
        m.edit({
          content: "᲼",
          embeds: [
            new client.discord.MessageEmbed()
            .setDescription(prompt)
            // .setFooter(`Created by ${client.users.fetch(`${client.config.owner}`).tag}`, emojis[Math.floor(Math.random() * emojis.length)])
            .setColor("RANDOM")
          ]
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