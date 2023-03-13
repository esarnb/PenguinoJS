require("dotenv").config();

exports.run = async (client, msg, args) => {
  let trusted = client.trusted.find(usr => (usr == msg.author.id));
  if (!trusted) return msg.channel.send("Apologies, you are not allowed to talk to my friend Kyle.")

  const username = String(msg.author.username);    
  const embedQuestion = new client.discord.MessageEmbed();
  const embedResult = new client.discord.MessageEmbed();

  embedQuestion.setColor("RANDOM");
  embedQuestion.addField("You asked DaVinci...", args.join(" "));
  embedQuestion.setFooter({
    text: "Please wait for a response...Might take a few seconds...",
    iconURL: msg.author.avatarURL()
  });

  msg.channel.send({
    embeds: [embedQuestion]
  }).then(async (msgEdit) => {

    const completion = await client.openai.createCompletion({
      model: "text-davinci-003",
      prompt: args.join(),
      max_tokens: 300,
    }).catch(err => {
      console.error("Err GPT:", err)
      embedResult.setDescription(`Uh oh, ${err.type}: ${err.message} ${err?.code}`)
    });

    if (completion && completion?.data) {
      const choices = completion.data;
      const response = choices.choices[0].text;
      const gptResponse = segmentation(response)
      console.log(choices);
      console.log(response);
      console.log(gptResponse);
      
      // embedResult.addField("You asked DaVinci...", args.join(" "))
      for (let index = 0; index < gptResponse.length; index++) {
        if (index >= 9) embedResult.addField(`Too long`, `Apologies, have to refine code to indiacte more messages...`)
        else embedResult.addField(`DaVinci Monologue ${index+1} of ${gptResponse.length}`, gptResponse[index])
      }
    } else {
      embedResult.addField(`Oopsie`, "No Result")
    }
    
    embedResult.setFooter({
      text: username + ", be aware this gpt3 has no memory unlike ChatGPT",
      iconURL: msg.author.avatarURL()
    })
    embedResult.setColor("RANDOM")
    
    msgEdit.edit({
      embeds: [embedResult]
    })
  })
}

const segmentation = (phrase) => {
  return phrase.match(/[\s\S]{1,1020}/gm) || [];
}

exports.help = {
  name: 'gpt',
  desc: "chat using ChatGPT algorithm: text-davinci-003 (no memory)",
  type: "Fun",
  usage: "gpt Please tell me the answer to 1 + 1",  
  owner: false,
  locked: true,
  guild: false
}
