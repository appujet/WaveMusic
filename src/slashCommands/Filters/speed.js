const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'speed',
  description: 'Sets Speed Filter.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'input',
      description: 'The Filters input (on or off).',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'on',
          value: 'on',
        },
        {
          name: 'off',
          value: 'off',
        },
      ],
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
    const input = interaction.options.getString('input');
    const player = client.manager.players.get(interaction.guild.id);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }
    const emojiequalizer = interaction.client.emoji.filter;
    if (input === 'off') {
      await player.player.clearFilters();
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiequalizer} Speed Mode Is \`OFF\``),
        ],
      });
    } else if (input === 'on') {
      await player.player.setFilters({
        op: 'filters',
        guildId: interaction.guild.id,
        timescale: {
          speed: 1.501,
          pitch: 1.245,
          rate: 1.921,
        },
      });
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiequalizer} Speed Mode Is \`ON\``),
        ],
      });
    }
  },
};
