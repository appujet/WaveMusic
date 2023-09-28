const { MessageEmbed, MessageButton, MessageActionRow, Permissions  } = require("discord.js");
const { convertTime } = require("../../utils/convert");
const { defaultVol } = require("../../utils/functions");

module.exports = {
    name: 'search',
    category: 'Music',
    aliases: ['sc'],
    description: 'Search for a song from youtube',
    args: true,
    usage: '< Search Term | YouTube URL | Video Name | Spotify URL>',
    userPrams: [],
    botPrams: ['EMBED_LINKS'],
    owner: false,
    inVoiceChannel: true,
    sameVoiceChannel: true,
    execute: async (message, args, client) => {

        if (!message.guild.members.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });
      const { channel } = message.member.voice;
  
      if (!message.guild.members.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
        return message.channel.send({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

        let player = client.manager.players.get(message.guild.id); 

        if (!player) {
            player = await client.manager.createPlayer({
                guildId: message.guild.id,
                voiceId: message.member.voice.channel.id,
                textId: message.channel.id,
                deaf: true,
                volume: await defaultVol(message.guild.id)
             });
        }
        
        const query = args.join(" ");
        const emojiaddsong = message.client.emoji.addsong;
        const emojiplaylist = message.client.emoji.playlist;
        const emojisearch = message.client.emoji.search;

        const msg = await message.channel.send({ embeds: [new MessageEmbed().setColor("RANDOM").setDescription(` ${emojisearch} Searching **${query}** Song Please wait...`)] })

        const but = new MessageButton().setCustomId("s_one").setLabel("1").setStyle('SECONDARY');
        const but2 = new MessageButton().setCustomId("s_two").setLabel("2").setStyle('SECONDARY');
        const but3 = new MessageButton().setCustomId("s_three").setLabel("3").setStyle('SECONDARY');
        const but4 = new MessageButton().setCustomId("s_four").setLabel("4").setStyle('SECONDARY');
        const but5 = new MessageButton().setCustomId("s_five").setLabel("5").setStyle('SECONDARY');
        const row = new MessageActionRow().addComponents(but, but2, but3, but4, but5);

        let s = await player.search(query, { requester: message.author });
        if (!s.tracks.length) {
            if (player && !player.playing && !player.paused) player.destroy();
            return msg.edit({ embeds: [new MessageEmbed().setColor("RED").setDescription(`${emojisearch} No results found for **${query}**`)] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }

        switch (s.type) {
            case "TRACK":
                player.queue.add(s.tracks[0]);
                const embed = new MessageEmbed()
                    .setDescription(` ${emojiaddsong} **Added to queue** - [${s.tracks[0].title}](${s.tracks[0].uri}) \`${convertTime(s.tracks[0].length)}\` • ${s.tracks[0].requester}`)
                    .setColor(client.embedColor)

                msg.edit({ embeds: [embed] });
                if (!player.playing && !player.paused) player.play();
                break;
            case "PLAYLIST":
                const playlist = s.tracks;
                for (let track of playlist)
                player.queue.add(track);
                if (!player.playing && !player.paused) player.play();
                const embed1 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`${emojiplaylist} **Added ${playlist.length} tracks from ${s.playlistName}**`)
                msg.edit({ embeds: [embed1] });
                break;
            case "SEARCH":
                let index = 1;
                const results = s.tracks.slice(0, 5).map(x => `• ${index++} | [${x.title}](${x.uri}) \`${convertTime(x.length)}\``).join("\n");
                const searched = new MessageEmbed()
                    .setTitle("Select the track that you want")
                    .setColor(client.embedColor)
                    .setDescription(results);

                await msg.edit({ embeds: [searched], components: [row] });
                const search = new MessageEmbed()
                    .setColor(client.embedColor);

                const collector = msg.createMessageComponentCollector({
                    filter: (f) => f.user.id === message.author.id ? true : false && f.deferUpdate(),
                    max: 1,
                    time: 60000,
                    idle: 60000 / 2
                });
                collector.on("end", async (collected) => {
                    if (msg) await msg.edit({ components: [new MessageActionRow().addComponents(but.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true), but5.setDisabled(true))] })

                });
                collector.on("collect", async (b) => {

                    if (!b.deferred) await b.deferUpdate();
                    if (!player && !collector.ended) return collector.stop();
        
                    if (b.customId === "s_one") {

                        player.queue.add(s.tracks[0]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await msg.edit({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${s.tracks[0].title}](${s.tracks[0].uri}) \`${convertTime(s.tracks[0].length)}\` • ${s.tracks[0].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
                    
                    } else if (b.customId === "s_two") {

                        player.queue.add(s.tracks[1]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await msg.edit({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${s.tracks[1].title}](${s.tracks[1].uri}) \`${convertTime(s.tracks[1].length)}\` • ${s.tracks[1].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_three") {

                        player.queue.add(s.tracks[2]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await msg.edit({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${s.tracks[2].title}](${s.tracks[2].uri}) \`${convertTime(s.tracks[2].length)}\` • ${s.tracks[2].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_four") {

                        player.queue.add(s.tracks[3]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await msg.edit({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${s.tracks[3].title}](${s.tracks[3].uri}) \`${convertTime(s.tracks[3].length)}\` • ${s.tracks[3].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_five") {

                        player.queue.add(s.tracks[4]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await msg.edit({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${s.tracks[4].title}](${s.tracks[4].uri}) \`${convertTime(s.tracks[4].length)}\` • ${s.tracks[4].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    }

                });
            break;

        }

    }
}



