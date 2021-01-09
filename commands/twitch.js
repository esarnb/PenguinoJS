exports.run = async (client, msg, args) => {
    let embed = new client.discord.MessageEmbed();
    if (!args[0]) return msg.channel.send("Format: `>twitch saabpar`");
    
    // User Setup //
    let user = await client.twitch.apiClient.helix.users.getUserByName(args[0]);
    if (!user) return msg.channel.send("User does not exist.");
    let { profilePictureUrl, displayName, description } = user;

    // Stream Setup //
    let prevStream = await client.twitch.apiClient.helix.streams.getStreamByUserName(displayName);
    if (!prevStream) embed.setTitle(displayName + " is offline.").addField("Profile link", `[https://www.twitch.tv/${displayName}](https://www.twitch.tv/${displayName})`)
    else {
        let { userDisplayName, title, viewers, startDate, type, thumbnailUrl } = prevStream;
        let game = await prevStream.getGame();
        
        if (thumbnailUrl) embed.setImage(`${thumbnailUrl.slice(0, thumbnailUrl.length - 21)}.jpg`)

        if (game) {
            let {name, boxArtUrl} = game;
            if (!thumbnailUrl) embed.setImage(`${boxArtUrl.slice(0, boxArtUrl.length - 21)}.jpg`)
            embed.addField("Game", name)
        } 

        embed.setTitle(`${userDisplayName} is live!`)
            .setDescription(`${title}\n[ View the stream here! ](https://www.twitch.tv/${userDisplayName})`)
            .setFooter(`Livestream Viewer Count: ${viewers} | Started: ${new Date(startDate).toLocaleString()} UTC | StreamType: ${type}`)

    }

    embed.setThumbnail(profilePictureUrl).addField("User Profile", `${displayName}: ${description}`)

    msg.channel.send({ embed: embed })
    
}

exports.help = {
    name: 'twitch',
    desc: "See if a user is streaming/see profile",
    type: "Twitch",
    usage: "twitch saabpar",
    owner: false,
    locked: false,
    guild: false
}
