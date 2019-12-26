exports.run = async (client, msg, args) => {
    msg.channel.send("Pong!")
}

exports.help = {
    name: 'ping', // Name of the command to run
    desc: "Shows delay in ms", // Desc to show in the help command
    type: "Info", // Category the command falls under for help cmd
    usage: `ping`, // Extra information for help cmd
    owner: false, // See if only owners can run the command
    locked: false, // See if users are allowed to use this command (debug or not)
    guild: false // See if cmd can only work in guilds or dms too (guild only = true)
}