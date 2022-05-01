const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'load',
  aliases: ['plload'],
  category: 'Playlist',
  description: 'Play the saved Playlist.',
  args: true,
  usage: '<playlist name>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });

    let name = Name;

    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Playlist not found. Please enter the correct playlist name\n\nDo ${prefix}list To see your Playlist`,
            ),
        ],
      });
    }
    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });
    if (!player) return;
    let count = 0;
    const m = await message.reply({
      embeds: [
        new MessageEmbed()
          .setColor(client.embedColor)
          .setDescription(`Adding ${data.PlaylistName} track(s) from your playlist **${name}** to the queue.`),
      ],
    });
    for (const track of data.Playlist) {
      let s = await player.search(track.uri ? track.uri : track.title, message.author);
      if (s.type === 'PLAYLIST') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      } else if (s.type === 'TRACK') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      } else if (s.type === 'SEARCH') {
        await player.addSong(s.tracks[0]);
        if (!player.current) player.play();
        ++count;
      }
    }
    if (player && !player.current) player.destroy(message.guild.id);
    if (count <= 0 && m)
      return await m.edit({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Couldn't add any tracks from your playlist **${name}** to the queue.`),
        ],
      });
    if (m)
      return await m.edit({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`Added ${count} track(s) from your playlist **${name}** to the queue.`),
        ],
      });
  },
};
