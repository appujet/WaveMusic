const { MessageEmbed } = require("discord.js");

module.exports = {
  name: '8d',
  category: 'Filters',
  aliases: ['8D', '3d'],
  description: 'Set 8D Filter',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
<<<<<<< HEAD
    const player = message.client.manager.players.get(message.guild.id);

=======

    const player = message.client.manager.players.get(message.guild.id);

>>>>>>> 605861bc95edd98cc606a5edc12ec49253982074
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return message.reply({ embeds: [thing] });
    }
    const emojiequalizer = message.client.emoji.filter;
<<<<<<< HEAD
    await player.player.setFilters({
      op: 'filters',
      guildId: message.guild.id,
      rotation: { rotationHz: 0.2 },
    });
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} 8D Mode Is Enabled.`);
    
    return message.reply({ embeds: [thing] });
  },
};
=======

    await player.player.setFilters({});
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojiequalizer} 8D Mode Is Enabled.`);
    return message.reply({ embeds: [thing] });
  },
};
>>>>>>> 605861bc95edd98cc606a5edc12ec49253982074
