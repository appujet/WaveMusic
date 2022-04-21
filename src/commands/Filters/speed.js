const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'speed',
  category: 'Filters',
  aliases: ['sped'],
  description: 'Set Speed Filter',
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
      timescale: {
        speed: 1.501,
        pitch: 1.245,
        rate: 1.921,
      },
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Speed Mode Is Enabled`);

    return message.reply({ embeds: [thing] });
  },
};
