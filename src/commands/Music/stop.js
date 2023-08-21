const { MessageEmbed } = require('discord.js');
const Wait = require('util').promisify(setTimeout);

module.exports = {
  name: 'stop',
  category: 'Music',
  description: 'Stops the music',
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
    
    player.queue.clear();
    player.data.delete("autoplay")
    player.loop = 'none';
    player.playing = false;
    player.paused = false;
    await player.skip();
    Wait(500);
    const emojistop = client.emoji.stop;
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojistop} Stopped the music`);
    message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
  },
};
