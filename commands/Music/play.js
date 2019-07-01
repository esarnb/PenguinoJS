const yt = require('ytdl-core-discord'); //secondary
const YouTube = require("discord-youtube-api"); //Getting url data and such. See if I can just use secondary module instead.
const Nep = require('neptune-api-wrapper'); //primary
// const ytdl = require('ytdl-core');

exports.run = async (client, msg, args) => {

    if (!args[0]) return msg.channel.send("You forgot to add what video to play!")

    let me = msg.guild.members.get(client.user.id);
    if (!me.hasPermission("CONNECT", { checkAdmin: true, checkOwner: true })) {
      return msg.channel.send("No perms to connect to a voice channel!")
    } else if (!me.hasPermission("SPEAK", { checkAdmin: true, checkOwner: true })) {
      return msg.channel.send("No perms to speak in a voice channel!")
    } else if (!msg.member.voice.channel) {
      return msg.channel.send("You are not in a voice channel!")
    }
    if (!msg.member.voice.channel.members.get(client.user.id)) {
        await msg.member.voice.channel.join();
    }
        msg.channel.send("Loading...").then((msgy) => {
            try {
                const nep = new Nep(client.config.nepapi);
                nep.youtubeSearch(args.join(" "), {
                    maxResults: 1
                }).then(async (res) => {
                    // console.log(res.state)
                    if (res.state == "fail") {
                        msg.member.voice.channel.leave()
                        return msgy.edit("Could not find the video!")
                    }
                    msgy.edit("",{
                        embed: new client.discord.MessageEmbed()
                        .setDescription(`Now playing: ${res.result[0].video.title}\n\nChannel: ${res.result[0].video.channel}`)
                        .setThumbnail(res.result[0].thumbnail.high.url)
                        .setColor(client.rColor())
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    })
                    connection = await msg.member.voice.channel.join();
    //If NEP API is down, use YT Api
 /*USING YT*/                  let dispatcher = connection.play(yt(res.result[0].video.url, {
                        filter: 'audioonly'
                    }));
                }).catch((err) => {
                    console.log(err)
                    if (err) {
                        msgy.edit("",{embed:
                            new client.discord.MessageEmbed()
                            .setColor("RED").addField("Err Stack:", err.stack.slice(0, 1000))
                            .setFooter("Fatal Error. Loading backup...")
                        }).then(() => {
                            setTimeout(() => {
                                runYoutubeAPI(connection, msgy)
                            }, 5000);
                        })
                    }
                });

            } catch (err) {
                console.log(err)
                msg.channel.send("Hella bad Error")
            }
        })

    async function runYoutubeAPI(connection, msgy) {
        var youtube = new YouTube(client.config.ytapi);

        async function play(url) {
            if (msg.member.voice.channel) {
                connection = await msg.member.voice.channel.join();
                connection.play(await yt(url), { type: 'opus' });
                msgy.edit({embed: new client.discord.MessageEmbed().setDescription("Playing music :D")})
            } else {
                msg.reply('You need to join a voice channel first!');
            }
        }
        let regx = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        // var embed = new client.discord.MessageEmbed()
        //     .addField("Playing video by url", client.prefix + "play https://www.youtube.com/watch?v=buicV2vGmbg")
        //     .addField("Playing video by search", client.prefix + "play Skott - Porcelain (AWAY Remix)")
        //     .addField("Playing a playlist by url", client.prefix + "play https://www.youtube.com/watch?v=7_rftpd0u0U&list=OLAK5uy_nDG2F1rgP_OVqXtQRjV260ZeuCiijByxs")
        //     .addField("Playing a playlist by search", client.prefix + "play Ariana Grande - Thank You Next playlist")
        //     .addField("**Note**", "By default, the command will run links, if it detects a playlist then it will handle a few videos from the playlist.\nElse if there is an error or could not find a video, then you will see this message on usage again.")

        if (regx.exec(args.join(' '))) {
            // Use as url
            if (!args[0].includes("/playlist?")) {
                var video1 = await youtube.getVideo(args[0]);
                if (video1.url) {
                    play(video1.url)
                }
                else {
                    msg.channel.send("Could not find video url from the data.")
                }
            }
            else {
                //use as playlist
                var videoArray1 = await youtube.getPlaylist(args[0]);

                msg.channel.send("I should implement playlists, shouldn't I")
            }
        }
        else {
            //Use as phrase
            var video3 = await youtube.searchVideos(args.join(" "));

            if (video3.url) {
                play(video3.url)
            }
            else {
                msgy.edit("Could not find video url from the data.", {embed: undefined})
            }
        }
    }
}

exports.help = {
    name: 'play',
    desc: "Play anything you'd like.",
    type: "Music",
    usage: "-play <URL> or -play Ariana Grande NASA",
    owner: false,
    admin: false,
    locked: false,
    guild: false
}
