const { MessageEmbed, CommandInteraction, Client } = require('discord.js');
const Wait = require('util').promisify(setTimeout);
module.exports = {
  name: 'stop',
  description: 'Stops the music',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  dj: true,
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
    player.queue.length = 0;
    player.data.delete("autoplay")
    player.repeat = 'off';
    player.stopped = true;
    await player.player.stopTrack();
    Wait(500);
    const emojistop = client.emoji.stop;
    let thing = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`${emojistop} Stopped the music`);
    interaction.editReply({ embeds: [thing] });
  },
};
