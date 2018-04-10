module.exports.run = (client, msg, args) => {
  try {

    //Correct indentations & fix syntaxes

    msg.delete({timeout: 100})
    var embed = new client.discord.MessageEmbed()
    var toEdit = msg.channel.send({embed: new client.discord.MessageEmbed()
      .setDescription("Please input a mention or a userid [30s]")
    })
    .then((toEdit) => {
      msg.channel.awaitMessages(response =>
        response.mentions.users.size != 0 || !isNaN(response.content)
        , {
          max: 1,
          time: 30000,
          errors: ['time'],
        })
        .then((collected) => {
          collectedUser = collected;
          collected.first().delete({timeout: 100})
          if (collected.first().mentions.users.size > 0) {
            msg.guild.members.fetch(collected.first().mentions.users.first()).then((memberFound) => {
              if (memberFound.bannable == false) {
                toEdit.edit(``, {embed: {description: `Sorry,  ${memberFound.user.tag} is not bannable!`}})
              }
              else if (memberFound.bannable) {
                toEdit.edit(`Found person! Please type the amount of days you would like to ban the person for.`, {embed: {description: `Ban ${memberFound.user.tag} for \`x\` fday.`}});
                msg.channel.awaitMessages(response =>
                  !isNaN(response.content) , {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                  })
                  .then((collected) => {
                    collectedDays = collected;
                    collected.first().delete({timeout: 100})
                    toEdit.edit(``, {embed: {description: `Thank you! You chose ${collected.first().content} days. \n Lastly, please provide a reason to ban the user. [Max 1024 characters]`}})
                    msg.channel.awaitMessages(response =>
                      response.content.length < 1024 , {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                      })
                      .then((collected) => {
                        collected.first().delete({timeout: 100})
                        toEdit.edit(``, {embed: {description: `Thank you! The player will be banned shortly.`}})
                        memberFound.user.channel.send(`You have been banned from ${msg.guild.name} for ${collectedDays} days for the following reason:`, {embed: client.discord.MessageEmbed().setDescription(collected.first().content)});
                        memberFound.ban(collectedDays, collected.first().content).then(() => {
                          toEdit.edit(``, {embed: {description: `${memberFound.user.tag} is now banned for ${collectedDays} days!`}})
                        })
                      })
                      .catch(() => {
                        toEdit.edit('There was no collected message that passed the filter within the time limit!');
                      });
                    })
                    .catch(() => {
                      toEdit.edit('There was no collected message that passed the filter within the time limit!');
                    });
                  }
                  else {
                    toEdit.edit("HALP SOMETHING IS WRONG")
                  }
                }).catch(err => {
                  if (err.message == "Unknown User") return toEdit.edit(``, {embed: {description: "Sorry, I could not find this user."}})
                });
              }
              else if (!isNaN(collected.first().content)) {
                var memberFound = msg.guild.members.fetch(collected.first().content).then((memberFound) => {
                  if (memberFound.bannable == false) {
                    toEdit.edit(``, {embed: {description: `Sorry,  ${memberFound.user.tag} is not bannable!`}})
                  }
                  else if (memberFound.bannable) {
                    toEdit.edit(`Found person! Please type the amount of days you would like to ban the person for.`, {embed: {description: `Ban ${memberFound.user.tag} for \`x\` days.`}});
                    msg.channel.awaitMessages(response =>
                      !isNaN(response.content) , {
                        max: 1,
                        time: 30000,
                        errors: ['time'],
                      })
                      .then((collected) => {
                        collected.first().delete({timeout: 100})
                        toEdit.edit(``, {embed: {description: `Thank you! You chose ${collected.first().content} days. \n Lastly, please provide a reason to ban the user.`}})
                        msg.channel.awaitMessages(response =>
                          ((response.content.length < 1024) && (response.content.length > 0)) , {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                          })
                          .then((collected) => {
                            collected.first().delete({timeout: 100})
                            toEdit.edit(``, {embed: {description: `Thank you! The player will be banned shortly.`}})
                            memberFound.user.channel.send(`You have been banned from ${msg.guild.name} for ${collectedDays} days for the following reason:`, {embed: client.discord.MessageEmbed().setDescription(collected.first().content)});
                            memberFound.ban(collectedDays, collected.first().content).then(() => {
                              toEdit.edit(``, {embed: {description: `${memberFound.user.tag} is now banned for ${collectedDays} days!`}})
                            })
                          })
                          .catch(() => {
                            toEdit.edit('There was no collected message that passed the filter within the time limit!');
                          });
                        })
                        .catch(() => {
                          toEdit.edit('There was no collected message that passed the filter within the time limit!');
                        });
                      }
                      else {
                        toEdit.edit("HALP SOMETHING IS WRONG")
                      }
                    }).catch(err => {
                      if (err.message == "Unknown User") return toEdit.edit(``, {embed: {description: "Sorry, I could not find this user."}})
                    });
                  }
                })
              })
            }
            catch (err) {
              console.log(err);
            }
          }

module.exports.info = {
name: "ban",
help: "Ban user by mention or userid",
categ: "Admin",
owner: false,
admin: true,
issue: true
}
