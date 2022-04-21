const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'savequeue',
  aliases: ['plsaveq'],
  category: 'Playlist',
  description: 'Save current playing queue in your playlist.',
  args: false,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const player = client.manager.players.get(message.guild.id);
    if (!player.current) {
      let thing = new MessageEmbed().setColor('RED').setDescription(`There is no music playing.`);
      return message.reply({ embeds: [thing] });
    }
    const data = await db.find({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Playlist not found. Please enter the correct playlist name`),
        ],
      });
    }
    const song = player.current;
    const tracks = player.queue;

    let oldSong = data.Playlist;
    if (!Array.isArray(oldSong)) oldSong = [];
    const newSong = [];
    if (player.current) {
      newSong.push({
        title: song.title,
        uri: song.uri,
        author: song.author,
        duration: song.length,
      });
    }
    for (const track of tracks)
      newSong.push({
        title: track.title,
        uri: track.uri,
        author: track.author,
        duration: track.length,
      });
    const playlist = oldSong.concat(newSong);
    await db.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $set: {
          Playlist: playlist,
        },
      },
    );
    const embed = new MessageEmbed()
      .setDescription(`**Added** \`${playlist.length - oldSong.length}\`song in \`${Name}\``)
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] });
  },
};
