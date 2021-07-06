require("dotenv").config();

let dayjs = require("dayjs");
let utc = require('dayjs/plugin/utc')
let timezone = require('dayjs/plugin/timezone')
let durations = require('dayjs/plugin/duration')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(durations)

exports.run = async (client, msg, args) => {
  let embed = new client.discord.MessageEmbed();
  let currentTime = dayjs()
  embed.addField(`Belize`, ` ${currentTime.tz("America/Belize").format('MM/DD/YYYY hh:mm:ssa')} CST `)
  embed.addField(`Cali`, ` ${currentTime.tz("America/Los_Angeles").format('MM/DD/YYYY hh:mm:ssa')} PST `)
  embed.addField(`Ohio`, ` ${currentTime.tz("America/New_York").format('MM/DD/YYYY hh:mm:ssa')} EST `)

  msg.channel.send({embed: embed})
}

exports.help = {
  name: 'test',
  desc: "test",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  locked: false,
  guild: false
}