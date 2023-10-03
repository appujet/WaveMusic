const { CommandInteraction, Client, MessageEmbed, Permissions } = require('discord.js');
const { convertTime } = require('../../utils/convert.js');
const { defaultVol } = require("../../utils/functions.js");

module.exports = {
  name: 'play',
  description: 'To play some song.',
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  player: false,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  options: [
    {
      name: 'input',
      description: 'The search input (name/url)',
      required: true,
      type: 'STRING',
    },
  ],

  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   */

  run: async (client, interaction) => {
    await interaction.deferReply({
      ephemeral: false,
    });
    if (!interaction.guild.members.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions to execute this command! please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });
    const { channel } = interaction.member.voice;

    if (!interaction.guild.members.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK]))
      return interaction.editReply({
        embeds: [
          new MessageEmbed()
            .setColor(client.embedColor)
            .setDescription(
              `I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`,
            ),
        ],
      });

    const emojiaddsong = client.emoji.addsong;
    const emojiplaylist = client.emoji.playlist;
    let query = interaction.options.getString('input');
    let player = client.manager.players.get(interaction.guildId);

    if(!player) player = await client.manager.createPlayer({
      guildId: interaction.guildId,
      voiceId: interaction.member.voice.channelId,
      textId: interaction.channelId,
      deaf: true,
      volume: await defaultVol(interaction.guild.id)
    });

    const result = await player.search(query, { requester: interaction.user });

    if (!result.tracks.length) return interaction.editReply({ content: 'No result was found' }).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
    const tracks = result.tracks;

    if (result.type === "PLAYLIST") for (let track of result.tracks) player.queue.add(track);
    else player.queue.add(result.tracks[0]);


    if (!player.playing && !player.paused) player.play();

    return interaction.editReply(
      result.type === 'PLAYLIST' ? {
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
    ).then(msg => { setTimeout(() => { msg.delete() }, 5000) }).catch(() => { });
  },
};
