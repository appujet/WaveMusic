const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  category: 'Music',
  description: 'To skip the current playing song.',
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
      return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }

    // if (player.queue.size == 0) {
    //   let noskip = new MessageEmbed()
    //     .setColor(client.embedColor)
    //     .setDescription(`No more songs left in the queue to skip.`);
    //   return message.reply({ embeds: [noskip] });
    // }

    await player.skip();
    player.paused = false;

    const emojiskip = client.emoji.skip;


    let thing = new MessageEmbed()
      .setDescription(`${emojiskip} **Skipped**\n[${player.queue.current.title}](${player.queue.current.uri})`)
      .setColor(client.embedColor);
    return message.reply({ embeds: [thing] }).then((msg) => {
      setTimeout(() => {
        msg.delete();
      }, 5000);
    });
  },
};
