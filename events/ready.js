require("colors")

module.exports = (client) => {
    let c = client.channels.size; // c = channels
    let g = client.guilds.size; // g = guilds
    let t = client.users.size; // t = all users
    let u = client.users.filter(x => !x.bot).size; // u = users (not bots)
    console.log( `Ready to serve ${g} servers, with ${u}/${t} users.`.green); 
}