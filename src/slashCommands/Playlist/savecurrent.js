const { MessageEmbed, CommandInteraction, Client } = require("discord.js");
const db = require("../../schema/playlist");

module.exports = {
  name: 'savecurrent',
  description: 'Add current playing song in your saved playlist.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'name',
      description: 'Playlist Name',
      required: true,
      type: 'STRING',
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({});

    const Name = interaction.options.getString('name');
    const data = await db.findOne({ UserId: interaction.member.user.id, PlaylistName: Name });

    const player = client.manager.players.get(interaction.guildId);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription(i18n.__('player.nomusic'));
      return interaction.editReply({ embeds: [thing] });
    }
    if (!data) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    const song = player.current;
    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    oldSong.push({
      title: song.title,
      uri: song.uri,
      author: song.author,
      duration: song.length,
    });
    await db.updateOne(
      {
        UserId: interaction.user.id,
        PlaylistName: Name,
      },
      {
        $push: {
          Playlist: {
            title: song.title,
            uri: song.uri,
            author: song.author,
            duration: song.length,
          },
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Added [${song.title.substr(0, 256)}](${song.uri}) in \`${Name}\``);
    return interaction.editReply({ embeds: [embed] });
  },
};
