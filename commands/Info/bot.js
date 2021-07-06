const os = require("os")
exports.run = async (client, msg, args) => {
  
  let embed = new client.discord.MessageEmbed()
  let cpus = os.cpus().map((x,i) => `Core #${i+1}\n**Model**: ${x.model}\n**Speed**: ${x.speed}MHz\n`).join("\n")
  
  
  // embed.setThumbnail("https://cdn.discordapp.com/attachments/569910716555853825/677368018912935936/1200px-Archlinux-icon-crystal-64.png")
  embed.setColor("#58D1ED")
  embed.addField("=-=-=-= Platform =-=-=-=", `**Platform**: ${os.type} \n**Release**: ${os.release}`)
  embed.addField(`=-=-=-= CPU Arch: ${os.arch} =-=-=-= `, cpus)
  embed.addField(`=-=-=-= Memory =-=-=-= `, `**Total Mem**: ${formatBytes(os.totalmem, 3)} \n**Free Mem**:  ${formatBytes(os.freemem,3 )} \n**Used Mem**:  ${formatBytes(os.totalmem - os.freemem, 3)}`)
  
  let g = client.guilds.cache.size; // g = guilds
  let t = client.users.cache.size; // t = all users
  let u = client.users.cache.filter(x => !x.bot).size; // u = users (not bots)
  embed.addField("=-=-=- Bot Info =-=-=-", `**${client.user.tag}** \n**Uptime**: ${dhm(client.uptime)} \n**Guilds**: ${g} ~ **Users**: ${t} ~ **Bots**: ${u}`)

  await Promise.all( client.owners.map((x) => client.users.fetch(x))).then(vals => {
    embed.addField("=-=-=-= Owners =-=-=-=", vals.map(y => y.tag).join(", "))
  })

  embed.setFooter("Ubuntu Server")
  await msg.channel.send({embed: embed})

}

function formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
function dhm(ms){ days = Math.floor(ms / (24*60*60*1000)); daysms=ms % (24*60*60*1000); hours = Math.floor((daysms)/(60*60*1000)); hoursms=ms % (60*60*1000); minutes = Math.floor((hoursms)/(60*1000)); minutesms=ms % (60*1000); sec = Math.floor((minutesms)/(1000)); return days+"d "+hours+"h "+minutes+"m "+sec+"s"; }

exports.help = {
  name: 'bot', 
  desc: "Shows bot information", 
  type: "Info", 
  usage: `bot`, 
  owner: false, 
  locked: false, 
  guild: false 
}