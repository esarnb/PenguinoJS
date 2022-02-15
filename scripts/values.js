module.exports = async (client) => {
    let myID = 251091302303662080
    
    // Bot configs
    client.config = {
        "prefix": "`",
        "owner": myID
    }
    //Default prefix on start
    client.prefix = client.config.prefix

    // Randomized Hex Color
    client.rColor = function () { return Math.floor(Math.random()*16777215).toString(16) }

    // Unique ids for interaction buttons
    client.customId = (id) => `${id}|${new Date().valueOf()}`;


    // Bot Owners that can do Owner Commands
    client.owners = new client.discord.Collection();
    client.owners.set("emp", myID)
    // client.owners.set("Moist", "184157133187710977")

    client.invis = "᲼";




    /**
     *          PROTOTYPES
     */

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    // client.guilds.cache.every(async x => await x.members.fetch())
}