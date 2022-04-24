const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    const emojipause = client.emoji.pause;
    const emojiresume = client.emoji.resume;
    const emojiskip = client.emoji.skip;
    const volumeEmoji = client.emoji.volumehigh;
    const previousEmoji = client.emoji.previous;
    if (interaction.isButton())  {
      
    if(!interaction.member.voice.channel)  return;
    
    if(interaction.guild.me.voice.channel && interaction.guild.me.voice.channelId !== interaction.member.voice.channelId)  return;
    
    const player = client.manager.players.get(interaction.guild.id);
    if(!player) return;
    await interaction.deferReply({
      ephemeral: false,
    });
      if (interaction.customId === `${player.guild}pause`) {
        if (player.player.paused) {
          await player.setPaused(false);
          await interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${emojiresume} [${player.current.title}](${player.current.uri}) is now unpaused/resumed.`,
                )
                .setColor(client.embedColor),
            ],
          }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        } else {
          await player.setPaused(true);
          await interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setDescription(
                  `${emojipause} [${player.current.title}](${player.current.uri}) is now paused.`,
                )
                .setColor(client.embedColor),
            ],
          }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        }
      } else if (interaction.customId === `${player.guild}skip`) {
        if (player.queue.length === 0) {
          let noskip = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`No more songs left in the queue to skip.`);
        return interaction.editReply({ embeds: [noskip] }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        }
         await player.player.stopTrack();
          await interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${emojiskip} Skipped - [${player.current.title}](${player.current.uri})`,
              )
              .setColor(client.embedColor),
          ],
        }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
            
        
    }
      else if (interaction.customId === `${player.guild}previous`) {
        if (!player.previous) {
          let noskip = new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`No Previous song found`);
          interaction.editReply({ embeds: [noskip] }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        }
        if (player.previous) {
          player.queue.unshift(player.previous);
          await player.player.stopTrack();
        }
       await interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setDescription(
                `${previousEmoji} Previous [${player.previous.title}](${player.previous.uri})`
              )
              .setColor(client.embedColor)
          ],
        }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
      } else if (interaction.customId === `${player.guild}voldown`) {
        let amount = Number(player.player.filters.volume * 100 - 10);
        if (amount <= 10)
          return await interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`Volume Cannot Decread \`[ 10% ]\``)
            ],
          }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        await player.setVolume(amount / 1);
        interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``,
              ),
          ],
        }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
      } else if (interaction.customId === `${player.guild}volup`) {
        let amount = Number(player.player.filters.volume * 100 + 10);
        if (amount >= 100)
          return await interaction.editReply({
            embeds: [
              new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`Volume Cannot Exceed \`[ 100% ]\``),
            ],
          }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
        await player.setVolume(amount / 1);
        interaction.editReply({
          embeds: [
            new MessageEmbed()
              .setColor(client.embedColor)
              .setDescription(
                `${volumeEmoji} Volume set to: \`[ ${player.player.filters.volume * 100}% ]\``,
              ),
          ],
        }).then(msg => { setTimeout(() => { msg.delete() }, 3000) });
      }
    }
}
  };
