const path = require('path');
exports.run = (client, msg, args) => {
    args = args.join(' ');

    return msg.channel.send({
        embed: new client.discord.MessageEmbed()
            .setDescription(`*Running...*`)
            .setColor(client.rColor())
    }).then((m1) => {
        try {
            var run = require('child_process').execSync(args);

            if (!args[0]) return msg.channel.send(`No args boi`);
        } catch (err) {
            run = err;
        }
        let getEmote = () => {
            if (run.toString().indexOf('Error') >= 0) return ':x:';
            else return '✅';
        }
        if (run.toString().length >= 1024) {
            let page1 = new client.discord.MessageEmbed()
                .addField(`Input`, `\`\`\`js\n${args}\n\`\`\``)
                .addField(`${getEmote()} Output`, `\`\`\`js\n${run.toString().slice(0, Math.floor(run.toString().length / 2))}\n\`\`\``)
                .setColor(client.rColor())
            let page2 = new client.discord.MessageEmbed()
                .addField(`Input`, `\`\`\`js\n${args}\n\`\`\``)
                .addField(`${getEmote()} Output`, `\`\`\`js\n${run.toString().slice(Math.floor(run.toString().length / 2), run.toString().length)}\n\`\`\``)
                .setColor(client.rColor())
            m1.edit({
                embed: page1
            }).then(async (mm) => {
                const collector = mm.createReactionCollector((abc) => abc.users.last().id == msg.author.id, {
                    time: 30000
                });

                await mm.react('◀');
                await mm.react('▶');

                collector.on('collect', (m) => {
                    if (m.emoji.name == '▶') return mm.edit({
                        embed: page2
                    }).then(async () => {
                        await mm.reactions.removeAll();
                        await mm.react('◀');
                        await mm.react('▶');
                    });
                    if (m.emoji.name == '◀') return mm.edit({
                        embed: page1
                    }).then(async () => {
                        await mm.reactions.removeAll();
                        await mm.react('◀');
                        await mm.react('▶');
                    });
                });
            });
        } else return m1.edit({
            embed: new client.discord.MessageEmbed()
                .addField(`Input`, `\`\`\`js\n${args}\n\`\`\``)
                .addField(`${getEmote()} Output`, `\`\`\`js\n${run}\n\`\`\``)
                .setColor(client.rColor())
        });
    }).catch((e) => client.func.log(`Error`, e));
}
exports.help = {
  name: 'exec',
  desc: "test",
  type: "Owner",
  usage: "Interesting Cmd",
  owner: true,
  admin: false,
  locked: false,
  guild: false
}
