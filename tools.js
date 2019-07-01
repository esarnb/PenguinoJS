module.exports = {
  embedListing(client, msg, args, embedList) {
    var positiony = 0;
    msg.channel.send(`Loading...`).then((toReact) => {
      toReact.react("⬅")
      toReact.react("🔴")
      toReact.react("➡")
      toReact.edit(`\n`,{embed: embedList[0]})
      var collector =  new client.discord.ReactionCollector(toReact, m => m.users.last().id == msg.author.id, {time: 3600000, dispose: true});
      collector.on('collect', (mm) => {
        runLRRfunc(mm);
      });
      collector.on('remove', (mm) => {
        runLRRfunc(mm);
      });

      function runLRRfunc(mm) {
        if (mm.emoji.name == '⬅') {
          runEdit("lefty");
        } else if (mm.emoji.name == '➡') {
          runEdit("righty");
        } else if (mm.emoji.name == '🔴') {
          runEdit("resety");
        }
      }

      function runEdit(vary) {
        if (vary == "lefty" && positiony > 0) {
          positiony--;
          toReact.edit(`${positiony+1} of ${embedList.length}`,{embed: embedList[positiony]});
        }
        if (vary == "righty" && (positiony < embedList.length - 1)) {
          positiony++;
          toReact.edit(`${positiony+1} of ${embedList.length}`,{embed: embedList[positiony]});
        }
        if (vary == "resety") {
          positiony = 0;
          toReact.edit(`${positiony+1} of ${embedList.length}`,{embed: embedList[positiony]});
        }
      }
      setTimeout(function () {
          toReact.delete();
      }, 3600000);
    })//end of toReact
  },
  embedString(client, msg, args, longStr) {
      embedList = [];
      msg.channel.send('HelloWorld').then(async (toReact) => {
        var positiony = 0;
        seperatore(longStr);
          function seperatore(stringy) {
            if (stringy.length > 2000) {
              embedList.push(new client.discord.MessageEmbed()
              .setColor(Math.floor(Math.random()*16777215).toString(16))
              .setFooter("Page: " + (embedList.length + 1), msg.author.avatarURL())
              .setDescription(stringy.slice(0, 1999)))

              seperatore(stringy.slice(2000, stringy.length))
            }

            else {
              embedList.push(new client.discord.MessageEmbed()
              .setColor(Math.floor(Math.random()*16777215).toString(16))
              .setFooter("Page: "+(embedList.length + 1), msg.author.avatarURL())
              .setDescription(stringy));
            }
        }

        toReact.edit({embed: embedList[positiony]});
        // <:lefty:441660967521222667> <:resety:441660967806304267> <:righty:441660968750284800>
        toReact.react("⬅")
        toReact.react("🔴")
        toReact.react("➡")
        // var collector =  new client.discord.ReactionCollector(toReact, m => m.users.last().id == msg.author.id, {time: 3600000, dispose: true});
        var collector =  new client.discord.ReactionCollector(toReact, m => !m.users.last().bot, {time: 3600000, dispose: true});
        var nowDelete = false;
        collector.on('collect', (mm) => {
          runLRRfunc(mm);
        });
        collector.on('remove', (mm) => {
          runLRRfunc(mm);
        });

        function runLRRfunc(mm) {
          if (mm.emoji.name == '⬅') {
            runEdit('lefty');
          } else if (mm.emoji.name == '➡') {
            runEdit('righty');
          } else if (mm.emoji.name == '🔴') {
            runEdit('resety');
          }
        }

        function runEdit(vary) {
          if (vary == 'lefty' && positiony > 0) {
            positiony--;
            toReact.edit({embed: embedList[positiony]});
          }
          if (vary == 'righty' && (positiony < embedList.length)) {
            positiony++;
            toReact.edit({embed: embedList[positiony]});
          }
          if (vary == 'resety') {
            positiony = 0;
            toReact.edit({embed: embedList[positiony]});
          }
        }
      });
  }//
}
