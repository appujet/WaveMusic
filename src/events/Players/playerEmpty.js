const { MessageEmbed } = require('discord.js');
const db = require("../../schema/setup");
const db2 = require("../../schema/autoReconnect");
const { autoplay } = require("../../utils/functions");

module.exports = {
  name: 'playerEmpty',
  run: async (client, player) => {
    if (player.data.get("autoplay")) {
      player.previous = player.data.get("autoplaySystem");
      return autoplay(player);
    }
    let guild = client.guilds.cache.get(player.guild);
    if (!guild) return;
    const data = await db.findOne({ Guild: guild.id });
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    if (!channel) return;

    let message;

    try {

      message = await channel.messages.fetch(data.Message, { cache: true });

    } catch (e) { };

    if (!message) return;
    await message.edit({ embeds: [new MessageEmbed().setColor(client.embedColor).setTitle(`Nothing playing right now in this server!`).setDescription(`[Invite](${client.config.links.invite}) - [Support Server](${client.config.links.support})`).setImage(client.config.links.bg)] }).catch(() => { });
    if (player.data.get('message') && !player.data.get('message').deleted) player.data.get('message').delete().catch(() => null);
    const TwoFourSeven = await db2.findOne({ Guild: player.guild })

    if (TwoFourSeven) {
      return client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is enable i am not Leaving the voice channel.')
            .setTimestamp(),
        ],
      }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
    } else if (!TwoFourSeven)
      client.channels.cache.get(player.text)?.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription('Queue ended. 24/7 is disable i am Leaving the voice channel.')
            .setTimestamp(),
        ],
      }).then(msg => { setTimeout(() => { msg.delete() }, 10000) });
    player.destroy()
  },
};
