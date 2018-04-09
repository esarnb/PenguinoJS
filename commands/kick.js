module.exports.run = (client, msg, args) => {
  try {

    if (!args[0]) return msg.channel.send("You must provide the user mention or id, and the amount of days to kick the user as the second argument, and the reason for the kick [word or sentence]");

    else if (!args[1]) return msg.channel.send("You must provide the reason to the kick of the user [A word or a sentence].");

    let memberMention = msg.mentions.members.first();

    if  (!msg.member.hasPermission("KICK_MEMBERS", {checkAdmin: true , checkOwner: true})) return msg.channel.send("I'm sorry, you do not have sufficient permissions to kick this user");
    else if (!msg.guild.members.get(client.user.id).hasPermission("KICK_MEMBERS", {checkAdmin: true , checkOwner: true})) return msg.channel.send("I'm sorry, I do not have sufficient permissions to kick this user");

    else if (memberMention && isNaN(args[0]) && args.length > 1) {
      if (!memberMention.kickable) {
        if (memberMention.id == msg.guild.owner.user.id) {
          msg.channel.send("I cannot kick a guild owner");
        }
        else {
          msg.channel.send("I'm sorry, I cannot kick the user. Either they are an administrator or higher than I am in permissions and role positioning.");
        }
      }
      else {
        memberMention.send(`Unfortunately, you have been kicked from ${msg.guild.name}  for \`${args.slice(0).join(" ")}\``)
        memberMention.kick( args.slice(0).join(" ") )
          .then(() => {
            msg.channel.send(`kicked ${memberMention} from the guild for \`${args.slice(0).join(" ")}\`.`)
          })
          .catch(console.error)
      }
    }
    else if (!memberMention && !isNaN(args[0]) && args.length > 1) {
      let userSnowflake = msg.guild.members.get(args[0]);
      setTimeout(function () {
        if (userSnowflake) {
          userSnowflake.send(`Unfortunately, you have been kicked from the server **${msg.guild.name}** for \`${args.slice(0).join(" ")}\`.`)
          userSnowflake.kick( args.slice(0).join(" ") )
          .then(() => {
            msg.channel.send(`kicked ${memberMention} from the guild for \`${args.slice(0).join(" ")}\`.`)
          })
          .catch(console.error)
        }
        else {
          return msg.channel.send("Could not find the user with the userid")
        }

      }, 200);
    }
    else if (!memberMention && isNaN(args[0])) return msg.channel.send("You did not provide a member mention or a valid userid. Please try again.")
    else {
      msg.channel.send("Something has gone wrong, and I am not sure what exactly I missed. Please check your command, else DM me your problem.")
    }
  }
  catch (err) {
    if (err) client.channels.get("407756445384310794").send(`\`\`\`LIDF\n${err.message}\n\`\`\``);
  }
}

module.exports.info = {
  name: "kick",
  help: "kick user by mention or userid",
  categ: "Admin",
  owner: false,
  admin: true,
  issue: false
}
