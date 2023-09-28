const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require("discord.js");
const { convertTime } = require("../../utils/convert");
const { defaultVol } = require("../../utils/functions");

module.exports = {
  name: 'search',
  description: 'Search a song from youtube',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'query',
      description: 'The search input (name/url)',
      required: true,
      type: 'STRING',
    },
  ],

    /**
    * @param {Client} client
    * @param {CommandInteraction} interaction
    */

    run: async (client, interaction) => {

        await interaction.deferReply({
            ephemeral: false,
          });

        if (!interaction.guild.members.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });
      const { channel } = interaction.member.voice;
  
      if (!interaction.guild.members.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
        return interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
              ),
          ],
        });

        let player = client.manager.players.get(interaction.guild.id); 

        if (!player) {
            player = await client.manager.createPlayer({
                guildId: interaction.guild.id,
                voiceId: channel.id,
                textId: interaction.channel.id,
                deaf: true,
                volume: await defaultVol(interaction.guild.id)
             });
        }

        let query = interaction.options.getString('query');
        const emojiaddsong = interaction.client.emoji.addsong;
        const emojiplaylist = interaction.client.emoji.playlist;

        const but = new MessageButton().setCustomId("s_one").setLabel("1").setStyle('SECONDARY');
        const but2 = new MessageButton().setCustomId("s_two").setLabel("2").setStyle('SECONDARY');
        const but3 = new MessageButton().setCustomId("s_three").setLabel("3").setStyle('SECONDARY');
        const but4 = new MessageButton().setCustomId("s_four").setLabel("4").setStyle('SECONDARY');
        const but5 = new MessageButton().setCustomId("s_five").setLabel("5").setStyle('SECONDARY');
        const row = new MessageActionRow().addComponents(but, but2, but3, but4, but5);

        let res = await player.search(query, { requester: interaction.user  });
        if (!res.tracks.length) {
          if(player && !player.playing && !player.paused) player.destroy();
          return interaction.editReply(`No results found for **${query}** `).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
        }

        switch (res.type) {
            case "TRACK":
                player.queue.add(res.tracks[0]);
                if (!player.playing && !player.paused) player.play();
                const embed = new MessageEmbed()
                    .setDescription(` ${emojiaddsong} **Added to queue** - [${res.tracks[0].title}](${res.tracks[0].uri}) \`${convertTime(res.tracks[0].length)}\` • ${res.tracks[0].requester}`)
                    .setColor(client.embedColor)
                interaction.editReply({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
                break;
            case "PLAYLIST":
                const playlist = res.tracks;
                for (let track of playlist)
                player.queue.add(track);
                if (!player.playing && !player.paused) player.play();
                const embed1 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`${emojiplaylist} **Added ${playlist.length} tracks from ${res.playlistName}**`)
                interaction.editReply({ embeds: [embed1] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
                break;
            case "SEARCH":
                let index = 1;
                const results = res.tracks.slice(0, 5).map(x => `• ${index++} | [${x.title}](${x.uri}) \`${convertTime(x.length)}\``).join("\n");
                const searched = new MessageEmbed()
                    .setTitle("Select the track that you want")
                    .setColor(client.embedColor)
                    .setDescription(results);

                const msg = await interaction.editReply({ embeds: [searched], components: [row] });
                const search = new MessageEmbed()
                    .setColor(client.embedColor);

                const collector = msg.createMessageComponentCollector({
                    filter: (f) => f.user.id === interaction.user.id ? true : false && f.deferUpdate(),
                    max: 1,
                    time: 60000,
                    idle: 60000 / 2
                });
                collector.on("end", async (collected) => {
                    if (msg) await interaction.editReply({ components: [new MessageActionRow().addComponents(but.setDisabled(true), but2.setDisabled(true), but3.setDisabled(true), but4.setDisabled(true), but5.setDisabled(true))] })

                });
                collector.on("collect", async (b) => {

                    if (!b.deferred) await b.deferUpdate();
                    if (!player && !collector.ended) return collector.stop();
        
                    if (b.customId === "s_one") {

                        player.queue.add(res.tracks[0]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await interaction.editReply({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${res.tracks[0].title}](${res.tracks[0].uri}) \`${convertTime(res.tracks[0].length)}\` • ${res.tracks[0].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
                    
                    } else if (b.customId === "s_two") {

                        player.queue.add(res.tracks[1]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await interaction.editReply({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${res.tracks[1].title}](${res.tracks[1].uri}) \`${convertTime(res.tracks[1].length)}\` • ${res.tracks[1].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_three") {

                        player.queue.add(res.tracks[2]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await interaction.editReply({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${res.tracks[2].title}](${res.tracks[2].uri}) \`${convertTime(res.tracks[2].length)}\` • ${res.tracks[2].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_four") {

                        player.queue.add(res.tracks[3]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await interaction.editReply({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${res.tracks[3].title}](${res.tracks[3].uri}) \`${convertTime(res.tracks[3].length)}\` • ${res.tracks[3].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    } else if (b.customId === "s_five") {

                        player.queue.add(res.tracks[4]);
                        if (!player.playing && !player.paused) player.play();
                        if (msg) await interaction.editReply({ embeds: [search.setDescription(`${emojiaddsong} **Added to queue** - [${res.tracks[4].title}](${res.tracks[4].uri}) \`${convertTime(res.tracks[4].length)}\` • ${res.tracks[4].requester}`)] })
                        .then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });

                    }

                });
              break;

        }

    }
}



