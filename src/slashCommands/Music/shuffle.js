const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: 'Shuffle queue',
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

    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription('There is no music playing.');
      return interaction.editReply({ embeds: [thing] });
    }
    const emojishuffle = client.emoji.shuffle;

    let thing = new MessageEmbed()
      .setDescription(`${emojishuffle} Shuffled the queue`)
      .setColor(client.embedColor);
    await player.shuffle();
    return interaction
      .editReply({ embeds: [thing] })
      .catch((error) => client.logger.log(error, 'error'));
  },
};
