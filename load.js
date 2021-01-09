require('colors');
const fs = require("fs");

module.exports = (client) => {

    let dir = `./commands/`;
    client.commands = new client.discord.Collection();

    fs.readdir(dir, (err, files) => {  // Reads all files from "commands" folder
        
        if (err) return console.error(err);
        
        let cmds = files.filter(f => f.split('.').pop() === 'js'); // Array contains all files with 'js' extension
        if (!cmds.length) return console.log('No command files found...'.red);

        console.log(`Loading ${files.length} commands...`.magenta); // Prints how many commands we are loading
        cmds.forEach((f, i) => { // For all files in folder, f is files, and i is index
            const cmd = require(`${dir}${f}`);
            client.commands.set(cmd.help.name, cmd); // Push command name and functions into list
            console.log(`${i + 1}: ${f} loaded!`.cyan);
        });

    });

    fs.readdir(`./events/`, (err, files) => {
        
        if (err) return console.error(err);
        
        let events = files.filter(f => f.split('.').pop() === 'js');
        if (!events.length) return console.log('No event files found...'.red);
        
        console.log(`Loading ${files.length} events...`.magenta);
        files.forEach((file, i) => {
        
            if (!file.endsWith(".js")) return;
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0]; //Cut out everything from .
            
            client.on(eventName, event.bind(null, client)); // attach file to discord event
            delete require.cache[require.resolve(`./events/${file}`)]; // Refresh stored Cache for specific file
            
            console.log(`${i + 1}: ${file} loaded!`.cyan);
        });
    });
}