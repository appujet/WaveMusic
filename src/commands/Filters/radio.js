const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'radio',
  category: 'Filters',
  aliases: ['radio'],
  description: 'Set Radio Filter',
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
        { band: 0, gain: -0.25 },
        { band: 1, gain: 0.48 },
        { band: 2, gain: 0.59 },
        { band: 3, gain: 0.72 },
        { band: 4, gain: 0.56 },
        { band: 5, gain: 0.15 },
        { band: 6, gain: -0.24 },
        { band: 7, gain: -0.24 },
        { band: 8, gain: -0.16 },
        { band: 9, gain: -0.16 },
        { band: 10, gain: 0 },
        { band: 11, gain: 0 },
        { band: 12, gain: 0 },
        { band: 13, gain: 0 },
        { band: 14, gain: 0 },
      ],
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Radio Mode Is Enabled.`);
    return message.reply({ embeds: [thing] });
  },
};
