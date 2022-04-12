require("colors")

module.exports = async (client) => {
    let c = client.channels.cache.size; // c = channels
    let g = client.guilds.cache.size; // g = guilds
    let t = client.users.cache.size; // t = all users
    let u = client.users.cache.filter(x => !x.bot).size; // u = users (not bots)
    console.log( `${client.user.tag} ready to serve ${g} servers, with ${t} members: ${u} users and ${t-u} bots.`.green); 
    require("../Express/express")(client); // Initialize Bot API
}