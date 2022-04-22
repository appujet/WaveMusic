const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'playerEmpty',
  run: async (client, player) => {
    if (player.data.get('message') && !player.data.get('message').deleted)
      player.data
        .get('message')
        .delete()
        .catch(() => null);
    client.channels.cache
      .get(player.text)
      ?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. Leaving the voice channel.')
            .setTimestamp(),
        ],
      });
    player.destroy();
  },
};
