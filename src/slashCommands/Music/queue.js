const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const load = require('lodash');

module.exports = {
  name: 'queue',
  description: 'To see the whole server queue.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  options: [
    {
      name: 'page',
      type: 'NUMBER',
      required: false,
      description: `The queue page number.`,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply().catch(() => {});

    const player = client.manager.players.get(interaction.guildId);
    
    if (!player.queue)
      return await interaction
        .editReply({
          content: `Nothing is playing right now.`,
        })
        .catch(() => {});

    if (player.queue.length === '0' || !player.queue.length) {
      const embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(
          `**Now playing** [${player.current.title}](${player.current.uri}) • \`[ ${
            player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)
          } ]\` • [${player.current.requester}]`,
        );
      await interaction.editReply({
        embeds: [embed],
      });
    } else {
      const mapping = player.queue.map(
        (t, i) =>
          `\`[ ${++i} ]\` • [${t.title}](${t.uri}) • \`[ ${
            t.isStream ? '[**◉ LIVE**]' : convertTime(t.length)
          } ]\` • [${t.requester}]`,
      );

      const chunk = load.chunk(mapping, 10);
      const pages = chunk.map((s) => s.join('\n'));
      let page = interaction.options.getNumber('page');
      if (!page) page = 0;
      if (page) page = page - 1;
      if (page > pages.length) page = 0;
      if (page < 0) page = 0;

      if (player.queue.length < 11) {
        const embed2 = new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(
            `**Now playing**\n[${player.current.title}](${player.current.uri}) • \`[ ${
              player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)
            } ]\` • [${player.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
          )
          .setFooter({
            text: `Page ${page + 1}/${pages.length}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setThumbnail(
            `${
              player.current.thumbnail
                ? player.current.thumbnail
                : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
            }`,
          )
          .setTitle(`${interaction.guild.name} Queue`);
        await interaction.editReply({
            embeds: [embed2],
          })
          .catch(() => {});
      } else {
         const embed3 = new MessageEmbed()
           .setColor(client.embedColor)
           .setDescription(
             `**Now playing**\n[${player.current.title}](${player.current.uri}) • \`[ ${
               player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)
             } ]\` • [${player.current.requester}]\n\n **Queued Songs**\n${pages[page]}`,
           )
           .setFooter({
             text: `Page ${page + 1}/${pages.length}`,
             iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
           })
           .setThumbnail(
             `${
               player.current.thumbnail
                 ? player.current.thumbnail
                 : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
             }`,
           )
           .setTitle(`${interaction.guild.name} Queue`);

        const but1 = new MessageButton()
          .setCustomId('queue_cmd_but_1_app')
          .setEmoji('⏭️')
          .setStyle('PRIMARY');

        const dedbut1 = new MessageButton()
          .setDisabled(true)
          .setCustomId('queue_cmd_ded_but_1_app')
          .setEmoji('⏭️')
          .setStyle('SECONDARY');

        const but2 = new MessageButton()
          .setCustomId('queue_cmd_but_2_app')
          .setEmoji('⏮️')
          .setStyle('PRIMARY');

        const dedbut2 = new MessageButton()
          .setDisabled(true)
          .setCustomId('queue_cmd_ded_but_2_app')
          .setEmoji('⏮️')
          .setStyle('SECONDARY');

        const but3 = new MessageButton()
          .setCustomId('queue_cmd_but_3_app')
          .setEmoji('⏹️')
          .setStyle('DANGER');

        const dedbut3 = new MessageButton()
          .setDisabled(true)
          .setCustomId('queue_cmd_ded_but_3_app')
          .setEmoji('⏹️')
          .setStyle('SECONDARY');

        await interaction
          .editReply({
            embeds: [embed3],
            components: [new MessageActionRow().addComponents([but2, but3, but1])],
          })
          .catch(() => {});

        const collector = interaction.channel.createMessageComponentCollector({
          filter: (b) => {
            if (b.user.id === interaction.user.id) return true;
            else
              return b
                .reply({
                  content: `Only **${interaction.user.tag}** can use this button, if you want then you've to run the command again.`,
                })
                .catch(() => {});
          },
          time: 60000 * 5,
          idle: 30e3,
        });

        collector.on('collect', async (button) => {
          if (button.customId === 'queue_cmd_but_1_app') {
            await button.deferUpdate().catch(() => {});
            page = page + 1 < pages.length ? ++page : 0;

            const embed4 = new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `**Now playing**\n[${player.current.title}](${player.current.uri}) • \`[ ${
                  player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)
                } ]\` • [${player.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
              )
              .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL:interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(
                `${
                  player.current.thumbnail
                    ? player.current.thumbnail
                    : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
                }`,
              )
              .setTitle(`${interaction.guild.name} Queue`);

            await interaction.editReply({
              embeds: [embed4],
              components: [new MessageActionRow().addComponents([but2, but3, but1])],
            });
          } else if (button.customId === 'queue_cmd_but_2_app') {
            await button.deferUpdate().catch(() => {});
            page = page > 0 ? --page : pages.length - 1;

            const embed5 = new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `**Now playing**\n[${player.current.title}](${player.current.uri}) • \`[ ${
                  player.current.isStream ? '[**◉ LIVE**]' : convertTime(player.current.length)
                } ]\` • [${player.current.requester}]\n\n**Queued Songs**\n${pages[page]}`,
              )

              .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL:interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(
                `${
                  player.current.thumbnail
                    ? player.current.thumbnail
                    : `https://img.youtube.com/vi/${player.current.identifier}/hqdefault.jpg`
                }`,
              )
              .setTitle(`${interaction.guild.name} Queue`);
            await interaction
              .editReply({
                embeds: [embed5],
                components: [new MessageActionRow().addComponents([but2, but3, but1])],
              })
              .catch(() => {});
          } else if (button.customId === 'queue_cmd_but_3_app') {
            await button.deferUpdate().catch(() => {});
            await collector.stop();
          } else return;
        });

        collector.on('end', async () => {
          await interaction.editReply({
            embeds: [embed3],
            components: [new MessageActionRow().addComponents([dedbut2, dedbut3, dedbut1])],
          });
        });
      }
    }
  },
};
