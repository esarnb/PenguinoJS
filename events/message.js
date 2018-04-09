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
  function reactList() {
    let trained = "What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo."
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
