const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Information',
  aliases: ['h'],
  description: 'Return all commands, or one specific command',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {
    const embed = new MessageEmbed()
      .setTitle(`${client.user.username} Help`)
      .setDescription(
        ` Hello **<@${message.author.id}>**, I am <@${client.user.id}>.  \n\nA Discord Music Bot With Many Awesome Features, \nSupport Many Sources \n\n\`🎵\`•Music\n\`🗒️\`•Playlist\n\`ℹ️\`•information\n\`⚙️\`•Config\n\`🎙️\`•Filters\n\n *Choose an category below button to see commands* \n\n`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });

    let but1 = new MessageButton().setCustomId('home').setLabel('Home').setStyle('SUCCESS');

    let but2 = new MessageButton().setCustomId('music').setLabel('Music').setStyle('PRIMARY');

    let but3 = new MessageButton().setCustomId('pl').setLabel('Playlist').setStyle('PRIMARY');

    let but4 = new MessageButton().setCustomId('info').setLabel('Info').setStyle('PRIMARY');

    let but5 = new MessageButton().setCustomId('config').setLabel('Config').setStyle('PRIMARY');

    let but6 = new MessageButton().setCustomId('filters').setLabel('Filters').setStyle('PRIMARY');

    const row = new MessageActionRow().addComponents(but1, but2, but3);
    const row1 = new MessageActionRow().addComponents(but4, but5, but6);

    let _commands;
    let editEmbed = new MessageEmbed();

    const m = await message.reply({
      embeds: [embed],
      components: [row, row1],
    });

    const collector = m.createMessageComponentCollector({
      filter: (b) => {
        if (b.user.id === message.author.id) return true;
        else {
          b.reply({
            ephemeral: true,
            content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`,
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
            new MessageActionRow().addComponents(
              but1.setDisabled(true),
              but2.setDisabled(true),
              but3.setDisabled(true),
              but4.setDisabled(true),
              but5.setDisabled(true),
              but6.setDisabled(true),
            ),
          ],
        })
        .catch(() => {});
    });
    collector.on('collect', async (b) => {
      if (!b.deferred) await b.deferUpdate();
      if (b.customId === 'home') {
        if (!m) return;
        return await m.edit({
          embeds: [embed],
          components: [row, row1],
        });
      }
      if (b.customId === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Music Commands')
          .setFooter({ text: `Total ${_commands.length} music commands.` });
        if (!m) return;
        return await m.edit({
          embeds: [editEmbed],
          components: [row, row1],
        });
      }
      if (b.customId === 'pl') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\``);
        editEmbed
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Playlist Commands')
          .setFooter({ text: `Total ${_commands.length} playlist commands.` });
        if (!m) return;
        return await m.edit({
          embeds: [editEmbed],
          components: [row, row1],
        });
      }
      if (b.customId == 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\``);
        editEmbed
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Information Commands')
          .setFooter({ text: `Total ${_commands.length} Information commands.` });
        return await m.edit({
          embeds: [editEmbed],
          components: [row, row1],
        });
      }
      if (b.customId == 'config') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Config Commands')
          .setFooter({ text: `Total ${_commands.length} Settings commands.` });
        return await m.edit({
          embeds: [editEmbed],
          components: [row, row1],
        });
      }
      if (b.customId == 'filters') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Config Commands')
          .setFooter({ text: `Total ${_commands.length} Filters commands.` });
        return await m.edit({
          embeds: [editEmbed],
          components: [row, row1],
        });
      }
    });
  },
};
