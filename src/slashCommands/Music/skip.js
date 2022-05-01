const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skip',
  description: 'To skip a song/track from the queue.',
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String} color
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }
    if (player.queue.length == 0) {
      let noskip = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`No more songs left in the queue to skip.`);
      return interaction.editReply({ embeds: [noskip] });
    }

    await player.player.stopTrack();

    const emojiskip = client.emoji.skip;

    let thing = new MessageEmbed()
      .setDescription(`${emojiskip} **Skipped**\n[${player.current.title}](${player.current.uri})`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] });
  },
};
