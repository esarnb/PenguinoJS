const fs = require("fs");
const colors = require('colors');

exports.run = (client) => {
  client.commands = new client.discord.Collection();

   //Read Commands
  let categoryList = fs.readdirSync(`./commands/`);
  for (let i = 0; i < categoryList.length; i++) {
    let dir = `./commands/${categoryList[i]}/`;

    fs.readdir(dir, (err, files) => {  // This line of code reads all files from our "commands" folder
      if(err) console.error(err);
      let cmds = files.filter(f => f.split('.').pop() === 'js'); // This array will contain all files with 'js' extension
      if(cmds.length <= 0) {
        return console.log('No command files found...'.red);
      }
      console.log(`Loading ${files.length} commands from ${categoryList[i]}...`.magenta); // Prints how many commands we are loading
      cmds.forEach((f, i) => { // Execute this code for every file from our array, f is files, and i stands for number
        const command = require(`${dir}${f}`);
        console.log(`${i + 1}: ${f} loaded!`.cyan);
        client.commands.set(command.help.name, command); // Push command name and file with it's code to our Collection
      });
    });
  }

  //Read Events
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    let events = files.filter(f => f.split('.').pop() === 'js');
    if (events.length = 0) {
        return console.log('No event files found...'.red);
    }
    console.log(`Loading ${files.length} events...`.magenta);
    files.forEach((file, i) => {
      if (!file.endsWith(".js")) return;
      const event = require(`./events/${file}`);
      console.log(`${i + 1}: ${file} loaded!`.cyan);
      let eventName = file.split(".")[0];

      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];

    });
  });
}
