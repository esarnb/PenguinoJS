const dayjs = require("dayjs");
exports.run = async (client, msg, args) => {
  let guild = await client.guilds.resolve("x")
  let channel = await guild.channels.resolve("y")
  let m = await channel.messages.fetch("z")
  //Censored. Note to self: go get it from rules channel if needed.

  if (!m) return console.log(`No msg`);
  m.edit("", {embed: new client.discord.MessageEmbed()
    .addField("General <a:report:756571491340124260>",
      `
        • Be Nice.

        • No NSFW content in ANY channel.

        • Don't spam messages or mentions.
        
        • No racism, sexism, or any form of discrimination.
        
        • Follow professional streaming \netiquette in all text/voice channels.
        
        • Any form of bullying in which one party becomes \nuncomfortable will lead to a ban <:ban:758484909164855306>
        
        • Stay up till 2am at least 1 time a week
        
      `
    )
    .addField("Roles", 
      `
        People may mention a Games role to get \nattention and players for the game.
        You may enroll into a role at <#758380720023404544>.\n_\n_
      `
    )
    // .addField("Placeholder", "You know it.")
    .addField("Accept the rules and regulations.", "If you agree to the rules, you may react with\n ✅  to obtain <@&758374658285371412> member role.\n_\n_")
    .setFooter(`Updated rules on: ${dayjs().tz("America/Los_Angeles").format('MM/DD/YYYY h:m:s')} PST`)
  }).then((x) => {
    msg.channel.send("Updated Rules Embed Message")
  })
}

exports.help = {
  name: 'update',
  desc: "update",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}