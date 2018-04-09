const Discord = require('discord.js');
const got = require(`got`);
const stripIndents = require('common-tags').stripIndents;

module.exports.run = (client, msg, args) => {
    function clean(text) {
    	if (typeof(text) === "string")
    	return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    	else
    	return text;
    }

    function gistUpload(text, lang = 'js') {
    	const filename = 'Eval.' + lang;
      return request('https://api.github.com/gists', {
          body: {
              files: {
                  [filename]: {
                      content: text
                  }
              }
          },
          json: true
      }).then(res => {
    		if (res && res.body && res.body.html_url) {
          // console.log(res);
    			return {
    				success: true,
            url: res.body.html_url,
            rawUrl: res.body.files[filename].raw_url
    			};
    		} else {
    			return {
    				success: false
    			};
    		}
    	});
    }

    try {
     const code = args.join(" ");
     let evaled = eval(code);

     if (typeof evaled !== "string"){
       evaled = require("util").inspect(evaled);
     }
     var toSend = clean(evaled).toString().replace(client.token, `What token? I am a fellow human just like you!`);

     if (toSend.length > 1900) {
       // msg.channel.send(gistUpload(toSend));
       msg.reply(`${toSend.length} characters is too big for a discord message`)
     }
     else {
       msg.channel.send(toSend, {code: "xl"});
     }
   } catch (err) {
     msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
   }
   console.log("-------------------------------------------------------------------------------------------------------------------------------------");
}

module.exports.info = {
  name: "eval",
  help: "Quick maffs",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
