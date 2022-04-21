const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'earrape',
  category: 'Filters',
  aliases: ['er'],
  description: 'Set EarRape Filter',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] });
    }
    const emojiequalizer = client.emoji.filter;
    await player.player.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      equalizer: [
        { band: 0, gain: 0.25 },
        { band: 1, gain: 0.5 },
        { band: 2, gain: -0.5 },
        { band: 3, gain: -0.25 },
        { band: 4, gain: 0 },
        { band: 6, gain: -0.025 },
        { band: 7, gain: -0.0175 },
        { band: 8, gain: 0 },
        { band: 9, gain: 0 },
        { band: 10, gain: 0.0125 },
        { band: 11, gain: 0.025 },
        { band: 12, gain: 0.375 },
        { band: 13, gain: 0.125 },
        { band: 14, gain: 0.125 },
      ],
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} EarRape Mode Is Enabled`);

    return message.reply({ embeds: [thing] });
  },
};
