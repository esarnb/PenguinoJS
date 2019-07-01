const { YouTube } = require('better-youtube-api')
exports.run = async (client) => {
  const yt = new YouTube(client.config.ytapi);

    var pewdsMessage;
    var pewdsChannel = await client.channels.get("558341660690481177");
    if (pewdsChannel) pewdsMessage = await pewdsChannel.messages.fetch("569359733190950923")
    else console.log("Could not find the channel to pewds.")

    var listLength = 10, intervalTime = 2000, pastDiff = [], colorResolve = [];
    var before, after, embed, pewds, tseries, pewdsCount, tseriesCount;
    var diff, rawDiff, absDiff, inTheLead;
    if (pewdsMessage) {
        pewdsMessage.edit("", {embed: new client.discord.MessageEmbed().setColor(client.rColor).setDescription("Loading Pewds War Module...")}).then((pewdsMessage) => {

            setInterval(async function(){
                pewds = await yt.getChannelByUrl('https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw')
                tseries = await yt.getChannelByUrl('https://www.youtube.com/channel/UCq-Fj5jknLsUf-MWSy4_brA')
                pewdsCount = pewds.data.statistics.subscriberCount;
                tseriesCount = tseries.data.statistics.subscriberCount;
                rawDiff = parseInt(pewdsCount) - parseInt(tseriesCount);
                diff =  numberWithCommas(rawDiff);
                absDiff = numberWithCommas(Math.abs(rawDiff));

                if (pastDiff.length == listLength) pastDiff.shift();
                if (!before) before = diff;
                if (!after) after = diff;
                if (before && after) {
                    before = after;
                    after = diff;
                }
                embed = new client.discord.MessageEmbed();
      //Maybe use switch cases or something, dear lord
                if (rawDiff < 0 ) {
                    embed.addField(`T-Series is in the lead`, `Subscriber gap: ${absDiff}`);
                    inTheLead = tseries.profilePictures.high.url

                    if (after < before) {
                        //Pewds increasing
                        colorResolve = [0, 255, 0];
                        pastDiff.push("+ 󠀀󠀀↑ "+diff)

                    }
                    else if (after > before) {
                        //Pewds decreasing
                        colorResolve = [255, 0, 0];
                        pastDiff.push("- 󠀀󠀀↓ "+diff)
                    }
                    else if (after == before) {
                        //No changes
                        pastDiff.push(" 󠀀󠀀 Φ󠀀󠀀 "+diff)
                        colorResolve = [255, 255, 51];
                    }
                }
                else {
                    embed.addField(`Felix is in the lead`, `Subscriber gap: ${absDiff}`);
                    inTheLead = pewds.profilePictures.high.url;

                    if (after > before) {
                        //Pewds increasing
                        colorResolve = [0, 255, 0];
                        pastDiff.push("+ 󠀀󠀀↑ "+diff)

                    }
                    else if (after < before) {
                        //Pewds decreasing
                        colorResolve = [255, 0, 0];
                        pastDiff.push("- 󠀀󠀀↓ "+diff)
                    }
                    else if (after == before) {
                        //No changes
                        pastDiff.push(" 󠀀󠀀 Φ󠀀󠀀 "+diff)
                        colorResolve = [255, 255, 51];
                    }
                }
                embed.addField( `Pewdie's subscriber count:`, numberWithCommas(pewdsCount))
                embed.addField( `T-Series subscriber count:`, numberWithCommas(tseriesCount))
                embed.addField("Records:", `\`\`\`diff\n${pastDiff.join("\n")}\n\`\`\``)
                embed.setFooter(`Key:\n ↑ = Pewds gain subs [Green], \n Φ = No change [Yellow], \n ↓ = T-Series gains subs [Red]`, inTheLead)
                embed.setColor(colorResolve);

                pewdsMessage.edit("", {embed: embed})

            }, intervalTime)
        });
    }
    else {
        console.log("Could not find the message to edit for pewds.")
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

}
