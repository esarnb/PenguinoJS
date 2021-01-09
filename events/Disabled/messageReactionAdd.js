module.exports = async (client, reaction, user) => {
    if (reaction.message.guild.id != ##########) return; //2am club server
    if (!reaction) return;
    reaction.message.guild.fetch().then(async guild => {
        if (client.mongo) {
            let emojiStr = reaction.emoji.toString(), serverid = guild.id;
            
            let Emojis = client.mongo.models.Emojis
            let current = await Emojis.findOne({ emoji: emojiStr, guildid: serverid});
            
            if (!current) {

                let newGuild = new client.mongo.models.Emojis({ emoji: emojiStr, count: 1, guildid: serverid })
                newGuild.save((err, res) => { if (err) return console.error(err) })
            
            } else {
            
                current.count = current.count + 1;
                current.save((err, res) => { if (err) return console.error(err) })
            
            }
        } else console.log("MONGO OFFLINE - messageReactionAdd");
    })
    
}