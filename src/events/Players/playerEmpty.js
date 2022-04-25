const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'playerEmpty',
  run: async (client, player) => {
    if (player.data.get('message') && !player.data.get('message').deleted) player.data.get('message').delete().catch(() => null);
    const TwoFourSeven = player.data.get('247');
    if (TwoFourSeven) {
      return client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is enable i am not Leaving the voice channel.')
            .setTimestamp(),
        ],
      });
    } else if (!TwoFourSeven)
      client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is disable i am Leaving the voice channel.')
            .setTimestamp(),
        ],
      });
    player.destroy()
  },
};
