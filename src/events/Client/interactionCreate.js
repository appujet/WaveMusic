const { MessageEmbed, Permissions } = require('discord.js');
const db = require('../../schema/setup');
const db2 = require("../../schema/dj");

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const SlashCommands = client.slashCommands.get(interaction.commandName);
      if (!SlashCommands) return;

      const embed = new MessageEmbed().setColor('RED');

          if (!interaction.guild.members.cache.get(client.user.id).permissionsIn(interaction.channel).has(Permissions.FLAGS.SEND_MESSAGES)) {
            embed.setDescription(`I don't have **Send_Messages** permission in Channel: <#${interaction.channelId}>`)
            if (interaction.replied) {
                return await interaction.user.send({
                    embeds: [embed], ephemeral: true
                }).catch(() => { });
            } else {
                return await interaction.user.send({
                    embeds: [embed], ephemeral: true
                }).catch(() => { });
            }
        }

        if (!interaction.guild.members.cache.get(client.user.id).permissionsIn(interaction.channel).has(Permissions.FLAGS.EMBED_LINKS)) {
            embed.setDescription( `I don't have **Embed_Links** permission in <#${interaction.channelId}>`);
            if (interaction.replied) {
                return await interaction.editReply({
                    embeds: [embed], ephemeral: true
                }).catch(() => { });
            } else {
                return await interaction.reply({
                    embeds: [embed], ephemeral: true
                }).catch(() => { });
            }
        }

      if (!interaction.guild.members.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

      const player = interaction.client.manager.players.get(interaction.guildId);
      if (SlashCommands.player && !player) {
        return await interaction.reply({
          content: `There is no player for this guild.`,
          ephemeral: true,
        })
          .catch(() => { });
      }
      if (!interaction.member.permissions.has(SlashCommands.userPrams || [])) {
        return await interaction.reply({
          content: `You Need Permission to Work this \`${SlashCommands.userPrams.join(', ')}\``,
          ephemeral: true,
        });
      }
      if (!interaction.guild.members.me.permissions.has(SlashCommands.botPrams || [])) {
        return await interaction.reply({
          content: `I Need this \`${SlashCommands.botPrams.join(
            ', ',
          )}\` Permission to Work this command!`,
          ephemeral: true,
        });
      }
      if (SlashCommands.inVoiceChannel && !interaction.member.voice.channel) {
        return await interaction
          .reply({
            content: `You must be in a voice channel!`,
            ephemeral: true,
          })
          .catch(() => { });
      }
      if (SlashCommands.sameVoiceChannel) {
        if (interaction.guild.members.me.voice.channel) {
          if (interaction.guild.members.me.voice.channelId !== interaction.member.voice.channelId) {
            return await interaction
              .reply({
                content: `You must be in the same channel as ${interaction.client.user}`,
                ephemeral: true,
              })
              .catch(() => { });
          }
        }
      }
      if (SlashCommands.dj) {
        let data = await db2.findOne({ Guild: interaction.guildId })
        let perm = Permissions.FLAGS.MANAGE_GUILD;
        if (data) {
          if (data.Mode) {
            let pass = false;
            if (data.Roles.length > 0) {
              interaction.member.roles.cache.forEach((x) => {
                let role = data.Roles.find((r) => r === x.id);
                if (role) pass = true;
              });
            };
            if (!pass && !interaction.member.permissions.has(perm)) return await interaction.reply({ content: `You don't have permission or dj role to use this command`, ephemeral: true })
          };
        };
      };
      try {
        await SlashCommands.run(client, interaction);
      } catch (error) {
        if (interaction.replied) {
          await interaction
            .editReply({
              content: `An unexcepted error occured.`,
            })
            .catch(() => { });
        } else {
          await interaction
            .followUp({
              ephemeral: true,
              content: `An unexcepted error occured.`,
            })
            .catch(() => { });
        }
        console.error(error);
      }
    }
    if (interaction.isButton()) {
      let data = await db.findOne({ Guild: interaction.guildId });
      if (data && interaction.channelId === data.Channel && interaction.message.id === data.Message) return client.emit("playerButtons", interaction, data);
    };
  }
};
