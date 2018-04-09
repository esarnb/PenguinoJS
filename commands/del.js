module.exports.run = (client, msg, args) => {
  //msgd.delete({timeout: 15000}));

      if  (!msg.member.hasPermission("MANAGE_MESSAGES", {checkAdmin: true , checkOwner: true})) {
        msg.channel.send("You do not have perms to edit messages.");
      }
      else if (!msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES", {checkAdmin: true , checkOwner: true})) {
        msg.channel.send("I do not have perms to edit messages.")
      }
      else {
        del(msg, args);
      }
}

function del(message, args) {
    var msg;
    if (!args[0]) {
        message.channel.send("How many?", {code: "fix"});
    }
    else if(isNaN(args[0])) {
        message.channel.send("Please provide a number between 0 and 100 instead.", {code: "fix"});
    }
    else if (args[0] > 99 || args[0] < 1) {
        message.channel.send("Cannot delete 100 messages or more, as well as anything lower than 1.", {code: "fix"});
    }
    else {
        if (args[0] < 100 && args[0] >= 1) {
            msg = (parseInt(args[0]) + 1);
            message.channel.messages.fetch({ limit: msg }).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
        }
        else {
            message.channel.send("Invalid nummber of messages to delete", {code: "fix"});
        }
    }
}


module.exports.info = {
  name: "del",
  help: "Delete a certain amount of messages",
  categ:"Admin",
  owner: false,
  admin: true,
  issue: false
}
