const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: 'karaoke',
  category: 'Filters',
  aliases: ['distort'],
  description: 'Set Karaoke Filter',
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
    const emojiequalizer = message.client.emoji.filter;

    await player.player.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      karaoke: {
        level: 1.0,
        monoLevel: 1.0,
        filterBand: 220.0,
        filterWidth: 100.0,
      },
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} Karaoke Mode Is Enabled.`);
    return message.reply({ embeds: [thing] });
  },
};