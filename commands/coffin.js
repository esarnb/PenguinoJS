const axios = require("axios")
var sharp = require('sharp');
var Jimp = require('jimp');

exports.run = async (client, msg, args) => {
    let name = msg.mentions.users.size ? msg.mentions.users.first().username : args.join(" ")
    let other = args.length && !msg.mentions.users.size;
    let prompts = `${args[0] ? name : msg.author.username} ${Math.random() < 0.5 ? "was The Imposter." : "was not The Imposter"}`;
    let input = __dirname + `/Images/coffin${!other ? "2" : ""}.png`, output = __dirname + "/Images/coffinBG.png";
        
    let avatarIn = msg.mentions.users.size ? await msg.mentions.users.first().displayAvatarURL() : await msg.author.displayAvatarURL()
    let avatarOut = `${__dirname}/Images/avatar.png`;

    new Promise(resolve => {
        axios.get(avatarIn, { responseType: 'arraybuffer' })
        .then(({ data }) => {
            sharp(data).png().toFile(avatarOut).then(() => { resolve(avatarOut) }).catch(e => { if (e) throw e; });
        }).catch(e => { if (e) throw e; });
    }).then((pathfile) => {

        Jimp.read(input, (err, image) => {
            if (err) throw err;
            Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(font => { 
                image.print( font, 150, 500, { 
                    text: prompts, 
                    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, 
                    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE 
                }, 650, 80, async () => {
                    image.write(output, () => { 
                        if (args.length && !msg.mentions.users.size) return msg.channel.send({ files: [output] })   

                        Jimp.read(pathfile).then((image2) => {
                            if (err) throw err;
                            image.composite(image2.resize(120, 120), 565, 20, {
                                mode: Jimp.BLEND_DESTINATION_OVER,
                                opacitySource: 1,
                                opacityDest: 1
                            }, () => {
                                image.write(output, () => { msg.channel.send({ files: [output] }).catch("WRITE2 ERROR", console.error) })
                            })
                        })

                    })
    
                }); 
            })
        })
    })
}

exports.help = {
  name: 'coffin',
  desc: "Kick an imposter out! [Coffin Based]",
  type: "Among Us",
  usage: "coffin <Saabpar> or <@Saabpar>",
  owner: false,
  locked: false,
  guild: false
}