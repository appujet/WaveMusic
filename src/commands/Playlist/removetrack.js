const { MessageEmbed } = require('discord.js');
const db = require('../../schema/playlist');

module.exports = {
  name: 'removetrack',
  aliases: ['plremovet'],
  category: 'Playlist',
  description: 'Removetrack from your saved Playlists.',
  args: false,
  usage: '<playlist name> <track number>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {
    const Name = args[0];
    const data = await db.findOne({ UserId: message.author.id, PlaylistName: Name });
    if (!data) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    if (data.length == 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(`You don't have a playlist with **${Name}** name`),
        ],
      });
    }
    const Options = args[1];
    if (!Options || isNaN(Options)) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `You didn't entered track number (the Track you want to remove (ID OF IT))\nSee all your Tracks: ${prefix}info ${Name}`,
            ),
        ],
      });
    }
    let tracks = data.Playlist;
    if (Number(Options) >= tracks.length || Number(Options) < 0) {
      return message.reply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `Your provided track number is out of Range (\`0\` - ${
                tracks.length - 1
              })\nSee all your Tracks: \`${prefix}info\` showdetails ${Name}`,
            ),
        ],
      });
    }
    await db.updateOne(
      {
        UserId: message.author.id,
        PlaylistName: Name,
      },
      {
        $pull: {
          Playlist: data.Playlist[Options],
        },
      },
    );
    const embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setDescription(`Removed **${tracks[Options].title}** from \`${Name}\``);
    return message.channel.send({ embeds: [embed] });
  },
};
