require("dotenv").config();

exports.run = async (client, msg, args) => {
  let trusted = client.trusted.find(usr => (usr == msg.author.id));
  if (!trusted) return msg.channel.send("Apologies, you are not allowed to talk to my friend Kyle3.5.")

  const username = String(msg.author.username);    
  const embedQuestion = new client.discord.MessageEmbed();
  const embedResult = new client.discord.MessageEmbed();
  embedResult.setColor("RANDOM");
  
  embedQuestion.setColor("RANDOM");
  embedQuestion.addField("You asked ChatGPT...", args.join(" "));
  embedQuestion.setFooter({
    text: "Please wait for a response...Might take a few seconds...",
    iconURL: msg.author.avatarURL()
  });

  msg.channel.send({
    embeds: [embedQuestion]
  }).then(async (msgEdit) => {

    const completion = await client.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: args.join()
      }],
      max_tokens: 500,
    }).catch(err => {
      console.error("Err GPT:", err);
      embedResult.setDescription(`Uh oh, ${err.type}: ${err.message} ${err?.code}`);
    });

    if (completion && completion?.data) {
      const choices = completion.data;
      const response = choices.choices[0].message;
      console.log(response);
      const gptResponse = segmentation(response.content)
      
      // embedResult.addField("You asked DaVinci...", args.join(" "))
      for (let index = 0; index < gptResponse.length; index++) {
        if (index >= 16) embedResult.addField(`Too long`, `Apologies, have to refine code to indiacte more messages...`)
        else embedResult.addField(index === 0 ? `ChatGPT ${response.role}` : "\u200b", gptResponse[index])
      }
    } else {
      embedResult.addField(`Oopsie`, "No Result")
    }
    
    embedResult.setFooter({
      text: username + ", this is an unfinished bot- it doesn't use previous answers yet.",
      iconURL: msg.author.avatarURL()
    })
    embedResult.setColor("RANDOM")
    
    msgEdit.edit({
      embeds: [embedResult]
    })
  })
}

const segmentation = (phrase) => {
  // return phrase.match(/[\s\S]{1,1020}/gm) || [];
  return phrase.trim().match(/.{1,1024}(\\s|$)/gm) || [];
}

exports.help = {
  name: 'chat',
  desc: "chat using ChatGPT algorithm: gpt3.5-turbo",
  type: "Fun",
  usage: "chat Please tell me a short bedtime story",
  owner: false,
  locked: false,
  guild: false
}
