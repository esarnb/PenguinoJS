module.exports = (client, msg) => {

  try {
    runReaction();
    if (msg.author.bot || msg.channel.type == "dm" || (msg.content.charAt(0) == "`" && msg.content.charAt(msg.content.length - 1) == '`')) return;

    client.rColor = Math.floor(Math.random()*16777215).toString(16);

    if (client.redis) {
      client.redis.exists(`${msg.guild.id}-PerServerPrefix`, function (err, existing) {
        if (err) throw err;
        if (existing === 1) {
          client.redis.get(`${msg.guild.id}-PerServerPrefix`, function (err, replyPrefix) {
            if (err) throw err;
            client.prefix = replyPrefix;
          });
        }
        else {
          client.redis.set(`${msg.guild.id}-PerServerPrefix`, `\``, function (err, replyConfirm) {
            if (err) throw err;
            console.log(`${msg.guild.name} PrefixSetup: "\`"`);
            client.prefix = "`";
          });
        }
      });
    }
    else {
      client.prefix = client.config.prefix;
    }


    let prefixes  = [client.prefix, `<@${client.user.id}> `, `<@!${client.user.id}> `];
    for (thisPrefix of prefixes) {
      if (msg.content.startsWith(thisPrefix)) client.prefix = thisPrefix;
    }


    if (!msg.content.startsWith(client.prefix)) return;
    if (!msg.channel.permissionsFor(msg.guild.members.get(`${client.user.id}`)).has("SEND_MESSAGES")) return msg.author.send(`Sorry! I do not have permissions to speak in the guild: \`${msg.guild.name}\` in channel: \`#${msg.channel.name}\``)


    const args = msg.content.split(' ').slice(1);
    const command = msg.content.toLowerCase().slice(client.prefix.length).trim().split(' ').shift();

      if (command in client.commands && client.commands[command].info.owner == true && msg.author.id != client.config.ownerid) return msg.channel.send("Sorry, you are not considered an owner. ").then(msgd => msgd.delete({timeout: 15000}));
      if (command in client.commands && client.commands[command].info.admin == true && !msg.member.hasPermission(`ADMINISTRATOR`) && msg.author.id !== client.config.ownerid) return msg.channel.send("Sorry, you do not have administrator in this guild.").then(msgd => msgd.delete({timeout: 15000}));
      if (command in client.commands && client.commands[command].info.issue == true) return msg.channel.send("Sorry, the cmd is broken rn.").then(msgd => msgd.delete({timeout: 15000}));

      if (command in client.commands) {
        client.commands[command].run(client, msg, args);
        client.URE = `[${msg.author.tag}]\n--->[${msg.guild.name}]\n------>[${command}]|[${args.join(" ")}]`
      }
  }
  catch (err) {
    console.log(err);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //End of program. Begins Functions
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
  function reactList() 
    let trained = "ok"
  }
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
  function runReaction() {
    if (msg.content.toLowerCase() == "sirparrot") runReactionSend("<a:aparrot:394343043102408715>");
    else if (msg.content.toLowerCase() == "blobpenguin") runReactionSend("<:blobcatpenguin:400072211337183244>")
  }

  function runReactionSend(emojid) {
    msg.channel.send(emojid);
    msg.delete({timeout: 100});
  }
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
  //=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=
}
