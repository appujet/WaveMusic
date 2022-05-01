const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'bassboost',
  description: 'Sets BassBoost Filter.',
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
            .setDescription(`${emojiequalizer} BassBoost Mode Is \`OFF\``),
        ],
      });
    } else if (input === 'on') {
      await player.player.setFilters({
        op: 'filters',
        guildId: interaction.guild.id,
        equalizer: [
          { band: 0, gain: 0.1 },
          { band: 1, gain: 0.1 },
          { band: 2, gain: 0.05 },
          { band: 3, gain: 0.05 },
          { band: 4, gain: -0.05 },
          { band: 5, gain: -0.05 },
          { band: 6, gain: 0 },
          { band: 7, gain: -0.05 },
          { band: 8, gain: -0.05 },
          { band: 9, gain: 0 },
          { band: 10, gain: 0.05 },
          { band: 11, gain: 0.05 },
          { band: 12, gain: 0.1 },
          { band: 13, gain: 0.1 },
        ],
      });
      return await interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`${emojiequalizer} BassBoost Mode Is \`ON\``),
        ],
      });
    }
  },
};
