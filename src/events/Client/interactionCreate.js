const { Permissions } = require('discord.js');
const db = require('../../schema/setup');
const db2 = require("../../schema/dj");

module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
      const SlashCommands = client.slashCommands.get(interaction.commandName);
      if (!SlashCommands) return;

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES))
        return await interaction.user.dmChannel
          .send({
            content: `I don't have **\`SEND_interactionS\`** permission in <#${interaction.channelId}> to execute this **\`${SlashCommands.name}\`** command.`,
          })
          .catch(() => { });

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS))
        return await interaction
          .reply({
            content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${SlashCommands.name}\`** command.`,
            ephemeral: true,
          })
          .catch(() => { });
      const player = interaction.client.manager.players.get(interaction.guildId);
      if (SlashCommands.player && !player) {
        return await interaction.reply({
          content: `There is no player for this guild.`,
          ephemeral: true,
        })
          .catch(() => { });
      }
      if (!interaction.member.permissions.has(SlashCommands.botPrams || [])) {
        return await interaction.reply({
          content: `I Need Permission to Work this \`${SlashCommands.botPrams.join(', ')}\``,
          ephemeral: true,
        });
      }
      if (!interaction.guild.me.permissions.has(SlashCommands.userPrams || [])) {
        return await interaction.reply({
          content: `You Need this \`${SlashCommands.userPrams.join(
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
        if (interaction.guild.me.voice.channel) {
          if (interaction.guild.me.voice.channelId !== interaction.member.voice.channelId) {
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


