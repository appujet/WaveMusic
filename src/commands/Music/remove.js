const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'remove',
  category: 'Music',
  description: 'Remove song from the queue',
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

    const position = Number(args[0]) - 1;
    if (position > player.queue.length) {
      const number = position + 1;
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.length}`);
      return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }

    const song = player.queue[position];

    await player.queue.splice(position, 1);

    const emojieject = client.emoji.remove;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`);
    return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
  },
};
