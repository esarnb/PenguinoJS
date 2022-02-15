const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
    const button = new MessageButton()
        .setLabel('Visit my site')
        .setURL('https://esarnb.com')
        .setStyle('LINK')
        .setEmoji('802731399156334642');

    const row = new MessageActionRow().addComponents(button);

    const embed = new MessageEmbed()
        .setColor('#00ffff')
        .setTitle('My Website')
        .setURL('https://esarnb.com')
        .setDescription('https://esarnb.com');
    
    await msg.reply({ embeds: [embed], components: [row] })
}

exports.help = {
    name: 'website',
    desc: "website",
    type: "Info",
    usage: "website",
    owner: false,
    locked: false,
    guild: false
}