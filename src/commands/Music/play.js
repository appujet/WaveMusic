const { MessageEmbed, Permissions } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');

module.exports = {
  name: 'play',
  category: 'Music',
  aliases: ['p'],
  description: 'Plays audio from YouTube or Soundcloud',
  args: true,
  usage: '<YouTube URL | Video Name | Spotify URL>',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (message, args, client, prefix) => {
    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const emojiaddsong = message.client.emoji.addsong;
    const emojiplaylist = message.client.emoji.playlist;

    const { channel } = message.member.voice;

    if (
      !message.guild.me
        .permissionsIn(channel)
        .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
    )
      return message.channel.send({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const query = args.join(' ');

    const player = await client.manager.createPlayer({
      guildId: message.guild.id,
      voiceId: message.member.voice.channel.id,
      textId: message.channel.id,
      deaf: true,
    });
    const result = await player.search(query, message.author);
    if (!result.tracks.length) return message.reply({ content: 'No result was found' });
    const tracks = result.tracks;
   if (result.type === 'PLAYLIST') for (let track of tracks) player.addSong(track);
   else player.addSong(tracks[0]);
   if (!player.current) player.play();
    return message.reply(
      result.type === 'PLAYLIST'
        ? {
            embeds: [
              new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(
                  `${emojiplaylist} Queued ${tracks.length} from ${result.playlistName}`,
                ),
            ],
          }
        : {
            embeds: [
              new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`${emojiaddsong} Queued [${tracks[0].title}](${tracks[0].uri})`),
            ],
          },
    );
  },
};
