const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'shuffle',
  category: 'Music',
  description: 'Shuffle queue',
  args: false,
  usage: '',
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
    const emojishuffle = client.emoji.shuffle;

    let thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Shuffled the queue`)
      .setColor(client.embedColor);
    await player.queue.shuffle();
    return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) })
    .catch((error) => client.logger.log(error, 'error'));
  },
};
