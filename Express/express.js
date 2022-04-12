const cors = require("cors");
const express = require("express");
module.exports = (client) => {
    const PORT = 3434;
    const app = express();
    app.use(cors());
    app.options('*', cors());
    app.use((req, res, next) => {
        console.log(`PATH: ${req.path}`);
        next();
    });

    app.get("/discord", (req, res) => {
        let botInfo = {
            user: client.user,
            users: client.users.cache.size,
            servers: client.guilds.cache.size,
            commands: client.commands
        }
        res.json(botInfo)
    })
    
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}