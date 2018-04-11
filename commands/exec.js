const Discord = require('discord.js');
const { exec } = require("child_process");
exports.run = async (client, msg, args) => {
  try {
    if (msg.author.id == client.owner.id) {

      //implement 2fa because why not
      res = require("child_process").execSync(args.join(" "))
      var embed = new client.discord.MessageEmbed()
      .addField(`:penguin: Input :penguin: `, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
      .addField(`:skull: Output :skull: `, `\`\`\`LIDF\n${res.toString().replace(client.token, "token")}\n\`\`\``);

      msg.channel.send(embed);
    }
    else {
      msg.channel.send("**OOF**");
    }
  } catch (err) {
   res = err
   if (err) {
     var embed = new client.discord.MessageEmbed()
     .addField(`:penguin: Input :penguin: `, `\`\`\`js\n${args.join(" ")}\n\`\`\``)
     .addField(`:skull: Output :skull: `, `\`\`\`LIDF\n${res.toString().replace(client.token, "token")}\n\`\`\``);
     msg.channel.send(embed);
   }
}
}

module.exports.info = {
  name: "Executable",
  help: "Quick execute.",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
