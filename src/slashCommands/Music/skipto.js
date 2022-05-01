const { CommandInteraction, Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skipto',
  description: 'Forward song',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'number',
      description: 'select a song number',
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
    const args = interaction.options.getNumber('number');
    const player = client.manager.players.get(interaction.guildId);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return await interaction.editReply({ embeds: [thing] });
    }

    const position = Number(args);

    if (!position || position < 0 || position > player.queue.size) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Usage: ${prefix}volume <Number of song in queue>`);
      return await interaction.editReply({ embeds: [thing] });
    }
    if (args[0] == 1) player.player.stopTrack();
    player.queue.splice(0, position - 1);
    await player.player.stopTrack();

    const emojijump = client.emoji.jump;

    let thing = new MessageEmbed()
      .setDescription(`${emojijump} Forward **${position}** Songs`)
      .setColor(client.embedColor);
    return await interaction.editReply({ embeds: [thing] });
  },
};
