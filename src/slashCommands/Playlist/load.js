const {
  MessageEmbed,
  CommandInteraction,
  Client,
  MessageActionRow,
  MessageButton,
} = require('discord.js');
const db = require('../../schema/playlist');
const { defaultVol } = require("../../utils/functions")

module.exports = {
  name: 'load',
  description: 'Play the saved Playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'name',
      description: 'play the saved playlist',
      required: true,
      type: 'STRING',
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({

    });
    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });
    const player = await client.manager.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      deaf: true,
      volume: await defaultVol(interaction.guild.id)
    });

    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Playlist not found. Please enter the correct playlist name\n\nDo ${prefix}list To see your Playlist`,
            ),
        ],
      }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }
    if (!player) return;

    let count = 0;
    const m = await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`Adding ${data.Playlist.length} track(s) from your playlist **${Name}** to the queue.`),
      ],
    });
    for (const track of data.Playlist) {
      let s = await player.search(track.uri ? track.uri : track.title, { requester: interaction.user });
      if (s.type === 'PLAYLIST') {
        await player.queue.add(s.tracks[0]);
        if (!player.playing && !player.paused) player.play();
        ++count;
      } else if (s.type === 'TRACK') {
        await player.queue.add(s.tracks[0]);
        if (!player.playing && !player.paused) player.play();
        ++count;
      } else if (s.type === 'SEARCH') {
        await player.queue.add(s.tracks[0]);
        if (!player.playing && !player.paused) player.play();
        ++count;
      }
    }
    if (player && !player.queue.current) player.destroy();
    if (count <= 0 && m)
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Couldn't add any tracks from your playlist **${Name}** to the queue.`),
        ],
      });
    if (m)
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Added ${count} track(s) from your playlist **${Name}** to the queue.`),
        ],
      });
  },
};
