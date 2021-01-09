require("dotenv").config();

let dayjs = require("dayjs");
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
let durations = require('dayjs/plugin/duration')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(durations)

exports.run = async (client, msg, args) => {
  let embed = new client.discord.MessageEmbed().setFooter(`${msg.author.tag}`, msg.author.avatarURL());
  let Calendar = client.mongo.models.Calendar
  let current = await Calendar.find({ guildid: msg.guild.id });

  if (!args[0]) {
    if (current.length) {
      embed.setDescription("There are events!")
    } else {
      embed.setDescription("No events recorded! Would you like to add one?")
      
    }
    msg.channel.send({embed: embed}).then(async (m) => {
      await m.react("✅");
      await m.react("❌");
      
      let filter = (reaction, user) => (reaction.emoji.name == "✅" || reaction.emoji.name == "❌") && user.id === msg.author.id;
      let collector = m.createReactionCollector(filter, { max: 1, time: 1e4 });
      collector.on('end', collected => {
        m.reactions.removeAll()

        if (collected.size) {
          let {emoji, users} = collected.first()
          embed.setDescription(`Chosen ${emoji.name}`)// Users: ${users.cache.map(x => x.username)}

          if (emoji.name == "❌") embed.setDescription("Okay! Thanks for coming!")
          else {
            
            embed.setDescription("Please type a date using format: `Month/Day/Year Hour:Minute:Seconds AM/PM`\nExample: `10/2/2020 10:13:00 PM`\nCurrent Time: `" + `${dayjs().format("MM/DD/YYYY hh:mm:ss a")}\``)
            
            
             // Errors: ['time'] treats ending because of the time limit as an error
             const filter = m => m.author.id == msg.author.id;
             collector = m.channel.awaitMessages(filter, { max: 1, time: 3e4, errors: ['time'] }).then(collected => {

                // embed.setDescription(collected.first().content)
                let userInput = collected.first().content;
                let date2 = dayjs(userInput)
                let date2unix = date2.unix(), diffs = date2.diff( dayjs() );
                let dur = getDuration(diffs);
                let yrs = dayjs.duration(diffs).years();
                if ( isNaN(date2unix) || yrs < 0 ) {
                  embed.setDescription("Invalid Date [Either wrong format or it is in the past! Redo cmd.")
                  return m.edit({embed: embed})
                }
                embed.setDescription("**Regstered: **\n" + date2.format("MM/DD/YYYY hh:mm:ssa"))
                embed.addField("Occuring in: ", `${dur}` )//date2 - current
                
                embed.addField(" ឵឵ ឵឵ ឵឵ ឵឵", "Please input the description you would like to have!")
                m.edit({embed: embed})

                // Errors: ['time'] treats ending because of the time limit as an error
                const filter = m => m.author.id == msg.author.id;
                collector = m.channel.awaitMessages(filter, { max: 1, time: 3e4, errors: ['time'] }).then(collected => {

                    // embed.setDescription(collected.first().content)
                    embed.fields.length = 0;
                    let userInput = collected.first().content;
                    if (!userInput) {
                      embed.setDescription("Need a description! Redo cmd.")
                      return m.edit({embed: embed})
                    }


                    let u2db = {
                      event: userInput,         // Description
                      date: date2unix,          // Date to start from
                      channel: msg.channel,     // Channel to send msg into 
                      user: msg.author.id,      // Who requested / msg to send to
                      repeat: 1                 // How long (daily length, weekly, etc)
                    }



                    embed.addField("Description", u2db.event)
                    embed.addField("date", u2db.date)
                    embed.addField("channel", u2db.channel)
                    embed.addField("user", u2db.user)
                    embed.addField("repeat", u2db.repeat)
                    embed.setDescription("Ok now upload to DB")

                    return m.edit({embed: embed})
                  }).catch(err => console.log(err));



               }).catch(err => console.log(err));
               
               function getDuration(x) {
                let ans = [];
                x = dayjs.duration(x)
                if (x.years()) ans.push(`${x.years()} yrs`) 
                if (x.months()) ans.push(`${x.months()} mo`) 
                if (x.days()) ans.push(`${x.days()} days`) 
                if (x.hours()) ans.push(`${x.hours()} hrs`) 
                if (x.minutes()) ans.push(`${x.minutes()} mins`) 
                if (x.seconds()) ans.push(`${x.seconds()} secs`) 

                return ans.join(" ")
               }

          }
        } else embed.setDescription("No reaction collected!")
        return m.edit({embed: embed})
        
      });
      
    })
  }
}

exports.help = {
  name: 'test2',
  desc: "test2",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}