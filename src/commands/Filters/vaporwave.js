const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'vaporwave',
  category: 'Filters',
  aliases: ['vw'],
  description: 'Set VaporWave Filter.',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] });
    }
    const emojiequalizer = client.emoji.filter;
    await player.player.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      equalizer: [
        { band: 1, gain: 0.3 },
        { band: 0, gain: 0.3 },
      ],
      timescale: { pitch: 0.5 },
      tremolo: { depth: 0.3, frequency: 14 },
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Equalizer Mode Is Enabled`);
    return message.reply({ embeds: [thing] });
  },
};
