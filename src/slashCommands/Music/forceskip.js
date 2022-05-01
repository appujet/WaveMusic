const { MessageEmbed, CommandInteraction, Client } = require('discord.js');

module.exports = {
  name: 'forceskip',
  description: 'To force skip the current playing song.',
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
    const song = player.current;

    await player.player.stopTrack();

    const emojiskip = message.client.emoji.skip;

    let thing = new MessageEmbed()
      .setDescription(`${emojiskip} Skipped [${song.title}](${song.uri})`)
      .setColor(client.embedColor);
    return interaction.editReply({ embeds: [thing] });
  },
};
