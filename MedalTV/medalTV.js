require("dotenv").config();
const dayjs = require("dayjs");
const axios = require("axios");
const Discord = require("discord.js")
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc)
dayjs.extend(timezone)

// let sts = new Discord.WebhookClient(process.env.stsHookID, process.env.stsHookToken) /* Saabpar Test Server */ 

// emperorsr 6240449
// saabpar   3659873
let user = 3659873;

let url = `https://developers.medal.tv/v1/latest?userId=${user}&limit=1`;
let options = { headers: {"Authorization" : process.env.MedalTVPublic} };
console.log(process.env.MedalTVPrivate);
module.exports = async (client) => {
    let channel = await client.channels.fetch(#####);

    axios.get(url, options).then(async(res) => {
        console.log((res.data));
        let content = res.data.contentObjects;
        if (content.length) {
            let data = content.shift();
            let desync = getDB(user, data.contentId)
            if (desync) updateDB(data, generateEmbed);
            //else do not send embed nor update db.
        } else console.log("User has no clips set to public!")
    })

    const getDB = (user, video) => {
    /*
        Medals.findOne({user: user}, function((res) {
    
            return ( res && (res.id != user.id) )
        }))
        */
    
        return true;
    }
    const updateDB = (input, sendMessage) => {
        //Medals.update somehow
    
        sendMessage(input)
    }
    
    const generateEmbed = (input) => {
            
        let { contentId, contentTitle, contentThumbnail, videoLengthSeconds, createdTimestamp, directClipUrl, credits} = input;
        let embed = new Discord.MessageEmbed();
    
        embed.setDescription(`[Duration: ${videoLengthSeconds}s] [[Video](${directClipUrl})] [[Profile](https://medal.tv/users/${user})] [${contentId}]
            Created: ${dayjs(createdTimestamp).tz("America/Los_Angeles").format('MM/DD/YYYY hh:mm:ssa') } PST`)
    
        embed.setTitle(contentTitle)
        embed.setThumbnail(contentThumbnail)
        embed.setURL(directClipUrl)
        embed.setFooter(`${credits}`)
    
        channel.send(`${directClipUrl}`, {embeds: [embed]})
    } 
}


