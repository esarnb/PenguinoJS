exports.run = async (client, msg, args) => {
  if (args.length < 3 || isNaN(parseInt(args.slice(2, args.length).join("")))) {
    msg.channel.send(`Usage for K or F or C: ${client.prefix}temp F C 20 28 54 39 50 100`)
  }
  else if (args.length > 2) conversions(args[0], args[1], args.slice(2, args.length).map(x => parseInt(x)) );

  function conversions(oldUnit, newUnit, tempList ) {
    var embed = new client.discord.MessageEmbed().setColor("RANDOM");
    oldUnit = oldUnit.toLowerCase(); newUnit = newUnit.toLowerCase();
    if      (oldUnit == "c" && newUnit == "f") embed.setDescription(convert("CtoF", tempList).join("\n"))
    else if (oldUnit == "f" && newUnit == "c") embed.setDescription(convert("FtoC", tempList).join("\n"))
    else if (oldUnit == "k" && newUnit == "f") embed.setDescription(convert("KtoF", tempList).join("\n"))
    else if (oldUnit == "f" && newUnit == "k") embed.setDescription(convert("FtoK", tempList).join("\n"))
    else if (oldUnit == "k" && newUnit == "c") embed.setDescription(convert("KtoC", tempList).join("\n"))
    else if (oldUnit == "c" && newUnit == "k") embed.setDescription(convert("CtoK", tempList).join("\n"))

    msg.channel.send({embeds: [embed]})
    function convert(type, tempList) {
      switch (type) {
        case "CtoF": /*(X * 9/5 + 32)*/                     for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}°C => ${((tempList[i] * (9/5)) + 32).toFixed(3)}°F`); break;
        case "FtoC": /* (X°C -32) * 5/9 */                  for (let i = 0; i < tempList.length; i++) tempList[i] =(`${tempList[i]}°F => ${((tempList[i] - 32) * (5/9) ).toFixed(3)}°C`); break;
        case "KtoF": /* ( X kelvin − 273.15) × 9/5 + 32 */  for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}K => ${(((tempList[i] - 273.15) * (9/5)) + 32 ).toFixed(3)}°F`); break;
        case "FtoK": /* ( X kelvin -32) × 5/9 + 273.15 */   for (let i = 0; i < tempList.length; i++) tempList[i] =( `${tempList[i]}°F => ${(((tempList[i] -32) * (5/9)) + 273.15 ).toFixed(3)}K`); break;
        case "CtoK": /* X Kelvin - 273.15  */               for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}°C => ${(tempList[i] + 273.15 ).toFixed(3)}K`); break;
        case "KtoC": /* X Kelvin - 273.15 */                for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}K => ${(tempList[i] - 273.15 ).toFixed(3)}°C`); break;
        default: tempList.push("No Conversion")
      }
      return tempList;
    }
  }
}

exports.help = {
  name: 'temp',
  desc: "Convert temp from F to C to K or trice versa",
  type: "Info",
  usage: "temp F C <42> or <42> <32> <100>",
  owner: false,
  locked: false,
  guild: false
}