const { owners, trusted } = require("./grouping.json");
module.exports = async (client) => {
    // Bot configs
    client.config = {
        "prefix": "`",
        "owner": "251091302303662080"
    }
    //Default prefix on start
    client.prefix = client.config.prefix

    // Randomized Hex Color
    client.rColor = function () { return Math.floor(Math.random()*16777215).toString(16) }

    // Unique ids for interaction buttons
    client.customId = (id) => `${id}|${new Date().valueOf()}`;

    // Bot Owners that can do Owner Commands
    client.owners = new client.discord.Collection();
    owners.forEach((owner) => {
        Object.entries(owner).forEach(([key, value]) => {
          client.owners.set(key, value)
        })
    })

    client.trusted = new client.discord.Collection();
    trusted.forEach((trustee) => {
        Object.entries(trustee).forEach(([key, value]) => {
          client.trusted.set(key, value)
        })
    })
    
    console.log(client.trusted)

    client.invis = "᲼";

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}
