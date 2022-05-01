const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const ms = require('ms');

module.exports = {
  name: 'seek',
  description: 'Seek the currently playing song',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'time',
      description: '<10s || 10m || 10h>',
      required: true,
      type: 'STRING',
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction, prefix) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }

    const time = ms(args[0]);
    const position = player.player.position;
    const duration = player.current.length;

    const emojiforward = client.emoji.forward;
    const emojirewind = client.emoji.rewind;

    const song = player.current;

    if (time <= duration) {
      if (time > position) {
        await player.player.seekTo(time);
        let thing = new MessageEmbed()
          .setDescription(
            `${emojiforward} **Forward**\n[${song.title}](${song.uri})\n\`${convertTime(
              time,
            )} / ${convertTime(duration)}\``,
          )
          .setColor(client.embedColor);
        return interaction.editReply({ embeds: [thing] });
      } else {
        await player.player.seekTo(time);
        let thing = new MessageEmbed()
          .setDescription(
            `${emojirewind} **Rewind**\n[${song.title}](${song.uri})\n\`${convertTime(
              time,
            )} / ${convertTime(duration)}\``,
          )
          .setColor(client.embedColor);
        return interaction.editReply({ embeds: [thing] });
      }
    } else {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(
          `Seek duration exceeds Song duration.\nSong duration: \`${convertTime(duration)}\``,
        );
      return interaction.editReply({ embeds: [thing] });
    }
  },
};

