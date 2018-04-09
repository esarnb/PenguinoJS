const request = require('request');
const moment = require("moment")
module.exports.run = (client, msg, args) => {
  Vari = "";
  iterationy = 0;
 try {

    var toEdit = msg.channel.send({embed: new client.discord.MessageEmbed().setDescription("Lets Begin...say `stop` to stop the test!")})
    .then((toEdit) => {
      runLoop(toEdit);
    });

    function runLoop(toEdit) {
      msg.channel.awaitMessages(response =>
       msg.author.id == response.author.id , {
        max: 1,
        time: 30000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == "stop") {
          toEdit.edit("", {embed: {description: `Thank you for whatever this is!`}});
        }
        else {
          collected.first().delete({timeout: 200});
          iterationy++;
          toEdit.edit("", {embed: {description: `${iterationy}: ${collected.first().content}`}});
          runLoop(toEdit)
        }
      })
    }

  }
  catch (err) {
    msg.reply("" + err.message)
  }

}

module.exports.info = {
  name: "info2",
  help: "info2.",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
