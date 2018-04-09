module.exports.run = (client, msg, args) => {

  var CategToSort = (Object.values(client.commands).map(x => x.info.categ));
  var SortedCateg = [];
  for (testCateg of CategToSort) {
    if (!(SortedCateg.indexOf(`${testCateg}`) >= 0)) {
      SortedCateg.push(testCateg);
    }
  }

    var embed = new client.discord.MessageEmbed()

    for (thisCatey of SortedCateg) {
      var listCmds = sortCmdsToCateg(thisCatey);
      embed.addField(`${thisCatey}: ${listCmds.length} commands`, listCmds.join("\n"));
    }

    msg.channel.send({embed: embed}).then((m) => m.delete({timeout: 30000}));

    function sortCmdsToCateg(thisCateg) {
      let sendSection = [];
      for (let cmdy in client.commands) {
        if (client.commands[cmdy].info.categ == thisCateg) {
          let cmdName = client.commands[cmdy].info.name;
          let cmdHelp = client.commands[cmdy].info.help;
          sendSection.push(cmdName + " | " + cmdHelp);
        }
      }

      if (thisCateg == "Owner" && msg.author.id != client.config.ownerid) { sendSection = ["Can't see ;)"]}
      return sendSection;
    }








  //
  // if (!args[0]) {
  //   var CategToSort = (Object.values(client.commands).map(x => x.info.categ));
  //   var SortedCateg = [];
  //   for (testCateg of CategToSort) {
  //     if (!(SortedCateg.indexOf(`${testCateg}`) >= 0)) {
  //       SortedCateg.push(testCateg);
  //     }
  //   }
  //
  //   msg.channel.send(`These are the categories: ${SortedCateg.join(", ")} which one would you like to see?`)
  // }
  // else if (isNaN(args[0])) {
  //   for (thiss of SortedCateg) {
  //     if (!finish && thiss.toLowerCase() == args[0].toLowerCase()) {
  //       msg.channel.send("Oh wow it does work")
  //     }
  //   }
  // }





























        //
        //
        // msg.channel.send("*Please choose which category of commands you would like to see:*\n-->`"+SortedCateg.join("`\n-->`")+"`\n\n"+"Awaiting...").then(async (toReact) => {
        //   toReact.edit({embed: new client.discord.MessageEmbed()
        //       .setDescription(`**Results for \`${args.join(' ')}\`**:\n\n❤ **[${videoInfo[0].title}](${videoInfo[0].link})**\n\n💙 **[${videoInfo[1].title}](${videoInfo[1].link})**\n\n💚 **[${videoInfo[2].title}](${videoInfo[2].link})**
        //         \n💜 **[${videoInfo[3].title}](${videoInfo[3].link})
        //         \n\n💔 Cancel**`, true)
        //       .setFooter(msg.author.username, msg.author.avatarURL)
        //       .setColor(client.rColor)
        //     });
        //     var collector =  new client.discord.ReactionCollector(toReact, m => m.users.last().id == msg.author.id, {time: 60000, dispose: true});
        //     var nowDelete = false;
        //     await collector.on('collect', (mm) => {
        //
        //       if (mm.emoji.name == '❤') {
        //         queueVid0(SortedCateg[0]);
        //         toDo();
        //       } else if (mm.emoji.name == '💙') {
        //         queueVid0(SortedCateg[1]);
        //         toDo();
        //       } else if (mm.emoji.name == '💚') {
        //         queueVid0(SortedCateg[2]);
        //         toDo();
        //       } else if (mm.emoji.name == '💜') {
        //         queueVid0(SortedCateg[3]);
        //         toDo();
        //       }
        //       else if (mm.emoji.name == '💔') {
        //         queueVid0(SortedCateg[4]);
        //         toDo();
        //       }
        //
        //       function toDo() {
        //         collector.stop();
        //         if (nowDelete) {
        //           toReact.delete({timeout: 100});
        //         }
        //         else {
        //           setTimeout(function () {
        //               toReact.delete({timeout: 100});
        //           }, 5000);
        //         }
        //       }
        //     });
        //
        //     await toReact.react('❤');
        //     await toReact.react('💙');
        //     await toReact.react('💚');
        //     await toReact.react('💜');
        //     await toReact.react('💔');
        //
        //     await function() {nowDelete = true;}
        //
        //
        //              function queueVid(link) {
        //
        //                toReact.edit(`Thanks, you picked ${link}`)
        //
        //
        //              }
        //            });

  /*
  else if (args[0].toLowerCase() == "all"){
    var cmdList = [];
    var embed = new client.discord.MessageEmbed()
      .setColor(client.rColor)

      for (let cmdy in client.commands) {
        embed.addField(client.commands[cmdy].info.name, client.commands[cmdy].info.help)
      }

      msg.channel.send({embed: embed})
  }
  */

}

module.exports.info = {
  name: "help",
  help: "Shows help.",
  categ: "Info",
  owner: false,
  admin: false,
  issue: false
}
