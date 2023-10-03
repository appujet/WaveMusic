const { MessageEmbed } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { progressbar } = require('../../utils/progressbar.js');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  category: 'Music',
  description: 'Show now playing song',
  args: false,
  usage: '',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  player: true,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (message, args, client, prefix) => {

    const player = client.manager.players.get(message.guild.id);
    const song = player.queue.current;

    if (!player.queue.current) {
      let thing = new MessageEmbed()
      .setColor('RED')
      .setDescription('There is no music playing.');

      return message.channel.send({ embeds: [thing] }).then(msg => { setTimeout(() => { msg.delete() }, 7000) }).catch(() => { });
    }

    const emojimusic = client.emoji.music;
    var total = song.length;
    var current = player.position;

    let embed = new MessageEmbed()
      .setDescription(`${emojimusic} **Now Playing**\n [${song.title}](${song.uri})`)
      .addFields([
        {
          name: 'Duration',
          value: `\`[ ${convertTime(total)} ]\``,
          inline: true,
        },
        {
          name: 'Author',
          value: `${player.queue.current.author}`,
          inline: true,
        },
        {
          name: 'Requested by',
          value: `[ ${song.requester} ]`,
          inline: true,
        },
        {
          name: '**Progress Bar**',
          value: `**[ ${progressbar(player)}** ] \n\`${convertTime(current)}  ${convertTime(
            total,
          )}\``,
          inline: true,
        },
      ])

      .setThumbnail(
        `${
          player.queue.current.thumbnail
            ? player.queue.current.thumbnail
            : `https://img.youtube.com/vi/${player.queue.current.identifier}/hqdefault.jpg`
        }`,
      )
      .setColor(client.embedColor);
    return message.channel.send({ embeds: [embed] }).then(msg => { setTimeout(() => { msg.delete() }, 12000) }).catch(() => { });
  },
};
