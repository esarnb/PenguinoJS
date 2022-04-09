const express = require("express");
module.exports = (client) => {
    const PORT = 3434;
    const app = express();
    
    app.use((req, res, next) => {
        console.log(`PATH: ${req.path}`);
        next();
    });

    app.get("/", (req, res) => {
        let botInfo = {
            user: client.user,
            members: client.members.cache.size,
            servers: client.servers.cache.size,
            commands: client.commands
        }
        res.json(botInfo)
    })
    
    app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
}