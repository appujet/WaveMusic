const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'party',
  category: 'Filters',
  aliases: ['paty'],
  description: 'Set Party Filter',
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
        { band: 0, gain: -1.16 },
        { band: 1, gain: 0.28 },
        { band: 2, gain: 0.42 },
        { band: 3, gain: 0.5 },
        { band: 4, gain: 0.36 },
        { band: 5, gain: 0 },
        { band: 6, gain: -0.3 },
        { band: 7, gain: -0.21 },
        { band: 8, gain: -0.21 },
      ],
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Party Mode Is Enabled`);
    return message.reply({ embeds: [thing] });
  },
};
