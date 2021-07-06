var dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
exports.run = async (client, msg, args) => {
    let embed = new client.discord.MessageEmbed();

    // Filter all twitch users based on guild request
    let streams = client.twitch.streamers.filter(x => x.server.includes(msg.guild.id))
    let streamers = streams.filter(x => x.stream != null)
    
    // Check for ongoing streams in memory, add to embed
    if (streamers.length) streamers.forEach((res,i) => {
        let { userDisplayName, title, viewers, startDate } = res.stream;
        let streamStart = dayjs(startDate)
        let duration = dayjs().from(streamStart, true) 
        embed.addField(`${i+1}. ${userDisplayName} is live!`,`${title}\n• [ View the stream here! ](https://www.twitch.tv/${userDisplayName})\n• Viewer Count: ${viewers}\n• Streaming for ${duration}`) //since ${streamStart}
    }); 

    // If there are no ongoing streams, add this embed instead.
    else embed.setDescription("No one is streaming...")

    embed.setFooter(`Cached Streamers: ${streams.map(x => x.name).join(" | ")}`);
    msg.channel.send({ embed: embed })
    
}

exports.help = {
    name: 'streaming',
    desc: "Check if any cached twitch users are streaming",
    type: "Twitch",
    usage: "streaming",
    owner: false,
    locked: false,
    guild: false
}
