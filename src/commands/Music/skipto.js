const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skipto',
  aliases: ['jump'],
  category: 'Music',
  description: 'Forward song',
  args: true,
  usage: '<Number of song in queue>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const player = client.manager.players.get(message.guild.id);

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 6000) }).catch(() => { });
    }

    const position = Number(args[0]);

    if (!position || position < 0 || position > player.queue.length) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`Usage: ${message.client.prefix}skipto <Number of song in queue>`);
      return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }
    if (args[0] == 1) player.skip();

    player.queue.splice(0, position - 1);
    await player.skip();
    player.paused = false;

    const emojijump = client.emoji.jump;

    let thing = new MessageEmbed()
      .setDescription(`${emojijump} Forward **${position}** Songs`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
  },
};
