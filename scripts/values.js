module.exports = (client) => {
    let myID = 251091302303662080
    
    // Bot configs
    client.config = {
        "prefix": "`",
        "owner": myID
    }
    // Randomized Hex Color
    client.rColor = function () { return Math.floor(Math.random()*16777215).toString(16) }

    // Bot Owners that can do Owner Commands
    client.owners = new client.discord.Collection();
    client.owners.set("Myself", myID)

}