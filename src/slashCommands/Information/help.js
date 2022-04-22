const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

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
        ` Hello **<@${message.author.id}>**, I am <@${client.user.id}>.  \n\nA Discord Music Bot With Many Awesome Features, \nSupport Many Sources \n\n\`🎵\`•Music\n\`🗒️\`•Playlist\n\`ℹ️\`•information\n\`⚙️\`•Config\n\`🎙️\`•Filters\n\n *Choose an category below to see commands* \n\n`,
      )
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(client.embedColor)
      .setTimestamp()
      .setFooter({
        text: `Requested by ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      });
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('helpop')
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder('Wave Music Help')
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '🎼',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '🎙️',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: 'ℹ️',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '🗒️',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )

    const m = await message.reply({ embeds: [embed], components: [row] })

    const row2 = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId('disable_h')
          .setDisabled(true)
          .setPlaceholder(`Timeout do ${prefix}help`)
          .addOptions([
            {
              label: 'Music',
              value: 'music',
              emoji: '🎼',
            },
            {
              label: ' Filter',
              value: 'filter',
              emoji: '🎙️',
            },
            {
              label: ' Info',
              value: 'info',
              emoji: 'ℹ️',
            },
            {
              label: 'Settings',
              value: 'settings',
              emoji: '⚙️',
            },
            {
              label: 'Playlist',
              value: 'playlist',
              emoji: '🗒️',
            },
            {
              label: 'Home',
              value: 'home',
              emoji: '🏠',
            }
          ])
      )


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
      componentType: "SELECT_MENU",
      time: 60000,
      idle: 60000 / 2,
    });
    collector.on('end', async () => {
      if (!m) return;
      return m.edit({ components: [row2] }).catch(() => { });
    });

    collector.on("collect", (interaction) => {
      if (!interaction.deferred) interaction.deferUpdate();
      const options = interaction.values[0];
      let _commands;

      if (options === 'music') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Music')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Music Commands')
          .setFooter({ text: `Total ${_commands.length} Music commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'filter') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Filters')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Filter Commands')
          .setFooter({ text: `Total ${_commands.length} Filter commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'playlist') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Playlist')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Playlist Commands')
          .setFooter({ text: `Total ${_commands.length} Playlist commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'settings') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Settings')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Settings Commands')
          .setFooter({ text: `Total ${_commands.length} Settings commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }
      if (options === 'info') {
        _commands = client.commands
          .filter((x) => x.category && x.category === 'Information')
          .map((x) => `\`${x.name}\``);
        editEmbed = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(_commands.join(', '))
          .setTitle('Information Commands')
          .setFooter({ text: `Total ${_commands.length} Information commands.` });
        if (!m) return;
        return m.edit({
          embeds: [editEmbed],
          components: [row],
        });
      }

      if (options === 'home') {
        if (!m) return;
        return m.edit({
          embeds: [embed],
          components: [row],
        });
      }
    }
    )

  },
};