exports.run = async (client, msg, args) => {
  if (args.length < 3 || isNaN(parseInt(args.slice(2, args.length).join("")))) {
    msg.channel.send(`Usage for K or F or C: ${client.prefix}temp F C 20 28 54 39 50 100`)
  }
  else if (args.length > 2) {
    conversions(args[0], args[1], args.slice(2, args.length).map(x => parseInt(x)) )
  }

    function conversions(oldUnit, newUnit, tempList ) {
      var embed = new client.discord.MessageEmbed().setColor(client.rColor())
      if      (oldUnit.toLowerCase() == "c" && newUnit.toLowerCase() == "f") embed.setDescription(CtoF(tempList).join("\n"))
      else if (oldUnit.toLowerCase() == "f" && newUnit.toLowerCase() == "c") embed.setDescription(FtoC(tempList).join("\n"))
      else if (oldUnit.toLowerCase() == "k" && newUnit.toLowerCase() == "f") embed.setDescription(KtoF(tempList).join("\n"))
      else if (oldUnit.toLowerCase() == "f" && newUnit.toLowerCase() == "k") embed.setDescription(FtoK(tempList).join("\n"))
      else if (oldUnit.toLowerCase() == "k" && newUnit.toLowerCase() == "c") embed.setDescription(KtoC(tempList).join("\n"))
      else if (oldUnit.toLowerCase() == "c" && newUnit.toLowerCase() == "k") embed.setDescription(CtoK(tempList).join("\n"))

      msg.channel.send({embed: embed})
      /*
        if      (oldUnit.toLowerCase() == "c" && newUnit.toLowerCase() == "f") msg.channel.send(`${tempList.join("°C ")}\n${CtoF(tempList).join("°F ")}`)
        else if (oldUnit.toLowerCase() == "f" && newUnit.toLowerCase() == "c") msg.channel.send(`Fahrenheit: [${tempList.join("°F] [") + "°F]"}\nCelsius: ${FtoC(tempList).join("°C ") + "°C"}`)
        else if (oldUnit.toLowerCase() == "k" && newUnit.toLowerCase() == "f") msg.channel.send(`Kelvin: ${tempList.join("K ") + "K"}\nFahrenheit: ${KtoF(tempList).join("°F ") + "°F"}`)
        else if (oldUnit.toLowerCase() == "f" && newUnit.toLowerCase() == "k") msg.channel.send(`Fahrenheit: ${tempList.join("°F ") + "°F"}\nKelvin: ${FtoK(tempList).join("K ") + "K "}`)
        else if (oldUnit.toLowerCase() == "k" && newUnit.toLowerCase() == "c") msg.channel.send(`Kelvin: ${tempList.join("K ") + "K"}\nCelsius: ${KtoC(tempList).join("°C ") + "°C"}`)
        else if (oldUnit.toLowerCase() == "c" && newUnit.toLowerCase() == "k") msg.channel.send(`Celsius: ${tempList.join("°C ") + "°C"}\nKelvin: ${CtoK(tempList).join("K ") + "K"}`)
      */

      /*(X * 9/5 + 32)*/
      function CtoF(tempList) {
        for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}°C => ${((tempList[i] * (9/5)) + 32).toFixed(3)}°F`);
        return tempList;
      }
      /* (X°C -32) * 5/9 */
      function FtoC(tempList) {
        for (let i = 0; i < tempList.length; i++) tempList[i] =(`${tempList[i]}°F => ${((tempList[i] - 32) * (5/9) ).toFixed(3)}°C`);
        return tempList;
      }
      /* ( X kelvin − 273.15) × 9/5 + 32 */
      function KtoF(tempList) {
        for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}K => ${(((tempList[i] - 273.15) * (9/5)) + 32 ).toFixed(3)}°F`);
        return tempList;
      }
      /* ( X kelvin -32) × 5/9 + 273.15 */
      function FtoK(tempList){
        for (let i = 0; i < tempList.length; i++) tempList[i] =( `${tempList[i]}°F => ${(((tempList[i] -32) * (5/9)) + 273.15 ).toFixed(3)}K`);
        return tempList;
      }
      /* X Kelvin - 273.15  */
      function CtoK(tempList) {
        for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}°C => ${(tempList[i] + 273.15 ).toFixed(3)}K`);
        return tempList;
      }
      /* X Kelvin - 273.15 */
      function KtoC(tempList) {
        for (let i = 0; i < tempList.length; i++) tempList[i] = (`${tempList[i]}K => ${(tempList[i] - 273.15 ).toFixed(3)}°C`);
        return tempList;
      }
  }
}

exports.help = {
  name: 'temp',
  desc: "Convert temp from F to C to K or trice versa",
  type: "Info",
  usage: "-temp",
  owner: false,
  admin: false,
  locked: false,
  guild: false
}
