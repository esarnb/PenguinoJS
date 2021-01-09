exports.run = async (client, msg, args) => {
    // return msg.channel.send("locked")
    let display = `
    
    
. 　　　。　　　　•　 　ﾟ　　。 　　.

　　　.　　　 •　　　　.　　　。　　 。　. 　

.　　 。　　   .　   •　 ඞ　 。 　 • 　　　•

　ﾟ  　。${args[0] ? args.join(" ") : msg.author.username} ${Math.random() < 0.5 ? "is the Imposter! " : "is not the Imposter! <:why:757390743043309678>"} 。　.

　　ﾟ　　 　.　　 　.    ,　  　.　   .
.　　　 •　　.　  .  。     。　    . 　
    
    `
    msg.delete({timeout: 100}).then(() => {
        msg.channel.send({embed: new client.discord.MessageEmbed().setDescription(display)})
    })
}

function randomizer(array) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

exports.help = {
  name: 'imposter',
  desc: "Kick an imposter out! [Text Based]",
  type: "Among Us",
  usage: "imposter <saabpar> or <@saabpar>",
  owner: false,
  locked: false,
  guild: false
}