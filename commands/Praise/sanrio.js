const axios = require("axios")
var sharp = require('sharp');
var Jimp = require('jimp');

exports.run = async (client, msg, args) => {
  console.log();
  let other = args.length && msg.mentions.users.size;
  let name = other ? msg.mentions.users.first().username : (args[0] ? args.join(" ") : "themselves!")
  // let prompts = `${msg.author.username} gives sanrio flowers to ${args[0] ? name : msg.author.username}!`;
  let input = __dirname + `/Images/give.png`, output = __dirname + "/Images/output.png";
  let avatarIn = await msg.author.displayAvatarURL();
  let avatarIn2 = msg.mentions.users.size ? await msg.mentions.users.first().displayAvatarURL() : avatarIn;
  let avatarOut = `${__dirname}/Images/avatar.png`;
  let avatarOut2 = `${__dirname}/Images/avatar2.png`;
  let sanrio = `${__dirname}/Images/sanrio.png`;
  // let sanrio1 = await axios.get(sanrio, { responseType: 'arraybuffer' })
  // let sanrio1D = sanrio1.data;
  let getAvatar1 = await axios.get(avatarIn, { responseType: 'arraybuffer' })
  let getAvatar1D = getAvatar1.data;
  let getAvatar2 = await axios.get(avatarIn2, { responseType: 'arraybuffer' })
  let getAvatar2D = getAvatar2.data;
  
  await sharp(getAvatar1D).png().toFile(avatarOut);
  await sharp(getAvatar2D).png().toFile(avatarOut2);
  // await sharp(sanrio1D).png().toFile(sanrio);


  Jimp.read(input, (err, image) => {
    if (err) throw err;
    console.log("Pulled input");

    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
      image.print(font, -230, -20, { text: msg.author.username, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 650, 80, (err, image, { x1, y1 }) => {
        image.print(font, -150, 06, { text: "gives sanrio flowers to ", alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 650, 80, (err, image, { x2, y2 }) => {
          image.print(font, -225, 36, { text: `${name}!`, alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE }, 650, 80, async (err, image, { x3, y3 }) => {

            let getAvatar1O = await Jimp.read(avatarOut);
            let getAvatar2O = await Jimp.read(avatarOut2);
            let sanrio1O = await Jimp.read(sanrio);
            let AvatarShrink1 = await getAvatar1O.resize(100, 100);
            let AvatarShrink2 = await getAvatar2O.resize(110, 110);
            let sanrioShrink = await sanrio1O.resize(110, 110);
/*
Jimp.BLEND_SOURCE_OVER;
Jimp.BLEND_MULTIPLY;
Jimp.BLEND_ADD;
Jimp.BLEND_SCREEN;
Jimp.BLEND_DARKEN;
Jimp.BLEND_LIGHTEN;
Jimp.BLEND_HARDLIGHT;
Jimp.BLEND_DIFFERENCE;
Jimp.BLEND_EXCLUSION;
*/
            image.composite(sanrioShrink, 240, 210, {
              mode: Jimp.BLEND_SOURCE_OVER,
              opacitySource: 1,
              opacityDest: 1
            }, () => {
              image.composite(AvatarShrink1, 80, 100, {
                mode: Jimp.BLEND_SOURCE_OVER,
                opacitySource: 1,
                opacityDest: 1
              }, () => {
                if (err) throw err;
                image.composite(AvatarShrink2, 385, 25, {
                  mode: Jimp.BLEND_SOURCE_OVER,
                  opacitySource: 1,
                  opacityDest: 1
                }, () => {
                  image.write(output, () => {
                    console.log("Merged images");
                    image.write(output, () => { msg.channel.send({ files: [output] }).catch("WRITE2 ERROR", console.error) })
                    console.log("Wrote output");
                  });
                });

              });
            });

          });
        });
      });
    });
  });

}

exports.help = {
  name: 'sanrio',
  desc: "Give sanrio flower",
  type: "Praise",
  usage: "sanrio @yuyu",
  owner: false,
  locked: false,
  guild: false
}