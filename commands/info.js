const os = require('os');
const moment = require('moment');
module.exports.run = async (client, msg, args) => {
  msg.delete({timeout: 100})
    var thisCPUS = [];
    var objArr = os.cpus();
    thisCPUS.push(`Model: ${objArr[0].model} `)
    for(let i = 0; i < objArr.length; i++) {
      thisCPUS.push(`| Speed: ${objArr[i].speed}MHz`)
    }
  try {
    var embed = new client.discord.MessageEmbed()
    var toEdit = msg.channel.send({embed: new client.discord.MessageEmbed()
      .addField('What info would you like to see out of this list:',
        `\`os\`: I'll give you a tour of my house.` +"\n"+
        `\`bot\`: I'll tell you more about myself.` +"\n"+
        `\`server\`: Sends facts about the current server we are in.` +"\n"+
        `\`user\`: I'll tell you more about yourself.` +"\n"+
        `\`invite\`: I'll send you my business card.` +"\n"+
        '[30s]'
      )
    })
  .then((toEdit) => {
    msg.channel.awaitMessages(response =>
     response.content.toLowerCase() === 'os' ||
     response.content.toLowerCase() === 'bot' ||
     response.content.toLowerCase() === 'server' ||
     response.content.toLowerCase() === 'user' ||
     response.content.toLowerCase() === 'invite' , {
      max: 1,
      time: 30000,
      errors: ['time'],
    })
    .then((collected) => {
      collected.delete({timeout: 1000})
        if (collected.first().content.toLowerCase() == "os") {
          embed.addField(`OS`, ""+
            `Platform: ${os.platform()}\n` +
            `Type: ${os.type()}\n` +
            `Release: ${os.release()}\n\n` +
            `${thisCPUS.join("\n")}\n\n`+
          "")
        }
        else if (collected.first().content.toLowerCase() == "bot") {
          embed.addField(`Me, Myself, and I`, ""+
            `*Bot Owner*: ${client.users.get(client.config.ownerid).tag}\n`+
            `*Version*: ${client.discord.version}\n`+
            `*Me*: ${client.user.tag}\n`+
            `*Guild Size*: ${client.guilds.size}\n`+
            `*Member Size*: ${client.users.filter(xx => !xx.bot).size}\n`+
          "")
        }
        else if (collected.first().content.toLowerCase() == "server") {
          embed.addField(`${msg.guild.name}`, ""+
            `*Created*: ${moment(msg.guild.createdAt).format('MM/DD/YYYY  | hh:mm A')}\n`+
            `*Owner*: ${msg.guild.owner.user.tag} [${msg.guild.owner.displayName}]\n`+
            `*Members*: ${msg.guild.members.filter(xx => !xx.user.bot).size}\n`+
            `*Bots*: ${msg.guild.members.filter(xx => xx.user.bot).size}\n`+
            `*Your Join Date*: ${moment(msg.member.joinedAt).format('MM/DD/YYYY  | hh:mm A')}`+
          "")
        }
        else if (collected.first().content.toLowerCase() == "user") {
            embed.addField(`${msg.author.tag}`, ""+
            `*You were born on*: ${moment(msg.author.createdAt).format('MM/DD/YYYY  | hh:mm A')}\n`+
            `*You were adopted on*: ${moment(msg.member.joinedAt).format('MM/DD/YYYY  | hh:mm A')}`+
            "")
        }
        else if (collected.first().content.toLowerCase() == "invite") {
          client.generateInvite().then(link => {
            embed.addField(`Want me to work for you?`, `[Here is my business card.](${link})`);
          });
        }
        else {
          toEdit.edit("HALP SOME TING WENT WONG")
        }
        setTimeout(function () {
          toEdit.edit(embed).then(msgd => msgd.delete({timeout: 30000}));
        }, 1000);
      })
      .catch(() => {
        toEdit.edit('There was no collected message that passed the filter within the time limit!');
      });
  })
}
  catch (err) {
    console.log(err);
  }
}

module.exports.info = {
  name: "info",
  help: "Information of the bot",
  categ: "Info",
  owner: false,
  admin: false,
  issue: false
}
