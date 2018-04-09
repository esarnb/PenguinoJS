module.exports.run = (client, msg, args) => {
  //new client.discord.MessageEmbed()
  try {
    if (client.redis) {
      if (!args[0]) {
        getPrefix();
      }
      else if (args[0] == "prefix") {
        getPrefix();
      }
      else if (args[1] && !msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send("Sorry, you are not an administrator to change prefixes!")
      }
      else if (args[0] == "set") {
        setPrefix();
        setTimeout(function () {
          getPrefix();
        }, 100);
      }
      else if (args[0] == "clear") {
        delServerData();
      }
    }
    else {
      msg.channel.send("Prefixes offline. Use `\``")
    }
  }
  catch (err) {
    msg.channel.send(err.message, {code: "fix"});
  }
  //-------------------------------------------------------------------------------------------------------------
  function delServerData() {
    client.redis.del(`${msg.guild.id}-PerServerPrefix`, function(err, reply) {
      if (err) client.channels.get("407756445384310794").send(`\`\`\`LIDF\n${err.message}\n\`\`\``);
    })
  }
  function getPrefix() {
    client.redis.get(`${msg.guild.id}-PerServerPrefix`, function(err, reply) {
      if (err) client.channels.get("407756445384310794").send(`\`\`\`LIDF\n${err.message}\n\`\`\``);
      msg.channel.send("Current server prefix is \n```js\n" + reply +"\n```");
    });
  }

  function setPrefix() {
    client.redis.set(`${msg.guild.id}-PerServerPrefix`, `${args[1]}`, function(err, reply) {
      if (err) client.channels.get("407756445384310794").send(`\`\`\`LIDF\n${err.message}\n\`\`\``);
    });
  }
}

module.exports.info = {
  name: "prefix",
  help: "Set server specific prefixes",
  categ: "Admin",
  owner: false,
  admin: false,
  issue: false
}
