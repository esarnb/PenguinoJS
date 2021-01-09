exports.run = async (client, msg, args) => {
    if  (msg.guild && !msg.member.hasPermission("MANAGE_ROLES", {checkAdmin: true , checkOwner: true})) return msg.channel.send("You do not have perms to use this.");
    if (!args[0]) return msg.channel.send("You forgot to add a role name in the command.")
    
    let role = msg.guild.roles.cache.filter(x => x.name.toLowerCase() == args.join(" ").toLowerCase())
    if (role.size) return msg.channel.send(`>>> \`${role.first().members.map(x => x.user.tag).join("` | `")}\``)
    else msg.channel.send("Role does not exist.")
  
  }
  
  exports.help = {
    name: 'ru',
    desc: "Shows a list of users in a role",
    type: "Admin",
    usage: "ru Plebs",
    owner: false,
    locked: true,
    guild: true
  }