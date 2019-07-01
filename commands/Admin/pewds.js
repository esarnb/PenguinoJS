exports.run = async (client, msg, args) => {
  if (msg.guild && msg.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES", {checkAdmin: true, checkOwner: true})) msg.delete({timeout: 500});
  const { YouTube } = require('better-youtube-api')
  const yt = new YouTube(client.config.ytapi);
  var rawDiff, absDiff;
  msg.channel.send({embed: new client.discord.MessageEmbed().setColor(client.rColor()).setDescription("Loading Pewds War Module...")}).then(async (pewdsMessage) => {

        pewds = await yt.getChannelByUrl('https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw')
        tseries = await yt.getChannelByUrl('https://www.youtube.com/channel/UCq-Fj5jknLsUf-MWSy4_brA')
        pewdsCount = pewds.data.statistics.subscriberCount;
        tseriesCount = tseries.data.statistics.subscriberCount;
        rawDiff = parseInt(pewdsCount) - parseInt(tseriesCount);
        absDiff = numberWithCommas(rawDiff);
        if (rawDiff <= 0) {
          //Pewdiepie is losing
          inTheLead = [`T-Series is in the lead by ${numberWithCommas(Math.abs(rawDiff))} subscribers.`, tseries.profilePictures.high.url]
        }
        else {
            //Pewdiepie is winning
            inTheLead = [`Felix is in the lead by ${numberWithCommas(Math.abs(rawDiff))} subscribers.`, pewds.profilePictures.high.url];
        }

        pewdsMessage.edit("", {embed: new client.discord.MessageEmbed()
            .setDescription(
                `Pewdie's subscriber count: ${numberWithCommas(pewdsCount)}\n`+
                `T-Series subscriber count: ${numberWithCommas(tseriesCount)}\n`+
                `\n${inTheLead[0]}`
            )
            .setColor(client.rColor())
          })

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  })
}
exports.help = {
  name: 'pewds',
  desc: "Show subscriber difference between Pewdiepie & Tseries",
  type: "Admin",
  usage: "Interesting Cmd",
  owner: false,
  admin: true,
  locked: false,
  guild: false
}
