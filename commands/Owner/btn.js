const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
    const btnA = client.customId("btnA"),
        btnB = client.customId("btnB"),
        btnC = client.customId("btnC"),
        btnD = client.customId("btnD");
        
    const row = new MessageActionRow().addComponents(
        new MessageButton()
            .setLabel("A")
            .setStyle("PRIMARY")
            .setCustomId(btnA),
        new MessageButton()
            .setLabel("B")
            .setStyle("SECONDARY")
            .setCustomId(btnB),
        new MessageButton()
            .setLabel("C")
            .setStyle("SUCCESS")
            .setCustomId(btnC),
        new MessageButton()
            .setLabel("D")
            .setStyle("DANGER")
            .setCustomId(btnD),
        new MessageButton()
            .setLabel("E")
            .setStyle("LINK")
            .setURL("https://esarnb.com/"),
    );

    msg.channel.send({
        content: "Select a choice",
        components: [row],
    }).then((m) => {
        const filter = (interaction) => {
            if (interaction.user.id === msg.author.id) return true
            else interaction.reply({ content: "This msg isnt for you!", ephemeral: true });
        }

        let clicks = 4;
        const collector = msg.channel.createMessageComponentCollector({
            filter, max: clicks, time: 30000
        });

                
        collector.on('collect', async i => {
            await m.edit({
                content: responses(i) + `\n${clicks - collector.total} clicks remaining.`,
            })
            i.deferUpdate();
        });

        collector.on('end', (collected) => {
            m.edit({
                components: []
            })
        });
    })

    
    responses = (i) => {
        switch(i.customId) {
            case btnA: {
                return "You chose primary"
            }
            case btnB: {
                return "You chose secondary"
            }
            case btnC: {
                return "You chose success"
            }
            case btnD: {
                return "You chose danger"
            }
        }
    }

}

exports.help = {
    name: 'btn',
    desc: "btn",
    type: "Owner",
    usage: "btn",
    owner: true,
    locked: false,
    guild: false
}