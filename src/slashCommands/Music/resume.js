const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'resume',
  description: 'Resume currently playing music',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  dj: true,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    const player = client.manager.players.get(interaction.guild.id);
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }

    const emojiresume = client.emoji.resume;

    if (!player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojiresume} The player is already **resumed**.`);
      return interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    }

    await player.pause(false);

    let thing = new MessageEmbed()
      .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
  },
};
