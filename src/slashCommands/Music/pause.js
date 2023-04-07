const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'pause',
  description: 'Pause the currently playing music',
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

    const player = client.manager.players.get(interaction.guildId);

    if (!player.queue.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }

    const emojipause = client.emoji.pause;

    if (player.paused) {
      let thing = new MessageEmbed()
        .setColor('RED')
        .setDescription(`${emojipause} The player is already paused.`);
      return interaction.editReply({ embeds: [thing] });
    }

    await player.pause(true);

    const song = player.queue.current;

    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojipause} **Paused**\n[${song.title}](${song.uri})`);
    return interaction.editReply({ embeds: [thing] });
  },
};
