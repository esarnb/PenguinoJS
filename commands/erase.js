module.exports.run = async (client, msg, args) => {
  msg.delete({timeout: 100})
  try {
    var toEdit = msg.channel.send({embed: new client.discord.MessageEmbed()
      .setDescription("OwO Who")
    })
    .then((toEdit) => {
      msg.channel.awaitMessages(response =>
      msg.author.id === response.author.id &&
       (!isNaN(response.content) ||
       response.mentions.size > 0 ) , {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
      .then(async (collected) => {

        collected.delete({timeout: 1000})
        if (!isNaN(collected.first().content)) {
        var listMsgs = await msg.channel.messages.filter(thisMsg => collected.first().content == thisMsg.author.id);
        await console.log(listMsgs.size);
            if (listMsgs.size == 0) {
              msg.reply("Found 0 msgs")
            }
            else if (listMsgs.size > 99) {
              msg.channel.bulkDelete(listMsgs.slice(0, 99)).then(() => {
                msg.reply("done")
              })
            }
            else if (listMsgs.size < 99 && listMsgs.size > 0) {
              msg.channel.bulkDelete(listMsgs.map( x => x.id)).then((msgz) => {
                msg.reply(`Deleted ${msgz.size} msgs`)
              })
            }
            else {
              msg.reply("help me im lost")
            }
        }
        else if (collected.first().mentions.size > 0) {
          msg.channel.messages.filter(thisMsg => collected.first().mentions.first().id == thisMsg.author.id).then((listMsgs) => {
            if (listMsgs.size == 0) {
              msg.reply("Found 0 msgs")
            }
            else if (listMsgs.size > 99) {
              msg.channel.bulkDelete(listMsgs.slice(0, 99))
              msg.reply("done")
            }
            else if (listMsgs < 99 && listMsgs > 0) {
              msg.channel.bulkDelete(listMsgs)
              msg.reply("Done")
            }
            else {
              msg.reply("help me im lost")
            }
          })
        }
      })
    })
  }
  catch (err) {
    msg.reply(err.message)
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
