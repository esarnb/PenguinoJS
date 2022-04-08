exports.run = async (client, msg, args) => {
    msg.channel.send("unfinished")
}

exports.help = {
name: 'daily',
desc: "Add snowflakes for the day",
type: "Snowflakes",
usage: "daily",
owner: false,
locked: false,
guild: false
}