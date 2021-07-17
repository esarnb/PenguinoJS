exports.run = async (client, msg, args) => {

    const link = await client.generateInvite({
      permissions: [],
      scopes: ['guilds'],
    });
    msg.channel.send(`Generated summon link: ${link}`);

  }
  
  exports.help = {
    name: 'summon',
    desc: "Generate a bot invite",
    type: "Info",
    usage: "summon",
    owner: false,
    locked: false,
    guild: false
  }