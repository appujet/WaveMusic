const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const { intersection } = require('lodash');

module.exports = {
  name: 'remove',
  description: 'Remove song from the queue',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'number',
      description: 'Number of song in queue',
      required: true,
      type: 'NUMBER',
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

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }

    const pos = interaction.options.getNumber("number");
    const position = Number(pos) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return interaction.editReply({ embeds: [thing] });
    }

    const song = player.queue[position];

    await player.queue.splice(position, 1);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`);
    return interaction.editReply({ embeds: [thing] });
  },
};
