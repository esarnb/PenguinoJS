const axios = require("axios");
exports.run = async (client, msg, args) => {
    // axios.get(`https://api.tenor.com/v1/random?q=thanksgiving%20turkey&key=${process.env.TenorKey}&limit=1`, {responseType: 'json'}).then(async (res) => {
    //     // return console.log(res.data.results.shift().media.shift().gif.url);
    //     let embed = await new client.discord.MessageEmbed().setImage(res.data.results.shift().media.shift().gif.url);//.attachFiles([{name: "randomPic.png", attachment: res.data}]).setImage('attachment://randomPic.png')
    //     msg.channel.send({embed: embed})
    // })
}


exports.help = {
    name: 'gobble', 
    desc: "Earn random turkies!", 
    type: "Fun", 
    usage: `gobble`, 
    owner: false, 
    locked: false, 
    guild: false 
}