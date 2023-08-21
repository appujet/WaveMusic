const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
  name: 'clear',
  aliases: ['c'],
  category: 'Music',
  description: 'Clear Music Queue',
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

    if (!player.queue) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription('There Is Nothing In The Queue');
      return message.reply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }
    const but = new MessageButton().setCustomId('cqueue').setLabel('Queue').setStyle('PRIMARY');
    const but2 = new MessageButton().setCustomId('cfilter').setLabel('Filter').setStyle('PRIMARY');
    const row = new MessageActionRow().addComponents(but, but2);

    let thing = new MessageEmbed()
      .setColor(message.client.embedColor)
      .setDescription(`Which one do you want to clear?`);
    const m = await message.reply({ embeds: [thing], components: [row] });
    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.author.username}** can use this button, if you want then you've to run the command again.`,
          });
          return false;
        }
      },
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      await m
        .edit({
          components: [
            new MessageActionRow().addComponents(but.setDisabled(true), but2.setDisabled(true)),
          ],
        })
        .catch(() => {});
    });
    collector.on('collect', async (b) => {
      if (!b.deferred) await b.deferUpdate();
      if (b.customId === 'cqueue') {
         if (!player.queue[0]) {
         return await m.edit({ embeds: [new MessageEmbed().setDescription('There is Nothing in the Queue').setColor(message.client.embedColor)], components: [] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }
        await player.queue.clear();
        return await m.reply({ embeds: [new MessageEmbed().setDescription('Cleared the Queue.').setColor(message.client.embedColor)], components: [] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
      }

      if (b.customId === 'cfilter') {
        player.shoukaku.clearFilters();
        return await m.edit({ embeds: [new MessageEmbed().setDescription('Cleared the Filter.').setColor(message.client.embedColor)], components: [] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
      }
    });
  },
};
