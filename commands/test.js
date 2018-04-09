const request = require('request');
const moment = require("moment")
const got = require("got");
module.exports.run = async (client, msg, args) => {
  try {
//-----------------------------------------------------------------------------------------------------
    var points = await args.map(x => parseInt(x)).sort(function(a, b){return a - b});
    await msg.channel.send(new client.discord.MessageEmbed().setDescription(`Input: ${args}\nOutput: ${points}`))
//-----------------------------------------------------------------------------------------------------
    // var listy = msg.guild.members.map(x => `${x.user.tag}|${x.joinedTimestamp}`);
    // listy.sort(function(a, b) { return a.split("|").pop() - b.split("|").pop() });
    // msg.channel.send(`Listy: ${listy.map(x => x.split("|").join("----Joined At---->")).join("\n")}`)
//-----------------------------------------------------------------------------------------------------
    // function fetchy(text) {
    //   const filename = 'Eval.js';
    //   got.post('https://api.github.com/gists', {
    //     method: 'post',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       public: true,
    //       files: {
    //         [filename]: {
    //           content: "```js\n"+text+"\n```"
    //         }
    //       },
    //     })
    //   }).then(res => {
    //     console.log(res);
    // 		if (res && res.body && res.body.html_url) {
    // 			return {
    // 				success: true,
    //         url: res.body.html_url,
    //         rawUrl: res.body.files[filename].raw_url
    // 			};
    // 		} else {
    // 			return {
    // 				success: false
    // 			};
    // 		}
    // 	});
    // }
    // msg.channel.send(fetchy(args))

//-----------------------------------------------------------------------------------------------------
  }
  catch (err) {
      msg.reply("" + err.message);
      console.log(err);
    }
  }
// }

module.exports.info = {
  name: "test",
  help: "Testing.",
  categ: "Owner",
  owner: true,
  admin: false,
  issue: false
}
