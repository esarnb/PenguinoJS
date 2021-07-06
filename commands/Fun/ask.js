exports.run = async (client, msg, args) => {

  if (!args[0]) return msg.channel.send("You forgot to ask a question!")

  let responses = [
    "As I see it, yes",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don’t count on it",
    "It is certain",
    "It is decidedly so",
    "Most likely",
    "No.",
    "My sources say no",
    "Outlook good",
    "Outlook not so good",
    "Reply hazy try again",
    "Signs point to yes",
    "Very doubtful",
    "Without a doubt",
    "Yes",
    "Yes, definitely",
    "You may rely on it",
  ];

  let chosenPrompt = responses[Math.floor(Math.random() * responses.length)]

  if (msg.deletable) msg.delete({timeout: 300});

  // msg.channel.send({
  //   embed: new client.discord.MessageEmbed()
  //   .addField("Question", args.join(" "))
  //   .addField("Reply", chosenPrompt)
  //   .setFooter(msg.author.username, msg.author.avatarURL())
  // })

  // msg.reply(chosenPrompt)

  msg.channel.send({
    embed: new client.discord.MessageEmbed()
    .addField(args.join(" "), `🎊 __${chosenPrompt}__ 🎊`)
    .setFooter(msg.author.username, msg.author.avatarURL())
    .setColor(client.rColor())
  })
}
  
  exports.help = {
    name: 'ask',
    desc: "Ask any question, I will tell you the future! 8-ball oriented yes/no replies.",
    type: "Fun",
    usage: "ask Will I win the lottery?",
    owner: false,
    locked: false,
    guild: false
  }