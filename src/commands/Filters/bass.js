const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bass',
  category: 'Filters',
  aliases: ['bas'],
  description: 'Set Bass Filter',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = message.client.manager.players.get(message.guild.id);

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] });
    }
    const emojiequalizer = message.client.emoji.filter;

<<<<<<< HEAD
    await player.player.setFilters({
      op: 'filters',
      guildId: message.guild.id,
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
=======
    await player.player.setFilters({});
>>>>>>> 605861bc95edd98cc606a5edc12ec49253982074
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Bass Mode Is Enabled.`);
    return message.reply({ embeds: [thing] });
  },
};
